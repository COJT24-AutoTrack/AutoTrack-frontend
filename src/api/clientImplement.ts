import { carFuelEfficiencyAPI } from './cars/{carID}/fuel_efficiencies/calculate';
import { ClientAPI } from './client';
import { userAPI } from './users/{userID}/cars';
import { fuelEfficiencyAPI } from './fuel_efficiencies';
import { tuningAPI } from './tunings';
import { maintenanceAPI } from './maintenance';

export const createClientAPI = (): ClientAPI => ({
    user: {
        ...userAPI,
    },
    carFuelEfficiency: carFuelEfficiencyAPI,
    fuelEfficiency: fuelEfficiencyAPI,
    tuning: tuningAPI,
    maintenance: maintenanceAPI,
});
