import { ClientAPI, TuningAPI } from '@/api/client';
import { Tuning } from '@/api/models/models';

const BASE_URL = 'http://127.0.0.1:4010/tuning';

export const tuningAPI: ClientAPI['tuning'] = {
    createTuning: async (request: TuningAPI['createTuning']['request']): Promise<TuningAPI['createTuning']['response']> => {
        const response = await fetch(`${BASE_URL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        });
        if (!response.ok) {
            throw new Error('Failed to create Tuning record');
        }
        const result: Tuning = await response.json();
        return result;
    },

    getAllTunings: async (): Promise<TuningAPI['getAllTunings']['response']> => {
        const response = await fetch(`${BASE_URL}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch all Tuning records');
        }
        const result: Tuning[] = await response.json();
        return result;
    },

    getTuningById: async (request: TuningAPI['getTuningById']['request']): Promise<TuningAPI['getTuningById']['response']> => {
        const response = await fetch(`${BASE_URL}/${request.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch Tuning record with ID ${request.id}`);
        }
        const result: Tuning = await response.json();
        return result;
    },

    updateTuning: async (request: TuningAPI['updateTuning']['request']): Promise<TuningAPI['updateTuning']['response']> => {
        const response = await fetch(`${BASE_URL}/${request.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        });
        if (!response.ok) {
            throw new Error(`Failed to update Tuning record with ID ${request.id}`);
        }
        const result: Tuning = await response.json();
        return result;
    },

    deleteTuning: async (request: TuningAPI['deleteTuning']['request']): Promise<void> => {
        const response = await fetch(`${BASE_URL}/${request.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`Failed to delete Tuning record with ID ${request.id}`);
        }
    },
};
