import { ClientAPI, TuningAPI } from '@/api/client';
import { Tuning } from '@/api/models/models';

const BASE_URL = 'http://127.0.0.1:4010/tuning';

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

export const createTuningAPI = (idToken: string): ClientAPI['tuning'] => ({
    createTuning: async (request: TuningAPI['createTuning']['request']): Promise<TuningAPI['createTuning']['response']> => {
        const response = await fetchWithToken(`${BASE_URL}`, {
            method: 'POST',
            body: JSON.stringify(request),
        }, idToken);
        if (!response.ok) {
            throw new Error('Failed to create Tuning record');
        }
        const result: Tuning = await response.json();
        return result;
    },

    getAllTunings: async (): Promise<TuningAPI['getAllTunings']['response']> => {
        const response = await fetchWithToken(`${BASE_URL}`, {
            method: 'GET',
        }, idToken);
        if (!response.ok) {
            throw new Error('Failed to fetch all Tuning records');
        }
        const result: Tuning[] = await response.json();
        return result;
    },

    getTuningById: async (request: TuningAPI['getTuningById']['request']): Promise<TuningAPI['getTuningById']['response']> => {
        const response = await fetchWithToken(`${BASE_URL}/${request.id}`, {
            method: 'GET',
        }, idToken);
        if (!response.ok) {
            throw new Error(`Failed to fetch Tuning record with ID ${request.id}`);
        }
        const result: Tuning = await response.json();
        return result;
    },

    updateTuning: async (request: TuningAPI['updateTuning']['request']): Promise<TuningAPI['updateTuning']['response']> => {
        const response = await fetchWithToken(`${BASE_URL}/${request.id}`, {
            method: 'PUT',
            body: JSON.stringify(request),
        }, idToken);
        if (!response.ok) {
            throw new Error(`Failed to update Tuning record with ID ${request.id}`);
        }
        const result: Tuning = await response.json();
        return result;
    },

    deleteTuning: async (request: TuningAPI['deleteTuning']['request']): Promise<void> => {
        const response = await fetchWithToken(`${BASE_URL}/${request.id}`, {
            method: 'DELETE',
        }, idToken);
        if (!response.ok) {
            throw new Error(`Failed to delete Tuning record with ID ${request.id}`);
        }
    },
});
