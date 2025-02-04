import { CarInspectionAPIInterface } from "@/api/client";
import { fetchWithToken } from "@/api/module/fetchWithToken";

const AUTOTRACK_API_BASE_URL = process.env.NEXT_PUBLIC_AUTOTRACK_API_BASE_URL;
const AUTOTRACK_API_CAR_INSPECTIONS_URL = `${AUTOTRACK_API_BASE_URL}/car_inspections`;

export const CarInspectionAPI = (jwt: string) => ({
	createCarInspection: async (
		request: CarInspectionAPIInterface["createCarInspection"]["request"],
	): Promise<CarInspectionAPIInterface["createCarInspection"]["response"]> => {
		const response = await fetchWithToken(
			`${AUTOTRACK_API_CAR_INSPECTIONS_URL}`,
			{
				method: "POST",
				body: JSON.stringify(request),
			},
			jwt,
		);
		if (!response.ok) {
			throw new Error("Failed to create car inspection");
		}
	},

	getCarInspection: async (
		request: CarInspectionAPIInterface["getCarInspection"]["request"],
	): Promise<
		CarInspectionAPIInterface["getCarInspection"]["response"]
	> => {
		const response = await fetchWithToken(
			`${AUTOTRACK_API_CAR_INSPECTIONS_URL}/${request.car_id}`,
			{
				method: "GET",
			},
			jwt,
		);
		if (!response.ok) {
			throw new Error("Failed to fetch car inspections");
		}
		const carInspections = await response.json();
		return carInspections;
	},

	updateCarInspection: async (
		request: CarInspectionAPIInterface["updateCarInspection"]["request"],
	): Promise<CarInspectionAPIInterface["updateCarInspection"]["response"]> => {
		const response = await fetchWithToken(
			`${AUTOTRACK_API_CAR_INSPECTIONS_URL}/${request.car_id}`,
			{
				method: "PUT",
				body: JSON.stringify(request),
			},
			jwt,
		);
		if (!response.ok) {
			throw new Error("Failed to update car inspection");
		}
	},

	deleteCarInspection: async (
		request: CarInspectionAPIInterface["deleteCarInspection"]["request"],
	): Promise<CarInspectionAPIInterface["deleteCarInspection"]["response"]> => {
		const response = await fetchWithToken(
			`${AUTOTRACK_API_CAR_INSPECTIONS_URL}/${request.car_id}`,
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
