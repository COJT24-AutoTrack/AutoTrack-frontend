import {
	Car,
	FuelEfficiencyCalculationResult,
	FuelEfficiency,
	Tuning,
	Maintenance,
	User,
	CarInspection,
} from "@/api/models/models";

export interface ClientAPIInterface {
	test: {
		getTest(): Promise<TestAPIInterface["getTest"]["response"]>;
	};
	user: {
		createUser(
			request: UserAPIInterface["createUser"]["request"],
		): Promise<UserAPIInterface["createUser"]["response"]>;
		getUsers(): Promise<UserAPIInterface["getUsers"]["response"]>;
		getUser(
			request: UserAPIInterface["getUser"]["request"],
		): Promise<UserAPIInterface["getUser"]["response"]>;
		updateUser(
			request: UserAPIInterface["updateUser"]["request"],
		): Promise<UserAPIInterface["updateUser"]["response"]>;
		deleteUser(
			request: UserAPIInterface["deleteUser"]["request"],
		): Promise<void>;
		getUserCars(
			request: UserAPIInterface["getUserCars"]["request"],
		): Promise<UserAPIInterface["getUserCars"]["response"]>;
	};
	car: {
		createCar(
			request: CarAPIInterface["createCar"]["request"],
		): Promise<CarAPIInterface["createCar"]["response"]>;
		getCars(): Promise<CarAPIInterface["getCars"]["response"]>;
		getCar(
			request: CarAPIInterface["getCar"]["request"],
		): Promise<CarAPIInterface["getCar"]["response"]>;
		updateCar(
			request: CarAPIInterface["updateCar"]["request"],
		): Promise<CarAPIInterface["updateCar"]["response"]>;
		deleteCar(request: CarAPIInterface["deleteCar"]["request"]): Promise<void>;
		updateCarImage(
			request: CarAPIInterface["updateCarImage"]["request"],
		): Promise<void>;
		deleteCarImage(
			request: CarAPIInterface["deleteCarImage"]["request"],
		): Promise<void>;
		getCarTuning(
			request: CarAPIInterface["getCarTuning"]["request"],
		): Promise<CarAPIInterface["getCarTuning"]["response"]>;
		getCarMaintenance(
			request: CarAPIInterface["getCarMaintenance"]["request"],
		): Promise<CarAPIInterface["getCarMaintenance"]["response"]>;
		getCarFuelEfficiency(
			request: CarAPIInterface["getCarFuelEfficiency"]["request"],
		): Promise<CarAPIInterface["getCarFuelEfficiency"]["response"]>;
	};
	tuning: {
		createTuning(
			request: TuningAPIInterface["createTuning"]["request"],
		): Promise<TuningAPIInterface["createTuning"]["response"]>;
		getTunings(): Promise<TuningAPIInterface["getTunings"]["response"]>;
		getTuning(
			request: TuningAPIInterface["getTuning"]["request"],
		): Promise<TuningAPIInterface["getTuning"]["response"]>;
		updateTuning(
			request: TuningAPIInterface["updateTuning"]["request"],
		): Promise<TuningAPIInterface["updateTuning"]["response"]>;
		deleteTuning(
			request: TuningAPIInterface["deleteTuning"]["request"],
		): Promise<void>;
	};
	maintenance: {
		createMaintenance(
			request: MaintenanceAPIInterface["createMaintenance"]["request"],
		): Promise<MaintenanceAPIInterface["createMaintenance"]["response"]>;
		getMaintenances(): Promise<
			MaintenanceAPIInterface["getMaintenances"]["response"]
		>;
		getMaintenance(
			request: MaintenanceAPIInterface["getMaintenance"]["request"],
		): Promise<MaintenanceAPIInterface["getMaintenance"]["response"]>;
		updateMaintenance(
			maint_id: MaintenanceAPIInterface["updateMaintenance"]["maint_id"],
			request: MaintenanceAPIInterface["updateMaintenance"]["request"],
		): Promise<MaintenanceAPIInterface["updateMaintenance"]["response"]>;
		deleteMaintenance(
			request: MaintenanceAPIInterface["deleteMaintenance"]["request"],
		): Promise<void>;
	};
	fuelEfficiency: {
		createFuelEfficiency(
			request: FuelEfficiencyAPIInterface["createFuelEfficiency"]["request"],
		): Promise<FuelEfficiencyAPIInterface["createFuelEfficiency"]["response"]>;
		getFuelEfficiencies(): Promise<
			FuelEfficiencyAPIInterface["getFuelEfficiencies"]["response"]
		>;
		getFuelEfficiency(
			request: FuelEfficiencyAPIInterface["getFuelEfficiency"]["request"],
		): Promise<FuelEfficiencyAPIInterface["getFuelEfficiency"]["response"]>;
		updateFuelEfficiency(
			request: FuelEfficiencyAPIInterface["updateFuelEfficiency"]["request"],
		): Promise<FuelEfficiencyAPIInterface["updateFuelEfficiency"]["response"]>;
		deleteFuelEfficiency(
			request: FuelEfficiencyAPIInterface["deleteFuelEfficiency"]["request"],
		): Promise<void>;
		calculateFuelEfficiencies(
			request: FuelEfficiencyAPIInterface["calculateFuelEfficiencies"]["request"],
		): Promise<FuelEfficiencyCalculationResult>;
	};
	accident: {
		createAccident(
			request: AccidentAPIInterface["createAccident"]["request"],
		): Promise<AccidentAPIInterface["createAccident"]["response"]>;
		getAccidents(): Promise<AccidentAPIInterface["getAccidents"]["response"]>;
		getAccident(
			request: AccidentAPIInterface["getAccident"]["request"],
		): Promise<AccidentAPIInterface["getAccident"]["response"]>;
		updateAccident(
			request: AccidentAPIInterface["updateAccident"]["request"],
		): Promise<AccidentAPIInterface["updateAccident"]["response"]>;
		deleteAccident(
			request: AccidentAPIInterface["deleteAccident"]["request"],
		): Promise<void>;
	};
	periodicInspection: {
		createPeriodicInspection(
			request: PeriodicInspectionAPIInterface["createPeriodicInspection"]["request"],
		): Promise<
			PeriodicInspectionAPIInterface["createPeriodicInspection"]["response"]
		>;
		getPeriodicInspections(): Promise<
			PeriodicInspectionAPIInterface["getPeriodicInspections"]["response"]
		>;
		getPeriodicInspection(
			request: PeriodicInspectionAPIInterface["getPeriodicInspection"]["request"],
		): Promise<
			PeriodicInspectionAPIInterface["getPeriodicInspection"]["response"]
		>;
		updatePeriodicInspection(
			request: PeriodicInspectionAPIInterface["updatePeriodicInspection"]["request"],
		): Promise<
			PeriodicInspectionAPIInterface["updatePeriodicInspection"]["response"]
		>;
		deletePeriodicInspection(
			request: PeriodicInspectionAPIInterface["deletePeriodicInspection"]["request"],
		): Promise<void>;
	};
	image: {
		uploadImage(
			request: ImageAPIInterface["uploadImage"]["request"],
		): Promise<ImageAPIInterface["uploadImage"]["response"]>;
	};
	carInspection: {
		createCarInspection(
			request: CarInspectionAPIInterface["createCarInspection"]["request"],
		): Promise<CarInspectionAPIInterface["createCarInspection"]["response"]>;
		getCarInspection(
			request: CarInspectionAPIInterface["getCarInspection"]["request"],
		): Promise<CarInspectionAPIInterface["getCarInspection"]["response"]>;
		updateCarInspection(
			request: CarInspectionAPIInterface["updateCarInspection"]["request"],
		): Promise<CarInspectionAPIInterface["updateCarInspection"]["response"]>;
		deleteCarInspection(
			request: CarInspectionAPIInterface["deleteCarInspection"]["request"],
		): Promise<CarInspectionAPIInterface["deleteCarInspection"]["response"]>;
	};
}

export interface TestAPIInterface {
	getTest: {
		response: string;
	};
}
export interface UserAPIInterface {
	createUser: {
		request: {
			user_email: string;
			user_name: string;
			user_password: string;
			firebase_user_id: string;
		};
		response: User;
	};
	getUsers: {
		response: User[];
	};
	getUser: {
		request: {
			firebase_user_id: string;
		};
		response: User;
	};
	updateUser: {
		request: {
			firebase_user_id: string;
			user_email?: string;
			user_name?: string;
			user_password?: string;
		};
		response: User;
	};
	deleteUser: {
		request: {
			firebase_user_id: string;
		};
	};
	getUserCars: {
		request: {
			firebase_user_id: string;
		};
		response: Car[];
	};
}

export interface CarAPIInterface {
	createCar: {
		request: {
			firebase_user_id: string;
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
			car_name: string;
			carmodelnum: string;
			car_color: string;
			car_mileage: number;
			car_isflooding: 0 | 1;
			car_issmoked: 0 | 1;
			car_image_url: string;
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

export interface TuningAPIInterface {
	createTuning: {
		request: {
			car_id: string;
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
			tuning_id: string;
		};
		response: Tuning;
	};
	updateTuning: {
		request: {
			tuning_id: string;
			car_id: string;
			tuning_name: string;
			tuning_date: string;
			tuning_description: string;
		};
		response: Tuning;
	};
	deleteTuning: {
		request: {
			tuning_id: string;
		};
	};
}

export interface MaintenanceAPIInterface {
	createMaintenance: {
		request: {
			car_id: string;
			maint_type: string;
			maint_date: string;
			maint_description: string;
			maint_title: string;
		};
		response: Maintenance;
	};
	getMaintenances: {
		response: Maintenance[];
	};
	getMaintenance: {
		request: {
			maint_id: string;
		};
		response: Maintenance;
	};
	updateMaintenance: {
		maint_id: string;
		request: {
			car_id: string;
			maint_type: string;
			maint_date: string;
			maint_description: string;
			maint_title: string;
		};
		response: Maintenance;
	};
	deleteMaintenance: {
		request: {
			maint_id: string;
		};
	};
}

export interface FuelEfficiencyAPIInterface {
	createFuelEfficiency: {
		request: {
			car_id: string;
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
			fe_id: string;
		};
		response: FuelEfficiency;
	};
	updateFuelEfficiency: {
		request: {
			fe_id: string;
			car_id: string;
			fe_date: string;
			fe_amount: number;
			fe_unitprice: number;
			fe_mileage: number;
		};
		response: FuelEfficiency;
	};
	deleteFuelEfficiency: {
		request: {
			fe_id: string;
		};
	};
	calculateFuelEfficiencies: {
		request: {
			car_id: string;
		};
		response: FuelEfficiencyCalculationResult;
	};
}

export interface AccidentAPIInterface {
	createAccident: {
		request: {
			car_id: string;
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
			accident_id: string;
		};
		response: any;
	};
	updateAccident: {
		request: {
			accident_id: string;
			car_id: string;
			accident_date: string;
			accident_description: string;
		};
		response: any;
	};
	deleteAccident: {
		request: {
			accident_id: string;
		};
	};
}

export interface PeriodicInspectionAPIInterface {
	createPeriodicInspection: {
		request: {
			car_id: string;
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
			pi_id: string;
		};
		response: any;
	};
	updatePeriodicInspection: {
		request: {
			pi_id: string;
			car_id: string;
			pi_date: string;
			pi_description: string;
		};
		response: any;
	};
	deletePeriodicInspection: {
		request: {
			pi_id: string;
		};
	};
}

export interface ImageAPIInterface {
	uploadImage: {
		request: {
			formData: FormData;
		};
		response: {
			imgURL: string;
		};
	};
}

export interface CarInspectionAPIInterface {
	createCarInspection: {
		request: CarInspection;
		response: void;
	};
	getCarInspection: {
		request: {
			car_id: string;
		};
		response: CarInspection;
	};
	updateCarInspection: {
		request: {
			car_id: string;
		};
		response: void;
	};
	deleteCarInspection: {
		request: {
			car_id: string;
		};
		response: void;
	};
}
