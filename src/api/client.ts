// src/api/client.ts

import { Car, carInfo } from './models/models';

export interface ClientAPI {
    user: {
        getCars(request: UserAPI['getCars']['request']): Promise<UserAPI['getCars']['response']>;
        registerCar(request: UserAPI['registerCar']['request']): Promise<UserAPI['registerCar']['response']>;
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
    }
}
