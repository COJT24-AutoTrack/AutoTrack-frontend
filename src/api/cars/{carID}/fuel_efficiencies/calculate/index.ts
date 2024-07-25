import { CarFuelEfficiencyAPI, ClientAPI } from "@/api/client";
import { FuelEfficiencyCalculationResult } from "@/api/models/models";

const BASE_URL = 'http://127.0.0.1:4010/cars';

export const carFuelEfficiencyAPI: ClientAPI['carFuelEfficiency'] = {
    calculateFuelEfficiency: async (request: CarFuelEfficiencyAPI['calculateFuelEfficiency']['request']): Promise<CarFuelEfficiencyAPI['calculateFuelEfficiency']['response']> => {
        const response = await fetch(`${BASE_URL}/${request.car_id}/fuel_efficiencies/calculate`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Failed to calculate fuel efficiency');
        }
        const fuelEfficiency: FuelEfficiencyCalculationResult = await response.json();
        return fuelEfficiency;
    },
};
