import { ClientAPI, UserAPI } from '../../../client';
import { Car, carInfo, FuelEfficiency, Maintenance, Tuning } from '../../../models/models';

const BASE_URL = 'http://127.0.0.1:4010/users';

export const userAPI: ClientAPI['user'] = {
    getCars: async (request: UserAPI['getCars']['request']): Promise<UserAPI['getCars']['response']> => {
        const response = await fetch(`${BASE_URL}/${request.user_id}/cars`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch cars');
        }
        const carInfos: carInfo[] = await response.json();
        return carInfos;
    },

    registerCar: async (request: UserAPI['registerCar']['request']): Promise<UserAPI['registerCar']['response']> => {
        const response = await fetch(`${BASE_URL}/${request.user_id}/cars`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request.car),
        });
        if (!response.ok) {
            throw new Error('Failed to add car');
        }
        const car: Car = await response.json();
        return car;
    },

    getFuelEfficiency: async (request: UserAPI['getFuelEfficiency']['request']): Promise<UserAPI['getFuelEfficiency']['response']> => {
        const response = await fetch(`${BASE_URL}/${request.user_id}/cars/${request.car_id}/fuel_efficiency`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch fuel efficiency records for user ${request.user_id} and car ${request.car_id}`);
        }
        const fuelEfficiencies: FuelEfficiency[] = await response.json();
        return fuelEfficiencies;
    },

    getTuning: async (request: UserAPI['getTuning']['request']): Promise<UserAPI['getTuning']['response']> => {
        const response = await fetch(`${BASE_URL}/${request.user_id}/cars/${request.car_id}/tuning`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch tuning records for user ${request.user_id} and car ${request.car_id}`);
        }
        const tunings: Tuning[] = await response.json();
        return tunings;
    },

    getMaintenance: async (request: UserAPI['getMaintenance']['request']): Promise<UserAPI['getMaintenance']['response']> => {
        const response = await fetch(`${BASE_URL}/${request.user_id}/cars/${request.car_id}/maintenance`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch maintenance records for user ${request.user_id} and car ${request.car_id}`);
        }
        const maintenances: Maintenance[] = await response.json();
        return maintenances;
    },
};
