export const runtime = "edge";

import { getTokens } from "next-firebase-auth-edge";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { clientConfig, serverConfig } from "@/../config";
import HomeClient from "@/components/HomeClient";
import { ClientAPI } from "@/api/clientImplement";
import { Car, FuelEfficiency, Maintenance, carInfo } from "@/api/models/models";

export default async function Home() {
	const tokens = await getTokens(cookies(), {
		apiKey: clientConfig.apiKey,
		cookieName: serverConfig.cookieName,
		cookieSignatureKeys: serverConfig.cookieSignatureKeys,
		serviceAccount: serverConfig.serviceAccount,
	});

	if (!tokens) {
		redirect("/signin");
	}

	const clientAPI = ClientAPI(tokens.token);

	try {
		const response = await clientAPI.test.getTest();
		if (!response) {
			throw new Error("Token validation failed");
		}
	} catch (error) {
		console.error("Error validating token:", error);
		redirect("/signin");
	}

	const userCars: Car[] = await clientAPI.user.getUserCars({
		firebase_user_id: tokens.decodedToken.uid,
	});

	// すべての車のメンテナンスデータを取得
	const allMaintenances: Maintenance[] = [];
	const allFuelEfficiencies: FuelEfficiency[] = [];

	for (const car of userCars) {
		const carMaintenances: Maintenance[] =
			await clientAPI.car.getCarMaintenance({
				car_id: car.car_id,
			});
		const carFuelEfficiencies: FuelEfficiency[] =
			await clientAPI.car.getCarFuelEfficiency({
				car_id: car.car_id,
			});
		allMaintenances.push(...carMaintenances);
		allFuelEfficiencies.push(...carFuelEfficiencies);
	}

	const parseDateToDays = (dateStr: string): number => {
		const date = new Date(dateStr);
		const now = new Date();
		const diffTime = Math.abs(now.getTime() - date.getTime());
		return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
	};

	const calculateMonthlyValues = (
		fuelEfficiencies: FuelEfficiency[],
	): {
		monthlyAverageFuelEfficiency: number;
		monthlyGasCost: number;
		monthlyMileage: number;
		totalGasCost: number;
		totalMileage: number;
	} => {
		const now = new Date();
		const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
		const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

		const monthlyFuelEfficiencies = fuelEfficiencies.filter((fe) => {
			const feDate = new Date(fe.fe_date);
			return feDate >= startOfMonth && feDate < endOfMonth;
		});

		const totalFuelEfficiencies = fuelEfficiencies.reduce(
			(acc, fe) => acc + fe.fe_mileage,
			0,
		);

		const monthlyMileage = monthlyFuelEfficiencies.reduce(
			(acc, fe) => acc + fe.fe_mileage,
			0,
		);
		const monthlyFuelAmount = monthlyFuelEfficiencies.reduce(
			(acc, fe) => acc + fe.fe_amount,
			0,
		);
		const monthlyGasCost = monthlyFuelEfficiencies.reduce(
			(total, fe) => total + Math.round(fe.fe_amount * fe.fe_unitprice),
			0,
		);

		const monthlyAverageFuelEfficiency =
			monthlyFuelAmount > 0 ? monthlyMileage / monthlyFuelAmount : 0;

		const totalGasCost = fuelEfficiencies.reduce(
			(total, fe) => total + Math.round(fe.fe_amount * fe.fe_unitprice),
			0,
		);

		const totalMileage = fuelEfficiencies.reduce(
			(acc, fe) => acc + fe.fe_mileage,
			0,
		);

		return { monthlyAverageFuelEfficiency, monthlyGasCost, monthlyMileage, totalGasCost, totalMileage };
	};

	const calculateOddAfterMaintenance = (
		maintenanceType: string,
		maintenances: Maintenance[],
		fuelEfficiencies: FuelEfficiency[],
	): number => {
		const lastMaintenanceDate = maintenances
			.filter((m) => m.maint_type === maintenanceType)
			.sort(
				(a, b) =>
					new Date(b.maint_date).getTime() - new Date(a.maint_date).getTime(),
			)[0]?.maint_date;

		if (!lastMaintenanceDate) return 0;

		return fuelEfficiencies
			.filter((fe) => new Date(fe.fe_date) >= new Date(lastMaintenanceDate))
			.reduce((acc, fe) => acc + fe.fe_mileage, 0);
	};

	const carInfos: carInfo[] = userCars.map((car) => {
		const carFuelEfficiencies = allFuelEfficiencies.filter(
			(fe) => fe.car_id === car.car_id,
		);
		const carMaintenances = allMaintenances.filter(
			(m) => m.car_id === car.car_id,
		);

		const { monthlyAverageFuelEfficiency, monthlyGasCost, monthlyMileage, totalGasCost, totalMileage } =
			calculateMonthlyValues(carFuelEfficiencies);

		return {
			...car,
			fuel_efficiency: carFuelEfficiencies,
			odd_after_wash: calculateOddAfterMaintenance(
				"Car Wash",
				carMaintenances,
				carFuelEfficiencies,
			),
			odd_after_exchange: calculateOddAfterMaintenance(
				"Oil Change",
				carMaintenances,
				carFuelEfficiencies,
			),
			monthly_fuel_efficiency: monthlyAverageFuelEfficiency.toFixed(2),
			monthly_gas_cost: monthlyGasCost,
			monthly_mileage: monthlyMileage,
			total_gas_cost: totalGasCost,
			total_mileage: totalMileage,
		};
	});

	return <HomeClient userCars={carInfos} />;
}
