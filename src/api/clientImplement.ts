import { ClientAPI } from './client';
import { userAPI } from './users/{userID}/cars';

export const createClientAPI = (): ClientAPI => ({
    user: userAPI,
});
