import { CarFuelEfficiencyAPI, ClientAPI } from "@/api/client";
import { FuelEfficiencyCalculationResult } from "@/api/models/models";

const BASE_URL = 'http://127.0.0.1:4010/cars';

const fetchWithToken = async (url: string, options: RequestInit, idToken: string) => {
    return fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${idToken}`
        }
    });
};

export const createCarFuelEfficiencyAPI = (idToken: string): ClientAPI['carFuelEfficiency'] => ({
    calculateFuelEfficiency: async (request: CarFuelEfficiencyAPI['calculateFuelEfficiency']['request']): Promise<CarFuelEfficiencyAPI['calculateFuelEfficiency']['response']> => {
        const response = await fetchWithToken(`${BASE_URL}/${request.car_id}/fuel_efficiencies/calculate`, {
            method: 'GET',
        }, idToken);
        if (!response.ok) {
            throw new Error('Failed to calculate fuel efficiency');
        }
        const fuelEfficiency: FuelEfficiencyCalculationResult = await response.json();
        return fuelEfficiency;
    },
});
