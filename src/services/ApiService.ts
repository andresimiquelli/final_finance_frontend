import Axios from 'axios';

import { apiBaseUrl } from '../config';

const api = Axios.create({
    baseURL: apiBaseUrl
})

export function useApi(token?: string) {
    
    if(token)
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    return api;
}