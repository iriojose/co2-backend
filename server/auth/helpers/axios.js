const axios = require("axios") ;

const createAxios = function (baseURL, tenantId) {
    console.log("[AXIOS] call from URL: "+baseURL)
    const instance  = axios.create({
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

 const getTenantId = function(req) {
    return req.headers['tenant-id'];
}

module.exports = {
    getTenantId,
    createAxios
}