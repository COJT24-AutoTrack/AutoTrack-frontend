// src/api/models.ts

export interface User {
    user_id: string;
    user_email: string;
    user_name: string;
    user_password: string;
    created_at: string;
    updated_at: string;
}

export interface Car {
    car_id: number;
    car_name: string;
    carmodelnum: string;
    car_color: string;
    car_mileage: number;
    car_isflooding: boolean;
    car_issmoked: boolean;
    car_image_url?: string;
    created_at: string;
    updated_at: string;
}

export interface Tuning {
    tuning_id: number;
    car_id: number;
    tuning_name: string;
    tuning_date: string;
    tuning_description: string;
    created_at: string;
    updated_at: string;
}

export interface Maintenance {
    maint_id: number;
    car_id: number;
    maint_type: string;
    maint_date: string;
    maint_description: string;
    created_at: string;
    updated_at: string;
}

export interface FuelEfficiency {
    fe_id: number;
    car_id: number;
    fe_date: string;
    fe_amount: number;
    fe_unitprice: number;
    fe_mileage: number;
    created_at: string;
    updated_at: string;
}

export interface Accident {
    accident_id: number;
    car_id: number;
    accident_date: string;
    accident_description: string;
    created_at: string;
    updated_at: string;
}

export interface PeriodicInspection {
    pi_id: number;
    car_id: number;
    pi_name: string;
    pi_date: string;
    pi_nextdate: string;
    created_at: string;
    updated_at: string;
}


// 以下はクライアント側でよしなに定義しているもの

export interface carInfo extends Car {
    fuel_efficiency: FuelEfficiency[];
    odd_after_wash: number;
    odd_after_exchange: number;
}
