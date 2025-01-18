import { CarInspectionAPIInterface } from "@/api/client";
import { fetchWithToken } from "@/api/module/fetchWithToken";

// 環境変数・APIのベースURL
const AUTOTRACK_API_BASE_URL = process.env.NEXT_PUBLIC_AUTOTRACK_API_BASE_URL;
const AUTOTRACK_API_CAR_INSPECTIONS_URL = `${AUTOTRACK_API_BASE_URL}/car_inspections`;

// CarInspectionAPIという名前でExport
export const CarInspectionAPI = (jwt: string) => ({
	// --- 1) 作成 (POST) ---
	createCarInspection: async (
		request: CarInspectionAPIInterface["createCarInspection"]["request"],
	): Promise<CarInspectionAPIInterface["createCarInspection"]["response"]> => {
		const response = await fetchWithToken(
			AUTOTRACK_API_CAR_INSPECTIONS_URL,
			{
				method: "POST",
				body: JSON.stringify(request),
			},
			jwt,
		);
		if (!response.ok) {
			throw new Error("Failed to create car inspection");
		}
		const data = await response.json();
		return data;
	},

	// --- 2) 一覧取得 (GET) ---
	getCarInspections: async (): Promise<
		CarInspectionAPIInterface["getCarInspections"]["response"]
	> => {
		const response = await fetchWithToken(
			AUTOTRACK_API_CAR_INSPECTIONS_URL,
			{
				method: "GET",
			},
			jwt,
		);
		if (!response.ok) {
			throw new Error("Failed to fetch car inspections");
		}
		const data = await response.json();
		return data;
	},

	// --- 3) 単一取得 (GET) ---
	getCarInspection: async (
		request: CarInspectionAPIInterface["getCarInspection"]["request"],
	): Promise<CarInspectionAPIInterface["getCarInspection"]["response"]> => {
		const response = await fetchWithToken(
			`${AUTOTRACK_API_CAR_INSPECTIONS_URL}/${request.inspection_id}`,
			{
				method: "GET",
			},
			jwt,
		);
		if (!response.ok) {
			throw new Error("Failed to fetch car inspection");
		}
		const data = await response.json();
		return data;
	},

	// --- 4) 更新 (PUT) ---
	updateCarInspection: async (
		request: CarInspectionAPIInterface["updateCarInspection"]["request"],
	): Promise<CarInspectionAPIInterface["updateCarInspection"]["response"]> => {
		const response = await fetchWithToken(
			`${AUTOTRACK_API_CAR_INSPECTIONS_URL}/${request.inspection_id}`,
			{
				method: "PUT",
				body: JSON.stringify(request),
			},
			jwt,
		);
		if (!response.ok) {
			throw new Error("Failed to update car inspection");
		}
		const data = await response.json();
		return data;
	},

	// --- 5) 削除 (DELETE) ---
	deleteCarInspection: async (
		request: CarInspectionAPIInterface["deleteCarInspection"]["request"],
	): Promise<void> => {
		const response = await fetchWithToken(
			`${AUTOTRACK_API_CAR_INSPECTIONS_URL}/${request.inspection_id}`,
			{
				method: "DELETE",
			},
			jwt,
		);
		if (!response.ok) {
			throw new Error("Failed to delete car inspection");
		}
	},
});
