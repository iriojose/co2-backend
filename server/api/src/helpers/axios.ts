import axios, {AxiosInstance} from "axios";
import { Request } from 'express';

export const createAxios = function (baseURL: string, tenantId: string) : AxiosInstance{
    console.log("[AXIOS] call from URL: "+baseURL)
    const instance : AxiosInstance = axios.create({
        baseURL: baseURL,
        withCredentials: true,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'tenant-id': tenantId
        },
        params:{}
    });

    instance.interceptors.request.use(function (config) {
        return config;
    }, function (error) {
        return Promise.reject(error)
    })

    return instance;
}

export const getTenantId = function(req: Request): string {
    return req.headers['tenant-id'] as string;
}