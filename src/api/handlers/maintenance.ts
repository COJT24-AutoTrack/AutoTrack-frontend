import { MaintenanceAPIInterface } from "@/api/client";
import { Maintenance } from "@/api/models/models";
import { fetchWithToken } from "@/api/module/fetchWithToken";

const AUTOTRACK_API_BASE_URL = process.env.NEXT_PUBLIC_AUTOTRACK_API_BASE_URL;
const AUTOTRACK_API_MAINTENANCES_URL = `${AUTOTRACK_API_BASE_URL}/maintenances`;

export const MaintenanceAPI = (jwt: string) => ({
	createMaintenance: async (
		request: MaintenanceAPIInterface["createMaintenance"]["request"],
	): Promise<MaintenanceAPIInterface["createMaintenance"]["response"]> => {
		const response = await fetchWithToken(
			`${AUTOTRACK_API_MAINTENANCES_URL}`,
			{
				method: "POST",
				body: JSON.stringify(request),
			},
			jwt,
		);
		if (!response.ok) {
			throw new Error("Failed to create Maintenance record");
		}
		const result: Maintenance = await response.json();
		return result;
	},

	getMaintenances: async (): Promise<
		MaintenanceAPIInterface["getMaintenances"]["response"]
	> => {
		const response = await fetchWithToken(
			`${AUTOTRACK_API_MAINTENANCES_URL}`,
			{
				method: "GET",
			},
			jwt,
		);
		if (!response.ok) {
			throw new Error("Failed to fetch all Maintenance records");
		}
		const result: Maintenance[] = await response.json();
		return result;
	},

	getMaintenance: async (
		request: MaintenanceAPIInterface["getMaintenance"]["request"],
	): Promise<MaintenanceAPIInterface["getMaintenance"]["response"]> => {
		const response = await fetchWithToken(
			`${AUTOTRACK_API_MAINTENANCES_URL}/${request.maint_id}`,
			{
				method: "GET",
			},
			jwt,
		);
		if (!response.ok) {
			throw new Error(
				`Failed to fetch Maintenance record with ID ${request.maint_id}`,
			);
		}
		const result: Maintenance = await response.json();
		return result;
	},

	updateMaintenance: async (
		maint_id: MaintenanceAPIInterface["updateMaintenance"]["maint_id"],
		request: MaintenanceAPIInterface["updateMaintenance"]["request"],
	): Promise<MaintenanceAPIInterface["updateMaintenance"]["response"]> => {
		const response = await fetchWithToken(
			`${AUTOTRACK_API_MAINTENANCES_URL}/${maint_id}`,
			{
				method: "PUT",
				body: JSON.stringify(request),
			},
			jwt,
		);
		if (!response.ok) {
			throw new Error(
				`Failed to update Maintenance record with ID ${maint_id}`,
			);
		}
		const result: Maintenance = await response.json();
		return result;
	},

	deleteMaintenance: async (
		request: MaintenanceAPIInterface["deleteMaintenance"]["request"],
	): Promise<void> => {
		const response = await fetchWithToken(
			`${AUTOTRACK_API_MAINTENANCES_URL}/${request.maint_id}`,
			{
				method: "DELETE",
			},
			jwt,
		);
		if (!response.ok) {
			throw new Error(
				`Failed to delete Maintenance record with ID ${request.maint_id}`,
			);
		}
	},
});
