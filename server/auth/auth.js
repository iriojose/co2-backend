const axiosUtils = require("./encript")
let { createAxios } = axiosUtils;
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
const moment = require('moment');
const { DATA_URL, TOKEN_KEY } = require("./keys");
const { encriptar, compareHash } = require("./encript");

const Unauthorized = {
    message: "The credentials are invalids",
    code: 401
}
const Forbidden = {
    message: "You are not allowed to use this route",
    code: 403
}

const Conflict = {
    message: "This entity already exists",
    code: 409
}

const NotFound = {
    message: "User not found.",
    code: 404
}

const Expired = {
    message: "Token expired.",
    code: 440
}

async function apiAccess(tenantId, token) {
    try {
        let connection = createAxios(DATA_URL, tenantId);
        if (!token) return false;
        
        const sql = `SELECT * FROM usuario WHERE email = '${token.user}'`;

        let { data } = await connection.post(`/mysql/query`, { sql: sql });
        if (!data[0]) return false;
        let valid = await compareHash(token.password, data[0].password);
        if (!valid) return false;

        return { validado: true };
    } catch (error) {
        throw new Error(`Error al compareHash llave, ${error}`);
    }
}

async function login(tenantId, usuario, password) {
    if (!usuario || !password) return Unauthorized;
    try {
        let connection = createAxios(DATA_URL, tenantId);

        const sql = `SELECT * FROM usuario WHERE email = '${usuario}'`;
        let { data } = await connection.post(`/mysql/query`, { sql: sql });


        if (!data[0]) return Unauthorized;

        let valid = await compareHash(password, data[0].password);
        if (!valid) return Unauthorized;

        const token = jwt.sign({ _id: data[0].login }, TOKEN_KEY || "2423503", { expiresIn: 60 * 60 * 24 });
        return { data: data[0] , token, code: 200 };
    } catch (error) {
        throw new Error(`Error al hacer login, ${error}`);
    }
}

async function signup(tenantId, newUser) {
    try {
        let connection = createAxios(DATA_URL, tenantId);

        const sql = `SELECT * FROM usuario WHERE email = '${newUser.email}'`;
        let  { check }  = await connection.post(`/mysql/query`, { sql: sql });
        if (check) return Conflict;

        newUser.password = await encriptar(newUser.password);
        let { data } = await connection.post(`/mysql/usuario`, { data: newUser });

        newUser.id = data.insertId
        const token = jwt.sign({ _id: newUser.login }, TOKEN_KEY || "2423503", { expiresIn: 60 * 60 * 24 });

        return { data: newUser, token, code: 200 };
    } catch (error) {
        throw new Error(`Error al hacer signup, ${error}`);
    }
}

async function validate(tenantId, user_token) {
    try {
        let connection = createAxios(DATA_URL, tenantId);
        if (!user_token) return Unauthorized;

        let payload = jwt.verify(user_token, TOKEN_KEY || "2423503");

        const sql = `SELECT * FROM usuario WHERE usuario.email = '${payload._id}'`;
        
        const user = await connection.post(`/mysql/query`, { sql: sql });

        if (!user.data[0]) return Unauthorized;
        const response = { data: user.data[0] };

        return { response, code: 200 };
    } catch (error) {
        if (error.name == "TokenExpiredError") return Expired;
        throw new Error(`Error desconocido al compareHash el token, Error: ${error}`);
    }
}

async function encript(password) {
    let pass = await encriptar(password);
    return pass;
}



module.exports = { apiAccess, login, signup, validate, encript }