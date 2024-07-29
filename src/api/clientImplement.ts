import { ClientAPIInterface } from "@/api/client";
import { UserAPI } from "@/api/handlers/users";
import { CarAPI } from "@/api/handlers/cars";
import { FuelEfficiencyAPI } from "@/api/handlers/fuel_efficiencies";
import { TuningAPI } from "@/api/handlers/tunings";
import { MaintenanceAPI } from "@/api/handlers/maintenance";
import { AccidentAPI } from "@/api/handlers/accidents";
import { PeriodicInspectionAPI } from "@/api/handlers/periodic_inspections";
import { ImageAPI } from "@/api/handlers/images";

export const ClientAPI = (jwt: string): ClientAPIInterface => ({
	user: {
		...UserAPI(jwt),
	},
	car: CarAPI(jwt),
	fuelEfficiency: FuelEfficiencyAPI(jwt),
	tuning: TuningAPI(jwt),
	maintenance: MaintenanceAPI(jwt),
	accident: AccidentAPI(jwt),
	periodicInspection: PeriodicInspectionAPI(jwt),
	image: ImageAPI(jwt),
});
