export const runtime = "edge";

import { getTokens } from "next-firebase-auth-edge";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { clientConfig, serverConfig } from "../../config";
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
		console.log(tokens);
		return notFound();
	} else {
		console.log("おけ");
	}

	const clientAPI = ClientAPI(tokens.token);

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
		console.log(userCars);
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
		averageFuelEfficiency: number;
		totalGasCost: number;
		totalMileage: number;
	} => {
		const now = new Date();
		const oneMonthAgo = new Date();
		oneMonthAgo.setMonth(now.getMonth() - 1);

		const monthlyFuelEfficiencies = fuelEfficiencies.filter(
			(fe) => new Date(fe.fe_date) >= oneMonthAgo,
		);

		const totalMileage = monthlyFuelEfficiencies.reduce(
			(acc, fe) => acc + fe.fe_mileage,
			0,
		);
		const totalFuelAmount = monthlyFuelEfficiencies.reduce(
			(acc, fe) => acc + fe.fe_amount,
			0,
		);
		const totalGasCost = monthlyFuelEfficiencies.reduce(
			(total, fe) => total + fe.fe_amount * fe.fe_unitprice,
			0,
		);

		const averageFuelEfficiency =
			totalFuelAmount > 0 ? totalMileage / totalFuelAmount : 0;

		return { averageFuelEfficiency, totalGasCost, totalMileage };
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

		console.log("carFuelEfficiencies: ", carFuelEfficiencies);
		console.log("carMaintenances: ", carMaintenances);

		const { averageFuelEfficiency, totalGasCost, totalMileage } =
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
			monthly_fuel_efficiency: averageFuelEfficiency.toFixed(2),
			total_gas_cost: totalGasCost,
			total_mileage: totalMileage,
		};
	});

	console.log("carInfos: ", carInfos);

	return <HomeClient userCars={carInfos} />;
}
