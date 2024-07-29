import { FuelEfficiencyAPIInterface } from "@/api/client";
import {
	FuelEfficiency,
	FuelEfficiencyCalculationResult,
} from "@/api/models/models";
import { fetchWithToken } from "@/api/module/fetchWithToken";
import { ClientAPI } from "@/components/CarSlider/AddCarPageComponent";

const AUTOTRACK_API_BASE_URL = process.env.NEXT_PUBLIC_AUTOTRACK_API_BASE_URL;
const AUTOTRACK_API_FUELEFFICIENCIES_URL = `${AUTOTRACK_API_BASE_URL}/fuel_efficiencies`;

export const FuelEfficiencyAPI = (
	jwt: string,
): ClientAPI["fuelEfficiency"] => ({
	createFuelEfficiency: async (
		request: FuelEfficiencyAPIInterface["createFuelEfficiency"]["request"],
	): Promise<
		FuelEfficiencyAPIInterface["createFuelEfficiency"]["response"]
	> => {
		const response = await fetchWithToken(
			`${AUTOTRACK_API_FUELEFFICIENCIES_URL}`,
			{
				method: "POST",
				body: JSON.stringify(request),
			},
			jwt,
		);
		if (!response.ok) {
			throw new Error("Failed to create fuel efficiency record");
		}
		const result: FuelEfficiency = await response.json();
		return result;
	},

	getFuelEfficiencies: async (): Promise<
		FuelEfficiencyAPIInterface["getFuelEfficiencies"]["response"]
	> => {
		const response = await fetchWithToken(
			`${AUTOTRACK_API_FUELEFFICIENCIES_URL}`,
			{
				method: "GET",
			},
			jwt,
		);
		if (!response.ok) {
			throw new Error("Failed to fetch all fuel efficiency records");
		}
		const result: FuelEfficiency[] = await response.json();
		return result;
	},

	getFuelEfficiency: async (
		request: FuelEfficiencyAPIInterface["getFuelEfficiency"]["request"],
	): Promise<FuelEfficiencyAPIInterface["getFuelEfficiency"]["response"]> => {
		const response = await fetchWithToken(
			`${AUTOTRACK_API_FUELEFFICIENCIES_URL}/${request.fe_id}`,
			{
				method: "GET",
			},
			jwt,
		);
		if (!response.ok) {
			throw new Error(
				`Failed to fetch fuel efficiency record with ID ${request.fe_id}`,
			);
		}
		const result: FuelEfficiency = await response.json();
		return result;
	},

	updateFuelEfficiency: async (
		request: FuelEfficiencyAPIInterface["updateFuelEfficiency"]["request"],
	): Promise<
		FuelEfficiencyAPIInterface["updateFuelEfficiency"]["response"]
	> => {
		const response = await fetchWithToken(
			`${AUTOTRACK_API_FUELEFFICIENCIES_URL}/${request.fe_id}`,
			{
				method: "PUT",
				body: JSON.stringify(request),
			},
			jwt,
		);
		if (!response.ok) {
			throw new Error(
				`Failed to update fuel efficiency record with ID ${request.fe_id}`,
			);
		}
		const result: FuelEfficiency = await response.json();
		return result;
	},

	deleteFuelEfficiency: async (
		request: FuelEfficiencyAPIInterface["deleteFuelEfficiency"]["request"],
	): Promise<void> => {
		const response = await fetchWithToken(
			`${AUTOTRACK_API_FUELEFFICIENCIES_URL}/${request.fe_id}`,
			{
				method: "DELETE",
			},
			jwt,
		);
		if (!response.ok) {
			throw new Error(
				`Failed to delete fuel efficiency record with ID ${request.fe_id}`,
			);
		}
	},

	calculateFuelEfficiencies: async (
		request: FuelEfficiencyAPIInterface["calculateFuelEfficiencies"]["request"],
	): Promise<
		FuelEfficiencyAPIInterface["calculateFuelEfficiencies"]["response"]
	> => {
		const response = await fetchWithToken(
			`${AUTOTRACK_API_FUELEFFICIENCIES_URL}/${request.car_id}/calculate`,
			{
				method: "GET",
			},
			jwt,
		);
		if (!response.ok) {
			throw new Error(
				`Failed to calculate fuel efficiencies for car with ID ${request.car_id}`,
			);
		}
		const result: FuelEfficiencyCalculationResult = await response.json();
		return result;
	},
});
