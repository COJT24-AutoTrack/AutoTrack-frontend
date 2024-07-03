// src/api/client.ts

import { userCarInfos } from './models/models';

export interface ClientAPI {
    user: {
        getCars(request: UserAPI['getCars']['request']): Promise<UserAPI['getCars']['response']>;
    };
}

export interface UserAPI {
    getCars: {
        request: {
            user_id: string;
        };
        response: userCarInfos;
    };
}
