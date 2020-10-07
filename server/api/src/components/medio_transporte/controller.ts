import * as respuestas from "../../errors";
import { ITransporte} from "./model";
import * as consult from '../../helpers/consult';

const model = "medio_transporte";

/**
 * return all last 50 banks
 * @param query object modifier of the consult
 */
export const get = async (query:any, tenantId: string): Promise<any> =>{
    try {
        let data:ITransporte[] = await consult.get(tenantId, model,query);
        let totalCount: number = await consult.count(tenantId, model);
        let count = data.length;
        let { limit } = query;
        if(count <= 0)  return respuestas.Empty;
    
        let response = Object.assign({ totalCount, count,limit, data });
        return {response, code:respuestas.Ok.code};
    } catch (error) {
        if(error.message ==='DB_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`[ERROR] on controller: ${model}. \n ${error} `);
        return respuestas.InternalServerError;
    }
}
/**
 * return one bank
 * @param id the id of the bank
 * @param query object modifier of the consult
 */
export const getOne = async (id:string | number ,query:any, tenantId: string): Promise<any> =>{
    try {
        if(isNaN(id as number)) return respuestas.InvalidID;
        
        let data:ITransporte = await consult.getOne(tenantId, model,id,query);
        let count:number = await consult.count(tenantId, model);

        if(!data) return respuestas.ElementNotFound;
           
        let response = Object.assign({data},count);
        return {response,code:respuestas.Ok.code};
    
    } catch (error) {
        if(error.message ==='DB_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`[ERROR] on controller: ${model}. \n ${error} `);
        return respuestas.InternalServerError;
    }
}

/**
 * Create a new bank
 * @param body the data of the new bank
 */
export const create = async (body:any, tenantId: string): Promise<any> =>{
    let {data} = body;
    let newTransporte: ITransporte = data;
    try {
        let {insertId} = await consult.create(tenantId, model,newTransporte);
        
        let response = Object.assign({message:respuestas.Created.message});
        return {response,code:respuestas.Created.code,id:insertId,data:newTransporte};
    } catch (error) {
        if(error.message ==='DB_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`[ERROR] on controller: ${model}. \n ${error} `);
        return respuestas.InternalServerError;
    }
}

/**
 * Update a bank
 * @param params the object params request 
 * @param body the data of the bank
 */
export const update = async (params:any,body:any, tenantId: string): Promise<any>=>{
    const {id} = params;
    let {data} = body;
    let newArea:ITransporte = data;
    try {
        if(isNaN(id as number)) return respuestas.InvalidID;
        let {affectedRows}  = await consult.update(tenantId, model,id,newArea);
       
        let response = Object.assign({message:respuestas.Update.message,affectedRows});
        return {response,code:respuestas.Update.code};
    } catch (error) {
        if(error.message ==='DB_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`[ERROR] on controller: ${model}. \n ${error} `);
        return respuestas.InternalServerError;
    }
}

/**
 * Delete a bank
 * @param params object of the params request 
 */
export const remove = async (params:any, tenantId: string): Promise<any> => {
    let {id} = params;
    try {
        if(isNaN(id as number)) return respuestas.InvalidID;
        await consult.remove(tenantId, model,id);
        return respuestas.Deleted;   
    } catch (error) {
        console.log(`[ERROR] on controller: ${model}. \n ${error} `);
        return respuestas.InternalServerError;
    }
}
