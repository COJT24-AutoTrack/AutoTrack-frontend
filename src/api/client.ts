// src/api/client.ts

import { Car, userCarInfos } from './models/models';

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
        response: userCarInfos;
    };

    registerCar: {
        request: {
            user_id: string;
            car: Car;
        };
        response: Car;
    }
}
