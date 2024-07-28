import { ClientAPI, UserAPI } from '../../../client';
import { Car, carInfo, FuelEfficiency, Maintenance, Tuning, User } from '../../../models/models';

const BASE_URL = 'http://161.34.35.147:8369/api/users';

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

export const createUserAPI = (idToken: string): ClientAPI['user'] => ({
    createUser: async (request: UserAPI['createUser']['request']): Promise<UserAPI['createUser']['response']> => {
        const response = await fetchWithToken(`${BASE_URL}`, {
            method: 'POST',
            body: JSON.stringify(request),
        }, idToken);
        if (!response.ok) {
            throw new Error('Failed to create user');
        }
        const user: User = await response.json();
        return user;
    },

    getCars: async (request: UserAPI['getCars']['request']): Promise<UserAPI['getCars']['response']> => {
        const response = await fetchWithToken(`${BASE_URL}/${request.user_id}/cars`, {
            method: 'GET',
        }, idToken);
        if (!response.ok) {
            throw new Error('Failed to fetch cars');
        }
        const carInfos: carInfo[] = await response.json();
        return carInfos;
    },

    registerCar: async (request: UserAPI['registerCar']['request']): Promise<UserAPI['registerCar']['response']> => {
        const response = await fetchWithToken(`${BASE_URL}/${request.user_id}/cars`, {
            method: 'POST',
            body: JSON.stringify(request.car),
        }, idToken);
        if (!response.ok) {
            throw new Error('Failed to add car');
        }
        const car: Car = await response.json();
        return car;
    },

    getFuelEfficiency: async (request: UserAPI['getFuelEfficiency']['request']): Promise<UserAPI['getFuelEfficiency']['response']> => {
        const response = await fetchWithToken(`${BASE_URL}/${request.user_id}/cars/${request.car_id}/fuel_efficiency`, {
            method: 'GET',
        }, idToken);
        if (!response.ok) {
            throw new Error(`Failed to fetch fuel efficiency records for user ${request.user_id} and car ${request.car_id}`);
        }
        const fuelEfficiencies: FuelEfficiency[] = await response.json();
        return fuelEfficiencies;
    },

    getTuning: async (request: UserAPI['getTuning']['request']): Promise<UserAPI['getTuning']['response']> => {
        const response = await fetchWithToken(`${BASE_URL}/${request.user_id}/cars/${request.car_id}/tuning`, {
            method: 'GET',
        }, idToken);
        if (!response.ok) {
            throw new Error(`Failed to fetch tuning records for user ${request.user_id} and car ${request.car_id}`);
        }
        const tunings: Tuning[] = await response.json();
        return tunings;
    },

    getMaintenance: async (request: UserAPI['getMaintenance']['request']): Promise<UserAPI['getMaintenance']['response']> => {
        const response = await fetchWithToken(`${BASE_URL}/${request.user_id}/cars/${request.car_id}/maintenance`, {
            method: 'GET',
        }, idToken);
        if (!response.ok) {
            throw new Error(`Failed to fetch maintenance records for user ${request.user_id} and car ${request.car_id}`);
        }
        const maintenances: Maintenance[] = await response.json();
        return maintenances;
    },
});
