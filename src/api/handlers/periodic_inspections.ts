import { PeriodicInspectionAPIInterface } from "@/api/client";
import { fetchWithToken } from "@/api/module/fetchWithToken";

const AUTOTRACK_API_BASE_URL = process.env.NEXT_PUBLIC_AUTOTRACK_API_BASE_URL;
const AUTOTRACK_API_INSPECTIONS_URL = `${AUTOTRACK_API_BASE_URL}/inspections`;

export const PeriodicInspectionAPI = (
	jwt: string,
) => ({
	createPeriodicInspection: async (
		request: PeriodicInspectionAPIInterface["createPeriodicInspection"]["request"],
	): Promise<
		PeriodicInspectionAPIInterface["createPeriodicInspection"]["response"]
	> => {
		const response = await fetchWithToken(
			`${AUTOTRACK_API_INSPECTIONS_URL}`,
			{
				method: "POST",
				body: JSON.stringify(request),
			},
			jwt,
		);
		if (!response.ok) {
			throw new Error("Failed to create periodic inspection");
		}
		const inspection = await response.json();
		return inspection;
	},

	getPeriodicInspections: async (): Promise<
		PeriodicInspectionAPIInterface["getPeriodicInspections"]["response"]
	> => {
		const response = await fetchWithToken(
			`${AUTOTRACK_API_INSPECTIONS_URL}`,
			{
				method: "GET",
			},
			jwt,
		);
		if (!response.ok) {
			throw new Error("Failed to fetch periodic inspections");
		}
		const inspections = await response.json();
		return inspections;
	},

	getPeriodicInspection: async (
		request: PeriodicInspectionAPIInterface["getPeriodicInspection"]["request"],
	): Promise<
		PeriodicInspectionAPIInterface["getPeriodicInspection"]["response"]
	> => {
		const response = await fetchWithToken(
			`${AUTOTRACK_API_INSPECTIONS_URL}/${request.pi_id}`,
			{
				method: "GET",
			},
			jwt,
		);
		if (!response.ok) {
			throw new Error("Failed to fetch periodic inspection");
		}
		const inspection = await response.json();
		return inspection;
	},

	updatePeriodicInspection: async (
		request: PeriodicInspectionAPIInterface["updatePeriodicInspection"]["request"],
	): Promise<
		PeriodicInspectionAPIInterface["updatePeriodicInspection"]["response"]
	> => {
		const response = await fetchWithToken(
			`${AUTOTRACK_API_INSPECTIONS_URL}/${request.pi_id}`,
			{
				method: "PUT",
				body: JSON.stringify(request),
			},
			jwt,
		);
		if (!response.ok) {
			throw new Error("Failed to update periodic inspection");
		}
		const inspection = await response.json();
		return inspection;
	},

	deletePeriodicInspection: async (
		request: PeriodicInspectionAPIInterface["deletePeriodicInspection"]["request"],
	): Promise<void> => {
		const response = await fetchWithToken(
			`${AUTOTRACK_API_INSPECTIONS_URL}/${request.pi_id}`,
			{
				method: "DELETE",
			},
			jwt,
		);
		if (!response.ok) {
			throw new Error("Failed to delete periodic inspection");
		}
	},
});
