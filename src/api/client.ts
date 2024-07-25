import { Car, carInfo, FuelEfficiencyCalculationResult, FuelEfficiency } from './models/models';

export interface ClientAPI {
    user: {
        getCars(request: UserAPI['getCars']['request']): Promise<UserAPI['getCars']['response']>;
        registerCar(request: UserAPI['registerCar']['request']): Promise<UserAPI['registerCar']['response']>;
        getFuelEfficiency(request: UserAPI['getFuelEfficiency']['request']): Promise<UserAPI['getFuelEfficiency']['response']>;
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
}

export interface UserAPI {
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
