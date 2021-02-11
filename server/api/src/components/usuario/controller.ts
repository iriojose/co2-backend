import * as consult from '../../helpers/consult';
import * as respuestas from '../../errors';
import { IUsuario } from './model';
const model = "usuario";

export async function getNotas(id: string | number, query: any, tenantId: string): Promise<any> {
    try {
        if (isNaN(id as number)) return respuestas.InvalidID;

        let usuario: IUsuario = await consult.getOne(tenantId, model, id, query);
        if (!usuario) return respuestas.ElementNotFound;

        let pivotes: any = await consult.getOtherByMe(tenantId, model, id, "notas", query);
        let totalCount = await consult.countOther(tenantId, model, "notas", id);
        let count = pivotes.length;

        if (count <= 0) return respuestas.Empty;
        let response = Object.assign({ totalCount, count, pivotes});
        
        return { response, code: respuestas.Ok.code };
    } catch (error) {
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`[ERROR] on controller: ${model}. \n ${error} `);
        return respuestas.InternalServerError;
    }
}

export async function update(params: any,body:any, tenantId: string): Promise<any>{
    let { id } = params;
    let { data } = body;
    let newUser: IUsuario = data;
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
        let data: IUsuario[] = await consult.get(tenantId, model, query);
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

        let data: IUsuario = await consult.getOne(tenantId, model, id, query);
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