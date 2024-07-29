import { CarFuelEfficiencyAPI, ClientAPI } from "@/api/client";
import { FuelEfficiencyCalculationResult } from "@/api/models/models";
import { fetchWithToken } from "@/api/module/fetchWithToken";

const AUTOTRACK_API_BASE_URL = process.env.AUTOTRACK_API_BASE_URL;
const AUTOTRACK_API_CARS_URL = `${AUTOTRACK_API_BASE_URL}/cars`;

export const createCarFuelEfficiencyAPI = (
	idToken: string,
): ClientAPI["carFuelEfficiency"] => ({
	calculateFuelEfficiency: async (
		request: CarFuelEfficiencyAPI["calculateFuelEfficiency"]["request"],
	): Promise<CarFuelEfficiencyAPI["calculateFuelEfficiency"]["response"]> => {
		const response = await fetchWithToken(
			`${AUTOTRACK_API_CARS_URL}/${request.car_id}/fuel_efficiencies/calculate`,
			{
				method: "GET",
			},
			idToken,
		);
		if (!response.ok) {
			throw new Error("Failed to calculate fuel efficiency");
		}
		const fuelEfficiency: FuelEfficiencyCalculationResult =
			await response.json();
		return fuelEfficiency;
	},
});
