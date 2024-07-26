// src/api/maintenances/{maintenanceID}/index.ts

import { MaintenanceAPI } from "@/api/client";
import { Maintenance } from "@/api/models/models";

const BASE_URL = 'http://127.0.0.1:4010/maintenances';

export const maintenanceAPI: MaintenanceAPI = {
    getMaintenanceById: async (request: { id: number }): Promise<Maintenance> => {
        const response = await fetch(`${BASE_URL}/${request.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch maintenance with id ${request.id}`);
        }
        const maintenance: Maintenance = await response.json();
        return maintenance;
    },

    updateMaintenance: async (request: {
        id: number;
        car_id: number;
        maint_date: string;
        maint_description: string;
        maint_type: string;
    }): Promise<Maintenance> => {
        const response = await fetch(`${BASE_URL}/${request.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        });
        if (!response.ok) {
            throw new Error(`Failed to update maintenance with id ${request.id}`);
        }
        const maintenance: Maintenance = await response.json();
        return maintenance;
    },

    deleteMaintenance: async (request: { id: number }): Promise<void> => {
        const response = await fetch(`${BASE_URL}/${request.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`Failed to delete maintenance with id ${request.id}`);
        }
    },
};
