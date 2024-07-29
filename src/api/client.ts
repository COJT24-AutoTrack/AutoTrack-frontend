import {
	Car,
	carInfo,
	FuelEfficiencyCalculationResult,
	FuelEfficiency,
	Tuning,
	Maintenance,
	User,
} from "@/api/models/models";

export interface ClientAPI {
	user: {
		createUser(
			request: UserAPI["createUser"]["request"],
		): Promise<UserAPI["createUser"]["response"]>;
		getUsers(): Promise<UserAPI["getUsers"]["response"]>;
		getUser(
			request: UserAPI["getUser"]["request"],
		): Promise<UserAPI["getUser"]["response"]>;
		updateUser(
			request: UserAPI["updateUser"]["request"],
		): Promise<UserAPI["updateUser"]["response"]>;
		deleteUser(request: UserAPI["deleteUser"]["request"]): Promise<void>;
		getCars(
			request: UserAPI["getCars"]["request"],
		): Promise<UserAPI["getCars"]["response"]>;
	};
	car: {
		createCar(
			request: CarAPI["createCar"]["request"],
		): Promise<CarAPI["createCar"]["response"]>;
		getCars(): Promise<CarAPI["getCars"]["response"]>;
		getCar(
			request: CarAPI["getCar"]["request"],
		): Promise<CarAPI["getCar"]["response"]>;
		updateCar(
			request: CarAPI["updateCar"]["request"],
		): Promise<CarAPI["updateCar"]["response"]>;
		deleteCar(request: CarAPI["deleteCar"]["request"]): Promise<void>;
		updateCarImage(request: CarAPI["updateCarImage"]["request"]): Promise<void>;
		deleteCarImage(request: CarAPI["deleteCarImage"]["request"]): Promise<void>;
		getCarTuning(
			request: CarAPI["getCarTuning"]["request"],
		): Promise<TuningAPI["getTuning"]["response"]>;
		getCarMaintenance(
			request: CarAPI["getCarMaintenance"]["request"],
		): Promise<MaintenanceAPI["getMaintenance"]["response"]>;
		getCarFuelEfficiency(
			request: CarAPI["getCarFuelEfficiency"]["request"],
		): Promise<FuelEfficiencyAPI["getFuelEfficiency"]["response"]>;
	};
	tuning: {
		createTuning(
			request: TuningAPI["createTuning"]["request"],
		): Promise<TuningAPI["createTuning"]["response"]>;
		getTunings(): Promise<TuningAPI["getTunings"]["response"]>;
		getTuning(
			request: TuningAPI["getTuning"]["request"],
		): Promise<TuningAPI["getTuning"]["response"]>;
		updateTuning(
			request: TuningAPI["updateTuning"]["request"],
		): Promise<TuningAPI["updateTuning"]["response"]>;
		deleteTuning(request: TuningAPI["deleteTuning"]["request"]): Promise<void>;
	};
	maintenance: {
		createMaintenance(
			request: MaintenanceAPI["createMaintenance"]["request"],
		): Promise<MaintenanceAPI["createMaintenance"]["response"]>;
		getMaintenances(): Promise<MaintenanceAPI["getMaintenances"]["response"]>;
		getMaintenance(
			request: MaintenanceAPI["getMaintenance"]["request"],
		): Promise<MaintenanceAPI["getMaintenance"]["response"]>;
		updateMaintenance(
			request: MaintenanceAPI["updateMaintenance"]["request"],
		): Promise<MaintenanceAPI["updateMaintenance"]["response"]>;
		deleteMaintenance(
			request: MaintenanceAPI["deleteMaintenance"]["request"],
		): Promise<void>;
	};
	fuelEfficiency: {
		createFuelEfficiency(
			request: FuelEfficiencyAPI["createFuelEfficiency"]["request"],
		): Promise<FuelEfficiencyAPI["createFuelEfficiency"]["response"]>;
		getFuelEfficiencies(): Promise<
			FuelEfficiencyAPI["getFuelEfficiencies"]["response"]
		>;
		getFuelEfficiency(
			request: FuelEfficiencyAPI["getFuelEfficiency"]["request"],
		): Promise<FuelEfficiencyAPI["getFuelEfficiency"]["response"]>;
		updateFuelEfficiency(
			request: FuelEfficiencyAPI["updateFuelEfficiency"]["request"],
		): Promise<FuelEfficiencyAPI["updateFuelEfficiency"]["response"]>;
		deleteFuelEfficiency(
			request: FuelEfficiencyAPI["deleteFuelEfficiency"]["request"],
		): Promise<void>;
		calculateFuelEfficiencies(
			request: FuelEfficiencyAPI["calculateFuelEfficiencies"]["request"],
		): Promise<FuelEfficiencyCalculationResult>;
	};
	accident: {
		createAccident(
			request: AccidentAPI["createAccident"]["request"],
		): Promise<AccidentAPI["createAccident"]["response"]>;
		getAccidents(): Promise<AccidentAPI["getAccidents"]["response"]>;
		getAccident(
			request: AccidentAPI["getAccident"]["request"],
		): Promise<AccidentAPI["getAccident"]["response"]>;
		updateAccident(
			request: AccidentAPI["updateAccident"]["request"],
		): Promise<AccidentAPI["updateAccident"]["response"]>;
		deleteAccident(
			request: AccidentAPI["deleteAccident"]["request"],
		): Promise<void>;
	};
	periodicInspection: {
		createPeriodicInspection(
			request: PeriodicInspectionAPI["createPeriodicInspection"]["request"],
		): Promise<PeriodicInspectionAPI["createPeriodicInspection"]["response"]>;
		getPeriodicInspections(): Promise<
			PeriodicInspectionAPI["getPeriodicInspections"]["response"]
		>;
		getPeriodicInspection(
			request: PeriodicInspectionAPI["getPeriodicInspection"]["request"],
		): Promise<PeriodicInspectionAPI["getPeriodicInspection"]["response"]>;
		updatePeriodicInspection(
			request: PeriodicInspectionAPI["updatePeriodicInspection"]["request"],
		): Promise<PeriodicInspectionAPI["updatePeriodicInspection"]["response"]>;
		deletePeriodicInspection(
			request: PeriodicInspectionAPI["deletePeriodicInspection"]["request"],
		): Promise<void>;
	};
	image: {
		uploadImage(request: ImageAPI["uploadImage"]["request"]): Promise<void>;
	};
}

export interface UserAPI {
	createUser: {
		request: {
			user_email: string;
			user_name: string;
			user_password: string;
		};
		response: User;
	};
	getUsers: {
		response: User[];
	};
	getUser: {
		request: {
			user_id: string;
		};
		response: User;
	};
	updateUser: {
		request: {
			user_id: string;
			user_email?: string;
			user_name?: string;
			user_password?: string;
		};
		response: User;
	};
	deleteUser: {
		request: {
			user_id: string;
		};
	};
	getCars: {
		request: {
			user_id: string;
		};
		response: carInfo[];
	};
}

export interface CarAPI {
	createCar: {
		request: {
			user_id: string;
			car: Car;
		};
		response: Car;
	};
	getCars: {
		response: Car[];
	};
	getCar: {
		request: {
			car_id: string;
		};
		response: Car;
	};
	updateCar: {
		request: {
			car_id: string;
			car: Car;
		};
		response: Car;
	};
	deleteCar: {
		request: {
			car_id: string;
		};
	};
	updateCarImage: {
		request: {
			car_id: string;
			image: string;
		};
	};
	deleteCarImage: {
		request: {
			car_id: string;
		};
	};
	getCarTuning: {
		request: {
			car_id: string;
		};
		response: Tuning[];
	};
	getCarMaintenance: {
		request: {
			car_id: string;
		};
		response: Maintenance[];
	};
	getCarFuelEfficiency: {
		request: {
			car_id: string;
		};
		response: FuelEfficiency[];
	};
}

export interface TuningAPI {
	createTuning: {
		request: {
			car_id: number;
			tuning_name: string;
			tuning_date: string;
			tuning_description: string;
		};
		response: Tuning;
	};
	getTunings: {
		response: Tuning[];
	};
	getTuning: {
		request: {
			tuning_id: number;
		};
		response: Tuning;
	};
	updateTuning: {
		request: {
			tuning_id: number;
			car_id: number;
			tuning_name: string;
			tuning_date: string;
			tuning_description: string;
		};
		response: Tuning;
	};
	deleteTuning: {
		request: {
			tuning_id: number;
		};
	};
}

export interface MaintenanceAPI {
	createMaintenance: {
		request: {
			car_id: number;
			maint_type: string;
			maint_date: string;
			maint_description: string;
		};
		response: Maintenance;
	};
	getMaintenances: {
		response: Maintenance[];
	};
	getMaintenance: {
		request: {
			maint_id: number;
		};
		response: Maintenance;
	};
	updateMaintenance: {
		request: {
			maint_id: number;
			car_id: number;
			maint_type: string;
			maint_date: string;
			maint_description: string;
		};
		response: Maintenance;
	};
	deleteMaintenance: {
		request: {
			maint_id: number;
		};
	};
}

export interface FuelEfficiencyAPI {
	createFuelEfficiency: {
		request: {
			car_id: number;
			fe_date: string;
			fe_amount: number;
			fe_unitprice: number;
			fe_mileage: number;
		};
		response: FuelEfficiency;
	};
	getFuelEfficiencies: {
		response: FuelEfficiency[];
	};
	getFuelEfficiency: {
		request: {
			fe_id: number;
		};
		response: FuelEfficiency;
	};
	updateFuelEfficiency: {
		request: {
			fe_id: number;
			car_id: number;
			fe_date: string;
			fe_amount: number;
			fe_unitprice: number;
			fe_mileage: number;
		};
		response: FuelEfficiency;
	};
	deleteFuelEfficiency: {
		request: {
			fe_id: number;
		};
	};
	calculateFuelEfficiencies: {
		request: {
			car_id: string;
		};
		response: FuelEfficiencyCalculationResult;
	};
}

export interface AccidentAPI {
	createAccident: {
		request: {
			car_id: number;
			accident_date: string;
			accident_description: string;
		};
		response: any;
	};
	getAccidents: {
		response: any[];
	};
	getAccident: {
		request: {
			accident_id: number;
		};
		response: any;
	};
	updateAccident: {
		request: {
			accident_id: number;
			car_id: number;
			accident_date: string;
			accident_description: string;
		};
		response: any;
	};
	deleteAccident: {
		request: {
			accident_id: number;
		};
	};
}

export interface PeriodicInspectionAPI {
	createPeriodicInspection: {
		request: {
			car_id: number;
			pi_date: string;
			pi_description: string;
		};
		response: any;
	};
	getPeriodicInspections: {
		response: any[];
	};
	getPeriodicInspection: {
		request: {
			pi_id: number;
		};
		response: any;
	};
	updatePeriodicInspection: {
		request: {
			pi_id: number;
			car_id: number;
			pi_date: string;
			pi_description: string;
		};
		response: any;
	};
	deletePeriodicInspection: {
		request: {
			pi_id: number;
		};
	};
}

export interface ImageAPI {
	uploadImage: {
		request: {
			image: string;
		};
	};
}
