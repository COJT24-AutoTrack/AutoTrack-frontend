import { ClientAPI, UserAPI } from '../../../client';
import { Car, carInfo, userCarInfos } from '../../../models/models';

const BASE_URL = 'http://127.0.0.1:4010/users';

export const userAPI: ClientAPI['user'] = {
    getCars: async (request: UserAPI['getCars']['request']): Promise<UserAPI['getCars']['response']> => {
        const response = await fetch(`${BASE_URL}/${request.user_id}/cars`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch cars');
        }
        const carInfos: carInfo[] = await response.json();
        return carInfos;
    },
};
