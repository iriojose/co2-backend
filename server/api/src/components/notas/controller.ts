import * as consult from '../../helpers/consult';
import * as respuestas from '../../errors';
import { INotas } from './model';
const model = "notas";

/**
 * crea una nueva nota
 * @param body es la data de la nota nueva
 */
export const create = async (body:any, tenantId: string): Promise<any> =>{
    let {data} = body;
    let newNota: INotas = data;
    
    try {
        let {insertId} = await consult.create(tenantId, model,newNota);
        let response = Object.assign({message:respuestas.Created.message});
        return {response,code:respuestas.Created.code,id:insertId,data:newNota};
    } catch (error) {
        if(error.message ==='DB_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`[ERROR] on controller: ${model}. \n ${error} `);
        return respuestas.InternalServerError;
    }
}

export async function update(params: any,body:any, tenantId: string): Promise<any>{
    let { id } = params;
    let { data } = body;
    let newNota: INotas = data;
    try {
        if(isNaN(id)) return respuestas.InvalidID;
        
        let { affectedRows } = await consult.update(tenantId, model, id, newNota) as any;
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
        let data: INotas[] = await consult.get(tenantId, model, query);
        let totalCount: number = await consult.count(tenantId, model);
        let count = data.length;
        
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

        let data: INotas = await consult.getOne(tenantId, model, id, query);
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
 * elimina un viaje
 * @param params 
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