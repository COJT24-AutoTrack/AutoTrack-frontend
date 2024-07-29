import { createCarFuelEfficiencyAPI } from "./cars/{carID}/fuel_efficiencies/calculate";
import { ClientAPI } from "./client";
import { createUserAPI } from "./users/{userID}/cars";
import { createFuelEfficiencyAPI } from "./fuel_efficiencies";
import { createTuningAPI } from "./tunings";
import { createMaintenanceAPI } from "./maintenance";

export const createClientAPI = (idToken: string): ClientAPI => ({
	user: {
		...createUserAPI(idToken),
	},
	carFuelEfficiency: createCarFuelEfficiencyAPI(idToken),
	fuelEfficiency: createFuelEfficiencyAPI(idToken),
	tuning: createTuningAPI(idToken),
	maintenance: createMaintenanceAPI(idToken),
});
