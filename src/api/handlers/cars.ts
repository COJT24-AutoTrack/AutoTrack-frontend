import { ClientAPIInterface, CarAPIInterface } from "@/api/client";
import { Car, FuelEfficiency, Maintenance, Tuning } from "@/api/models/models";
import { fetchWithToken } from "@/api/module/fetchWithToken";

const AUTOTRACK_API_BASE_URL = process.env.NEXT_PUBLIC_AUTOTRACK_API_BASE_URL;
const AUTOTRACK_API_CARS_URL = `${AUTOTRACK_API_BASE_URL}/cars`;

export const CarAPI = (jwt: string): ClientAPIInterface["car"] => ({
	createCar: async (
		request: CarAPIInterface["createCar"]["request"],
	): Promise<CarAPIInterface["createCar"]["response"]> => {
		const response = await fetchWithToken(
			`${AUTOTRACK_API_CARS_URL}`,
			{
				method: "POST",
				body: JSON.stringify(request),
			},
			jwt,
		);
		if (!response.ok) {
			throw new Error("Failed to create car");
		}
		const car: Car = await response.json();
		return car;
	},
	getCars: async (): Promise<CarAPIInterface["getCars"]["response"]> => {
		const response = await fetchWithToken(
			`${AUTOTRACK_API_CARS_URL}`,
			{
				method: "GET",
			},
			jwt,
		);
		if (!response.ok) {
			throw new Error("Failed to fetch cars");
		}
		const cars: Car[] = await response.json();
		return cars;
	},

	getCar: async (
		request: CarAPIInterface["getCar"]["request"],
	): Promise<CarAPIInterface["getCar"]["response"]> => {
		const response = await fetchWithToken(
			`${AUTOTRACK_API_CARS_URL}/${request.car_id}`,
			{
				method: "GET",
			},
			jwt,
		);
		if (!response.ok) {
			throw new Error("Failed to fetch car");
		}
		const car: Car = await response.json();
		return car;
	},

	updateCar: async (
		request: CarAPIInterface["updateCar"]["request"],
	): Promise<CarAPIInterface["updateCar"]["response"]> => {
		const response = await fetchWithToken(
			`${AUTOTRACK_API_CARS_URL}/${request.car_id}`,
			{
				method: "PUT",
				body: JSON.stringify(request),
			},
			jwt,
		);
		if (!response.ok) {
			throw new Error("Failed to update car");
		}
		const car: Car = await response.json();
		return car;
	},

	deleteCar: async (
		request: CarAPIInterface["deleteCar"]["request"],
	): Promise<void> => {
		const response = await fetchWithToken(
			`${AUTOTRACK_API_CARS_URL}/${request.car_id}`,
			{
				method: "DELETE",
			},
			jwt,
		);
		if (!response.ok) {
			throw new Error("Failed to delete car");
		}
	},
	updateCarImage: async (
		request: CarAPIInterface["updateCarImage"]["request"],
	): Promise<void> => {
		const response = await fetchWithToken(
			`${AUTOTRACK_API_CARS_URL}/${request.car_id}/image`,
			{
				method: "PUT",
				body: JSON.stringify({ image: request.image }),
			},
			jwt,
		);
		if (!response.ok) {
			throw new Error("Failed to update car image");
		}
	},
	deleteCarImage: async (
		request: CarAPIInterface["deleteCarImage"]["request"],
	): Promise<void> => {
		const response = await fetchWithToken(
			`${AUTOTRACK_API_CARS_URL}/${request.car_id}/image`,
			{
				method: "DELETE",
			},
			jwt,
		);
		if (!response.ok) {
			throw new Error("Failed to delete car image");
		}
	},
	getCarTuning: async (
		request: CarAPIInterface["getCarTuning"]["request"],
	): Promise<CarAPIInterface["getCarTuning"]["response"]> => {
		const response = await fetchWithToken(
			`${AUTOTRACK_API_CARS_URL}/${request.car_id}/tuning`,
			{
				method: "GET",
			},
			jwt,
		);
		if (!response.ok) {
			throw new Error("Failed to fetch car tuning");
		}
		const tunings: Tuning[] = await response.json();
		return tunings;
	},
	getCarMaintenance: async (
		request: CarAPIInterface["getCarMaintenance"]["request"],
	): Promise<CarAPIInterface["getCarMaintenance"]["response"]> => {
		const response = await fetchWithToken(
			`${AUTOTRACK_API_CARS_URL}/${request.car_id}/maintenance`,
			{
				method: "GET",
			},
			jwt,
		);
		if (!response.ok) {
			throw new Error("Failed to fetch car maintenance");
		}
		const maintenances: Maintenance[] = await response.json();
		return maintenances;
	},
	getCarFuelEfficiency: async (
		request: CarAPIInterface["getCarFuelEfficiency"]["request"],
	): Promise<CarAPIInterface["getCarFuelEfficiency"]["response"]> => {
		const response = await fetchWithToken(
			`${AUTOTRACK_API_CARS_URL}/${request.car_id}/fuel-efficiency`,
			{
				method: "GET",
			},
			jwt,
		);
		if (!response.ok) {
			throw new Error("Failed to fetch car fuel efficiency");
		}
		const fuelEfficiencies: FuelEfficiency[] = await response.json();
		return fuelEfficiencies;
	},
});
