import { ClientAPI, MaintenanceAPI } from '@/api/client';
import { Maintenance } from '@/api/models/models';

const BASE_URL = 'http://127.0.0.1:4010/maintenances';

export const maintenanceAPI: ClientAPI['maintenance'] = {
    getMaintenance: async (request: MaintenanceAPI['getMaintenance']['request']): Promise<MaintenanceAPI['getMaintenance']['response']> => {
        const response = await fetch(`${BASE_URL}?user_id=${request.user_id}&car_id=${request.car_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch maintenance records');
        }
        const result: Maintenance[] = await response.json();
        return result;
    },

    createMaintenance: async (request: MaintenanceAPI['createMaintenance']['request']): Promise<MaintenanceAPI['createMaintenance']['response']> => {
        const response = await fetch(`${BASE_URL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        });
        if (!response.ok) {
            throw new Error('Failed to create maintenance record');
        }
        const result: Maintenance = await response.json();
        return result;
    },

    updateMaintenance: async (request: MaintenanceAPI['updateMaintenance']['request']): Promise<MaintenanceAPI['updateMaintenance']['response']> => {
        const response = await fetch(`${BASE_URL}/${request.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        });
        if (!response.ok) {
            throw new Error('Failed to update maintenance record');
        }
        const result: Maintenance = await response.json();
        return result;
    },

    deleteMaintenance: async (request: MaintenanceAPI['deleteMaintenance']['request']): Promise<void> => {
        const response = await fetch(`${BASE_URL}/${request.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Failed to delete maintenance record');
        }
    },
};
