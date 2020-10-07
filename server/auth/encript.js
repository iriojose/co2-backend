const bcrypt = require("bcryptjs");
const axios = require("axios")
const sha1 = require('js-sha1');

async function encriptar (password){
    try {
        
        let salt = await bcrypt.genSalt(10);
        let hash = await bcrypt.hash(password,salt);
        return hash;
    } catch (error) {
        throw new Error(`Error al encriptar contraseña, Error: ${error}`);
    }
}
async function compareHash (password, hash){
    try {
        let valido = await bcrypt.compare(password,hash);
        if (!valido) {
            valido = sha1(password) === hash;
        }
        return valido;
    } catch (error) {
        throw new Error(`Error al compareHash contraseña, Error: ${error}`);
    }
    
}

//non ts function version
const createAxios = function (baseURL, tenantId) {
    console.log("[AXIOS] call from URL: "+baseURL)
    const instance = axios.create({
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

function getTenantId(req) {
    return req.headers['tenant-id'];
}

module.exports = { encriptar, compareHash, createAxios, getTenantId }