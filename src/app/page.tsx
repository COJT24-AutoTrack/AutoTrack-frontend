export const runtime = "edge";

import { getTokens } from "next-firebase-auth-edge";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { clientConfig, serverConfig } from "@/../config";
import HomeClient from "@/components/HomeClient";
import { ClientAPI } from "@/api/clientImplement";
import { Car, FuelEfficiency, Maintenance, carInfo } from "@/api/models/models";
import { convertCarToCarInfo } from "@/module/carUtils";

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

	const allMaintenances: Maintenance[] = [];
	const allFuelEfficiencies: FuelEfficiency[] = [];

	for (const car of userCars) {
		const carMaintenances = await clientAPI.car.getCarMaintenance({
			car_id: car.car_id,
		});
		const carFuelEfficiencies = await clientAPI.car.getCarFuelEfficiency({
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

		return convertCarToCarInfo(car, carFuelEfficiencies, carMaintenances);
	});

	return <HomeClient userCars={carInfos} token={tokens.token} userId={tokens.decodedToken.uid} />;
}
