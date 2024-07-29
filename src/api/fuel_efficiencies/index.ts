import { ClientAPI, FuelEfficiencyAPI } from "@/api/client";
import { FuelEfficiency } from "@/api/models/models";

const BASE_URL = "http://127.0.0.1:4010/fuel_efficiencies";

const fetchWithToken = async (
	url: string,
	options: RequestInit,
	idToken: string,
) => {
	return fetch(url, {
		...options,
		headers: {
			...options.headers,
			"Content-Type": "application/json",
			Authorization: `Bearer ${idToken}`,
		},
	});
};

export const createFuelEfficiencyAPI = (
	idToken: string,
): ClientAPI["fuelEfficiency"] => ({
	createFuelEfficiency: async (
		request: FuelEfficiencyAPI["createFuelEfficiency"]["request"],
	): Promise<FuelEfficiencyAPI["createFuelEfficiency"]["response"]> => {
		const response = await fetchWithToken(
			`${BASE_URL}`,
			{
				method: "POST",
				body: JSON.stringify(request),
			},
			idToken,
		);
		if (!response.ok) {
			throw new Error("Failed to create fuel efficiency record");
		}
		const result: FuelEfficiency = await response.json();
		return result;
	},

	getAllFuelEfficiencies: async (): Promise<
		FuelEfficiencyAPI["getAllFuelEfficiencies"]["response"]
	> => {
		const response = await fetchWithToken(
			`${BASE_URL}`,
			{
				method: "GET",
			},
			idToken,
		);
		if (!response.ok) {
			throw new Error("Failed to fetch all fuel efficiency records");
		}
		const result: FuelEfficiency[] = await response.json();
		return result;
	},

	getFuelEfficiencyById: async (
		request: FuelEfficiencyAPI["getFuelEfficiencyById"]["request"],
	): Promise<FuelEfficiencyAPI["getFuelEfficiencyById"]["response"]> => {
		const response = await fetchWithToken(
			`${BASE_URL}/${request.id}`,
			{
				method: "GET",
			},
			idToken,
		);
		if (!response.ok) {
			throw new Error(
				`Failed to fetch fuel efficiency record with ID ${request.id}`,
			);
		}
		const result: FuelEfficiency = await response.json();
		return result;
	},

	updateFuelEfficiency: async (
		request: FuelEfficiencyAPI["updateFuelEfficiency"]["request"],
	): Promise<FuelEfficiencyAPI["updateFuelEfficiency"]["response"]> => {
		const response = await fetchWithToken(
			`${BASE_URL}/${request.id}`,
			{
				method: "PUT",
				body: JSON.stringify(request),
			},
			idToken,
		);
		if (!response.ok) {
			throw new Error(
				`Failed to update fuel efficiency record with ID ${request.id}`,
			);
		}
		const result: FuelEfficiency = await response.json();
		return result;
	},

	deleteFuelEfficiency: async (
		request: FuelEfficiencyAPI["deleteFuelEfficiency"]["request"],
	): Promise<void> => {
		const response = await fetchWithToken(
			`${BASE_URL}/${request.id}`,
			{
				method: "DELETE",
			},
			idToken,
		);
		if (!response.ok) {
			throw new Error(
				`Failed to delete fuel efficiency record with ID ${request.id}`,
			);
		}
	},
});
