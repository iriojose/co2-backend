import { dataURL } from '../keys';
import { createAxios } from './axios'

/**
 * This function get all of the elements on the table
 * @param model  model of the table 
 * @param query paramaters to modify the consult
 * ```
 * query:{fields:'id', limit:50, offset:0, order:'asc', orderField:'id'}
 * ``` 
 */
export const get = async (tenantId: string, model: string, query?: any): Promise<any> => {
    try {
        let connection = createAxios(dataURL as string, tenantId);
        let { data } = await connection.get(`/mysql/${model}`, { params: query });
        return data;
    } catch (error) {
        if (error.response.status === 400) throw new Error('BD_SYNTAX_ERROR');
        throw new Error(`[LOG] Consult just failed...: \n ${error}`);
    }
}

/**
 * This function return the object especified if exist
 * @param model model of the table
 * @param id id of the register in the table
 * @param query paramaters to modify the consult
 * ```
 * query:{fields:'id', limit:50, offset:0, order:'asc', orderField:'id'}
 * ```
 */
export const getOne = async (tenantId: string, model: string, id: string | number, query: any): Promise<any> => {
    try {
        let connection = createAxios(dataURL as string, tenantId);
        let { data } = await connection.get(`/mysql/${model}/${id}`, { params: query });
        return data;
    } catch (error) {
        if (error.response.status === 400) throw new Error('BD_SYNTAX_ERROR');
        throw new Error(`[LOG] Consult just failed...:\n ${error}`);
    }
}

/**
 * This function return a collection of objects filtered by other
 * @param model model of the table
 * @param id id of register in the table
 * @param other model of the other entity
 * @param query parameters to modify the consult
 * ```
 * query:{fields:'id', limit:50, offset:0, order:'asc', orderField:'id'}
 * ```
 */
export const getOtherByMe = async (tenantId: string, model: string, id: string | number, other: string, query?: any): Promise<any> => {
    try {
        let connection = createAxios(dataURL as string, tenantId);
        let { data } = await connection.get(`/mysql/${model}/${id}/${other}`, { params: query });
        return data;
    } catch (error) {
        if (error.response.status === 400) throw new Error('BD_SYNTAX_ERROR');
        throw new Error(`[LOG] Consult just failed...: \n ${error}`);
    }
}

/**
 * This function create a new register in the bd
 * @param model model of the table
 * @param object the new object to introduce in the db
 */
export const create = async (tenantId: string, model: string, object: any): Promise<any> => {
    try {
        let connection = createAxios(dataURL as string, tenantId);
        let { data } = await connection.post(`/mysql/${model}/`, { data: object });
        return data;
    } catch (error) {
        console.log(error)
        if (error.response.status === 400) throw new Error('BD_SYNTAX_ERROR');
        throw new Error(`[LOG] Consult just failed...: \n ${error}`);
    }
}

/**
 * This function create a bunch of new registers in the bd
 * @param model model of the table
 * @param object the new object to introduce in the db
 */
export const insertMany = async (tenantId: string, model: string, object: any): Promise<any> => {
    try {
        let connection = createAxios(dataURL as string, tenantId);
        let { data } = await connection.post(`/mysql/${model}/many`, { data: object });
        return data;
    } catch (error) {
        if (error.response.status === 400) throw new Error('BD_SYNTAX_ERROR');
        throw new Error(`[LOG] Consult just failed...: \n ${error}`);
    }
}
/**
 * This function update a register in the bd
 * @param model model of the table
 * @param id id of the register in the table
 * @param object object to update in the db
 */
export const update = async (tenantId: string, model: string, id: string | number, object: any): Promise<any> => {
    try {
        let connection = createAxios(dataURL as string, tenantId);
        let { data } = await connection.post(`/mysql/${model}/${id}`, { data: object });
        return data;
    } catch (error) {
        if (error.response.status === 400) throw new Error('BD_SYNTAX_ERROR');
        throw new Error(`[LOG] Consult just failed...: \n ${error}`);
    }
}

/**
 * This function delete a register from de bd
 * @param model model of the table
 * @param id id of the register
 */
export const remove = async (tenantId: string, model: string, id: string | number): Promise<any> => {
    try {
        let connection = createAxios(dataURL as string, tenantId);
        let { data } = await connection.delete(`/mysql/${model}/${id}`);
        return data;
    } catch (error) {
        if (error.response.status === 400) throw new Error('BD_SYNTAX_ERROR');
        throw new Error(`[LOG] Consult just failed...: \n ${error}`);
    }
}

/**
 * This function return the total count of register in a table
 * @param model model of the table
 */
export const count = async (tenantId: string, model: string): Promise<number> => {
    try {
        let connection = createAxios(dataURL as string, tenantId);
        let { data } = await connection.get(`/mysql/count/${model}`);
        return data;
    } catch (error) {
        if (error.response.status === 400) throw new Error('BD_SYNTAX_ERROR');
        throw new Error(`[LOG] Consult just failed...: \n ${error}`);
    }
}
/**
 * This function return the count of all register related to other table
 * @param model the model of the table
 * @param other the other table
 * @param id the id of the register
 */
export const countOther = async (tenantId: string, model: string, other: string, id: string | number): Promise<number> => {
    try {
        let connection = createAxios(dataURL as string, tenantId);
        let { data } = await connection.get(`/mysql/count/${model}/${id}/${other}`);
        return data;
    } catch (error) {
        if (error.response.status === 400) throw new Error('BD_SYNTAX_ERROR');
        throw new Error(`[LOG] Consult just failed...: \n ${error}`);
    }
}

/**
 * Validate if one user exist
 * @param user login of the user
 */
export const getUser = async (tenantId: string, user: string) => {
    let sql = `SELECT * FROM usuario WHERE login = '${user}' or email = '${user}'`;
    try {
        let connection = createAxios(dataURL as string, tenantId);
        let { data } = await connection.post(`/mysql/query`, { sql: sql });
        return data;
    } catch (error) {
        if (error.response.status === 400) throw new Error('BD_SYNTAX_ERROR');
        throw new Error(`[LOG] Consult just failed...: \n ${error}`);
    }
}



