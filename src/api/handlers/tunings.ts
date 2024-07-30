import { ClientAPI, TuningAPIInterface } from "@/api/client";
import { Tuning } from "@/api/models/models";
import { fetchWithToken } from "@/api/module/fetchWithToken";

const AUTOTRACK_API_BASE_URL = process.env.NEXT_PUBLIC_AUTOTRACK_API_BASE_URL;
const AUTOTRACK_API_TUNINGS_URL = `${AUTOTRACK_API_BASE_URL}/tunings`;

export const TuningAPI = (jwt: string): ClientAPI["tuning"] => ({
	createTuning: async (
		request: TuningAPIInterface["createTuning"]["request"],
	): Promise<TuningAPIInterface["createTuning"]["response"]> => {
		const response = await fetchWithToken(
			`${AUTOTRACK_API_TUNINGS_URL}`,
			{
				method: "POST",
				body: JSON.stringify(request),
			},
			jwt,
		);
		if (!response.ok) {
			throw new Error("Failed to create Tuning record");
		}
		const result: Tuning = await response.json();
		return result;
	},

	getTunings: async (): Promise<
		TuningAPIInterface["getTunings"]["response"]
	> => {
		const response = await fetchWithToken(
			`${AUTOTRACK_API_TUNINGS_URL}`,
			{
				method: "GET",
			},
			jwt,
		);
		if (!response.ok) {
			throw new Error("Failed to fetch all Tuning records");
		}
		const result: Tuning[] = await response.json();
		return result;
	},

	getTuning: async (
		request: TuningAPIInterface["getTuning"]["request"],
	): Promise<TuningAPIInterface["getTuning"]["response"]> => {
		const response = await fetchWithToken(
			`${AUTOTRACK_API_TUNINGS_URL}/${request.tuning_id}`,
			{
				method: "GET",
			},
			jwt,
		);
		if (!response.ok) {
			throw new Error(
				`Failed to fetch Tuning record with ID ${request.tuning_id}`,
			);
		}
		const result: Tuning = await response.json();
		return result;
	},

	updateTuning: async (
		request: TuningAPIInterface["updateTuning"]["request"],
	): Promise<TuningAPIInterface["updateTuning"]["response"]> => {
		const response = await fetchWithToken(
			`${AUTOTRACK_API_TUNINGS_URL}/${request.tuning_id}`,
			{
				method: "PUT",
				body: JSON.stringify(request),
			},
			jwt,
		);
		if (!response.ok) {
			throw new Error(
				`Failed to update Tuning record with ID ${request.tuning_id}`,
			);
		}
		const result: Tuning = await response.json();
		return result;
	},

	deleteTuning: async (
		request: TuningAPIInterface["deleteTuning"]["request"],
	): Promise<void> => {
		const response = await fetchWithToken(
			`${AUTOTRACK_API_TUNINGS_URL}/${request.tuning_id}`,
			{
				method: "DELETE",
			},
			jwt,
		);
		if (!response.ok) {
			throw new Error(
				`Failed to delete Tuning record with ID ${request.tuning_id}`,
			);
		}
	},
});
