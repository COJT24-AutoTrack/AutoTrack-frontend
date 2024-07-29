import { ClientAPI, MaintenanceAPI } from "@/api/client";
import { Maintenance } from "@/api/models/models";

const BASE_URL = "http://127.0.0.1:4010/maintenance";

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

export const createMaintenanceAPI = (
	idToken: string,
): ClientAPI["maintenance"] => ({
	createMaintenance: async (
		request: MaintenanceAPI["createMaintenance"]["request"],
	): Promise<MaintenanceAPI["createMaintenance"]["response"]> => {
		const response = await fetchWithToken(
			`${BASE_URL}`,
			{
				method: "POST",
				body: JSON.stringify(request),
			},
			idToken,
		);
		if (!response.ok) {
			throw new Error("Failed to create Maintenance record");
		}
		const result: Maintenance = await response.json();
		return result;
	},

	getAllMaintenances: async (): Promise<
		MaintenanceAPI["getAllMaintenances"]["response"]
	> => {
		const response = await fetchWithToken(
			`${BASE_URL}`,
			{
				method: "GET",
			},
			idToken,
		);
		if (!response.ok) {
			throw new Error("Failed to fetch all Maintenance records");
		}
		const result: Maintenance[] = await response.json();
		return result;
	},

	getMaintenanceById: async (
		request: MaintenanceAPI["getMaintenanceById"]["request"],
	): Promise<MaintenanceAPI["getMaintenanceById"]["response"]> => {
		const response = await fetchWithToken(
			`${BASE_URL}/${request.id}`,
			{
				method: "GET",
			},
			idToken,
		);
		if (!response.ok) {
			throw new Error(
				`Failed to fetch Maintenance record with ID ${request.id}`,
			);
		}
		const result: Maintenance = await response.json();
		return result;
	},

	updateMaintenance: async (
		request: MaintenanceAPI["updateMaintenance"]["request"],
	): Promise<MaintenanceAPI["updateMaintenance"]["response"]> => {
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
				`Failed to update Maintenance record with ID ${request.id}`,
			);
		}
		const result: Maintenance = await response.json();
		return result;
	},

	deleteMaintenance: async (
		request: MaintenanceAPI["deleteMaintenance"]["request"],
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
				`Failed to delete Maintenance record with ID ${request.id}`,
			);
		}
	},
});
