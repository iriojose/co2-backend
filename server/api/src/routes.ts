import { Application } from 'express';

import usuario from './components/usuario/route';
import notas from './components/notas/route';

export const routes = (app: Application) => {
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        next();
    });
    
    //agregar todas las rutas de los end points
    app.use('/api/usuario',usuario);
    app.use('/api/notas',notas);

    //si no encuentra la ruta envia ente mensaje  
    app.use('*', async (req, res, next) => {
        res.status(404).json({ message: "Route not especified" });
    });
};