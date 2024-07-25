import { ClientAPI, MaintenanceAPI, TuningAPI } from '@/api/client';
import { Maintenance, Tuning } from '@/api/models/models';

const BASE_URL = 'http://127.0.0.1:4010/maintenance';

export const maintenanceAPI: ClientAPI['maintenance'] = {
    createMaintenance: async (request: MaintenanceAPI['createMaintenance']['request']): Promise<MaintenanceAPI['createMaintenance']['response']> => {
        const response = await fetch(`${BASE_URL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        });
        if (!response.ok) {
            throw new Error('Failed to create Maintenance record');
        }
        const result: Maintenance = await response.json();
        return result;
    },

    getAllMaintenances: async (): Promise<MaintenanceAPI['getAllMaintenances']['response']> => {
        const response = await fetch(`${BASE_URL}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch all Maintenance records');
        }
        const result: Maintenance[] = await response.json();
        return result;
    },

    getMaintenanceById: async (request: MaintenanceAPI['getMaintenanceById']['request']): Promise<MaintenanceAPI['getMaintenanceById']['response']> => {
        const response = await fetch(`${BASE_URL}/${request.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch Maintenance record with ID ${request.id}`);
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
            throw new Error(`Failed to update Maintenance record with ID ${request.id}`);
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
            throw new Error(`Failed to delete Tuning record with ID ${request.id}`);
        }
    },
};
