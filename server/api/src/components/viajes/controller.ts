import * as consult from '../../helpers/consult';
import * as respuestas from '../../errors';
import { IViajes } from './model';
import {ITransporte} from '../medio_transporte/model';
const model = "viajes";

/**
 * Create a new bank
 * @param body the data of the new bank
 */
export const create = async (body:any, tenantId: string): Promise<any> =>{
    let {data,data2} = body;
    let newViaje: IViajes = data;
    
    try {
        let {insertId} = await consult.create(tenantId, model,newViaje);
        for (let i = 0; i < data2.length; i++) {
            await consult.create(tenantId,"transportistas",{viajes_id:insertId,usuario_id:data2[i]});
        }

        let response = Object.assign({message:respuestas.Created.message});
        return {response,code:respuestas.Created.code,id:insertId,data:newViaje};
    } catch (error) {
        if(error.message ==='DB_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`[ERROR] on controller: ${model}. \n ${error} `);
        return respuestas.InternalServerError;
    }
}

export async function update(params: any,body:any, tenantId: string): Promise<any>{
    let { id } = params;
    let { data } = body;
    let newUser: IViajes = data;
    try {
        if(isNaN(id)) return respuestas.InvalidID;
        
        let { affectedRows } = await consult.update(tenantId, model, id, newUser) as any;
        let response = Object.assign({ message: respuestas.Update.message, affectedRows });
        
        return { response, code: respuestas.Update.code };
    } catch (error) {
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`[ERROR] on controller: ${model}. \n ${error} `);
        return respuestas.InternalServerError;
    }
}

export const get = async (query: any, tenantId: string): Promise<any> => {
    try {
        let { limit, fields } = query;

        if (query.fields) {
			let aux = query.fields.split(",");
			let filtrados = aux.filter((e: any) => e !== "medio_transporte");
			query.fields = filtrados.join(",");
        }

        let data: IViajes[] = await consult.get(tenantId, model, query);
        let totalCount: number = await consult.count(tenantId, model);
        let count = data.length;

        for (let medio_transporte of data) {
            let { id } = medio_transporte;
            if (fields && fields.includes("medio_transporte")) {
                let pres: ITransporte[]  = await consult.getOtherByMe(tenantId, model, id as string, "medio_transporte", {});
                medio_transporte.vehiculo = pres;
            }    
        }
        
        if (count <= 0) return respuestas.Empty;
        let response = Object.assign({ totalCount, count, data });
        
        return { response, code: respuestas.Ok.code };
    } catch (error) {
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`[ERROR] on controller: ${model}. \n ${error} `);
        return respuestas.InternalServerError;
    }
}

export const getOne = async (id: string | number, query: any, tenantId: string): Promise<any> => {
    try {
        if (isNaN(id as number)) return respuestas.InvalidID;

        let data: IViajes = await consult.getOne(tenantId, model, id, query);
        let count = await consult.count(tenantId, model);

        if (!data) return respuestas.ElementNotFound;
        let response = Object.assign({ data },{totalCount:count});
        
        return { response, code: respuestas.Ok.code };
    } catch (error) {
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`[ERROR] on controller: ${model}. \n ${error} `);
        return respuestas.InternalServerError;
    }
}

/**
 * Delete a user
 * @param params params request object 
 */
export const remove = async (params:any, tenantId: string): Promise<any> => {
    let { id } = params;
    try {
        if(isNaN(id)) return respuestas.InvalidID;
        
        await consult.remove(tenantId, model, id);
        
        return respuestas.Deleted;
    } catch (error) {
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`[ERROR] on controller: ${model}. \n ${error} `);
        return respuestas.InternalServerError;
    }
}