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
	}

	const carInfos: carInfo[] = userCars.map((car) => {
		const carFuelEfficiencies = allFuelEfficiencies.filter(
			(fe) => fe.car_id === car.car_id,
		);
		const carMaintenances = allMaintenances.filter(
			(m) => m.car_id === car.car_id,
		);

		return {
			...car,
			fuel_efficiency: carFuelEfficiencies,
			odd_after_wash:
				carMaintenances.find((m) => m.maint_type === "wash")?.maint_date || "0",
			odd_after_exchange:
				carMaintenances.find((m) => m.maint_type === "exchange")?.maint_date ||
				"0",
		};
	});

	return <HomeClient userCars={carInfos} />;
}
