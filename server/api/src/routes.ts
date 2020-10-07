import { Application } from 'express';
import request from 'request';
import atob from 'atob';

import medio_transporte from './components/medio_transporte/route';

export const routes = (app: Application) => {
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        next();
    });
    
    //agregar todas las rutas de los end points
    app.use('/api/medio_transporte',medio_transporte);

    //si no encuentra la ruta envia ente mensaje  
    app.use('*', async (req, res, next) => {
        res.status(404).json({ message: "Route not especified" });
    });
};