import * as controller from "./controller";
import { validar } from "../../helpers/aunthentication";
import { InternalServerError } from "../../errors";
import { Router, Request, Response } from "express";
import { getTenantId } from '../../helpers/axios';

const router = Router();

//obtener todos los usuario
router.get("/", validar, async (req: Request, res: Response): Promise<Response> => {
	try {
		let tenantId: string = getTenantId(req);
		let { message, response, code } = await controller.get(req.query, tenantId);
		return res.status(code).json(message || response);
	} catch (error) {
		console.log(error);
		return res.status(InternalServerError.code).json({ message: InternalServerError.message });
	}
});

//obtener un registro en concreto
router.get('/:id',validar, async (req:Request, res:Response):Promise<Response> => {
    let {id} = req.params;
    try {
        let tenantId: string = getTenantId(req);
        let {message,response,code} = await controller.getOne(id,req.query, tenantId);
        return res.status(code).json(message ||response);
    } catch (error) {
        console.log(error);
        return res.status(InternalServerError.code).json({ message: InternalServerError.message });
    }
});

//actualizar un registro 
router.post('/:id',validar, async (req:Request, res:Response):Promise<Response> => {
    try {
        let tenantId: string = getTenantId(req);
        let {message,response,code} = await controller.update(req.params,req.body, tenantId);
        return res.status(code).json(message || response);
    } catch (error) {
        console.log(error);
        return res.status(InternalServerError.code).json({ message: InternalServerError.message });
    }
});

//eliminar un registro
router.delete('/:id',validar, async (req:Request, res:Response):Promise<Response> => {
    try {
        let tenantId: string = getTenantId(req);
        let {message,code} = await controller.remove(req.params, tenantId);
        return res.status(code).json(message);
    } catch (error) {
        console.log(error);
        return res.status(InternalServerError.code).json({ message: InternalServerError.message });
    }
});

//obtener todos las notas de un usuario
router.get('/:id/notas',validar, async (req:Request, res:Response):Promise<Response> => {
    let {id} = req.params;
    try {
        let tenantId: string = getTenantId(req);
        let {message,response,code} = await controller.getNotas(id,req.query, tenantId);
        return res.status(code).json(message ||response);
    } catch (error) {
        console.log(error);
        return res.status(InternalServerError.code).json({ message: InternalServerError.message });
    }
});

export default router;