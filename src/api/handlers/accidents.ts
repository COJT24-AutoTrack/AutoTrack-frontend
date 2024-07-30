import { ClientAPIInterface, AccidentAPIInterface } from "@/api/client";
import { fetchWithToken } from "@/api/module/fetchWithToken";

const AUTOTRACK_API_BASE_URL = process.env.NEXT_PUBLIC_AUTOTRACK_API_BASE_URL;
const AUTOTRACK_API_ACCIDENTS_URL = `${AUTOTRACK_API_BASE_URL}/accidents`;

export const AccidentAPI = (jwt: string): ClientAPIInterface["accident"] => ({
	createAccident: async (
		request: AccidentAPIInterface["createAccident"]["request"],
	): Promise<AccidentAPIInterface["createAccident"]["response"]> => {
		const response = await fetchWithToken(
			`${AUTOTRACK_API_ACCIDENTS_URL}`,
			{
				method: "POST",
				body: JSON.stringify(request),
			},
			jwt,
		);
		if (!response.ok) {
			throw new Error("Failed to create accident");
		}
		const accident = await response.json();
		return accident;
	},

	getAccidents: async (): Promise<
		AccidentAPIInterface["getAccidents"]["response"]
	> => {
		const response = await fetchWithToken(
			`${AUTOTRACK_API_ACCIDENTS_URL}`,
			{
				method: "GET",
			},
			jwt,
		);
		if (!response.ok) {
			throw new Error("Failed to fetch accidents");
		}
		const accidents = await response.json();
		return accidents;
	},

	getAccident: async (
		request: AccidentAPIInterface["getAccident"]["request"],
	): Promise<AccidentAPIInterface["getAccident"]["response"]> => {
		const response = await fetchWithToken(
			`${AUTOTRACK_API_ACCIDENTS_URL}/${request.accident_id}`,
			{
				method: "GET",
			},
			jwt,
		);
		if (!response.ok) {
			throw new Error("Failed to fetch accident");
		}
		const accident = await response.json();
		return accident;
	},

	updateAccident: async (
		request: AccidentAPIInterface["updateAccident"]["request"],
	): Promise<AccidentAPIInterface["updateAccident"]["response"]> => {
		const response = await fetchWithToken(
			`${AUTOTRACK_API_ACCIDENTS_URL}/${request.accident_id}`,
			{
				method: "PUT",
				body: JSON.stringify(request),
			},
			jwt,
		);
		if (!response.ok) {
			throw new Error("Failed to update accident");
		}
		const accident = await response.json();
		return accident;
	},

	deleteAccident: async (
		request: AccidentAPIInterface["deleteAccident"]["request"],
	): Promise<void> => {
		const response = await fetchWithToken(
			`${AUTOTRACK_API_ACCIDENTS_URL}/${request.accident_id}`,
			{
				method: "DELETE",
			},
			jwt,
		);
		if (!response.ok) {
			throw new Error("Failed to delete accident");
		}
	},
});
