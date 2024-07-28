import { Car, carInfo, FuelEfficiencyCalculationResult, FuelEfficiency, Tuning, Maintenance, User } from './models/models';

export interface ClientAPI {
    user: {
        createUser(request: UserAPI['createUser']['request']): Promise<UserAPI['createUser']['response']>;
        getCars(request: UserAPI['getCars']['request']): Promise<UserAPI['getCars']['response']>;
        registerCar(request: UserAPI['registerCar']['request']): Promise<UserAPI['registerCar']['response']>;
        getFuelEfficiency(request: UserAPI['getFuelEfficiency']['request']): Promise<UserAPI['getFuelEfficiency']['response']>;
        getTuning(request: UserAPI['getTuning']['request']): Promise<UserAPI['getTuning']['response']>;
        getMaintenance(request: UserAPI['getMaintenance']['request']): Promise<UserAPI['getMaintenance']['response']>;
    };
    carFuelEfficiency: {
        calculateFuelEfficiency(request: CarFuelEfficiencyAPI['calculateFuelEfficiency']['request']): Promise<CarFuelEfficiencyAPI['calculateFuelEfficiency']['response']>;
    };
    fuelEfficiency: {
        createFuelEfficiency(request: FuelEfficiencyAPI['createFuelEfficiency']['request']): Promise<FuelEfficiencyAPI['createFuelEfficiency']['response']>;
        getAllFuelEfficiencies(): Promise<FuelEfficiencyAPI['getAllFuelEfficiencies']['response']>;
        getFuelEfficiencyById(request: FuelEfficiencyAPI['getFuelEfficiencyById']['request']): Promise<FuelEfficiencyAPI['getFuelEfficiencyById']['response']>;
        updateFuelEfficiency(request: FuelEfficiencyAPI['updateFuelEfficiency']['request']): Promise<FuelEfficiencyAPI['updateFuelEfficiency']['response']>;
        deleteFuelEfficiency(request: FuelEfficiencyAPI['deleteFuelEfficiency']['request']): Promise<void>;
    };
    tuning: {
        createTuning(request: TuningAPI['createTuning']['request']): Promise<TuningAPI['createTuning']['response']>;
        getAllTunings(): Promise<TuningAPI['getAllTunings']['response']>;
        getTuningById(request: TuningAPI['getTuningById']['request']): Promise<TuningAPI['getTuningById']['response']>;
        updateTuning(request: TuningAPI['updateTuning']['request']): Promise<TuningAPI['updateTuning']['response']>;
        deleteTuning(request: TuningAPI['deleteTuning']['request']): Promise<void>;
    };
    maintenance: {
        createMaintenance(request: MaintenanceAPI['createMaintenance']['request']): Promise<MaintenanceAPI['createMaintenance']['response']>;
        getAllMaintenances(): Promise<MaintenanceAPI['getAllMaintenances']['response']>;
        getMaintenanceById(request: MaintenanceAPI['getMaintenanceById']['request']): Promise<MaintenanceAPI['getMaintenanceById']['response']>;
        updateMaintenance(request: MaintenanceAPI['updateMaintenance']['request']): Promise<MaintenanceAPI['updateMaintenance']['response']>;
        deleteMaintenance(request: MaintenanceAPI['deleteMaintenance']['request']): Promise<void>;
    };
}

export interface UserAPI {
    createUser: {
        request: {
            user_email: string,
            user_name: string,
            user_password: string,
        },
        response: User;
    }
    getCars: {
        request: {
            user_id: string;
        };
        response: carInfo[];
    };

    registerCar: {
        request: {
            user_id: string;
            car: Car;
        };
        response: Car;
    };

    getFuelEfficiency: {
        getFuelEfficiency: (request: { user_id: string; car_id: string; }) => Promise<FuelEfficiency[]>;
        request: {
            user_id: string;
            car_id: string;
        };
        response: FuelEfficiency[];
    };

    getTuning: {
        getTuning: (request: { user_id: string; car_id: string; }) => Promise<Tuning[]>;
        request: {
            user_id: string;
            car_id: string;
        };
        response: Tuning[];
    };

    getMaintenance: {
        getMaintenanc: (request: { user_id: string; car_id: string; }) => Promise<Tuning[]>;
        request: {
            user_id: string;
            car_id: string;
        };
        response: Maintenance[];
    };
}

export interface CarFuelEfficiencyAPI {
    calculateFuelEfficiency: {
        request: {
            car_id: string;
        };
        response: FuelEfficiencyCalculationResult;
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
    getAllFuelEfficiencies: {
        response: FuelEfficiency[];
    };
    getFuelEfficiencyById: {
        request: {
            id: number;
        };
        response: FuelEfficiency;
    };
    updateFuelEfficiency: {
        request: {
            id: number;
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
            id: number;
        };
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
    getAllTunings: {
        response: Tuning[];
    };
    getTuningById: {
        request: {
            id: number;
        };
        response: Tuning;
    };
    updateTuning: {
        request: {
            id: number;
            car_id: number;
            tuning_name: string;
            tuning_date: string;
            tuning_description: string;
        };
        response: Tuning;
    };
    deleteTuning: {
        request: {
            id: number;
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
    getAllMaintenances: {
        response: Maintenance[];
    };
    getMaintenanceById: {
        request: {
            id: number;
        };
        response: Maintenance;
    };
    updateMaintenance: {
        request: {
            id: number;
            car_id: number;
            maint_type: string;
            maint_date: string;
            maint_description: string;
        };
        response: Maintenance;
    };
    deleteMaintenance: {
        request: {
            id: number;
        };
    };
}