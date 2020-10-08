# co2 Back-end
Api rest para la conexion con diferentes front-end

## requisitos

```bash 
   $ npm install pm2 -g
```
instala pm2 para hacer los deploys

## Intalar dependencias

```bash 
   $ npm install --save
```

## Scripts

- ### Clean
```bash
   $ npm run clean
```

elimina dist creado del tsconfig en server/api

- ### Build
```bash
   $ npm run build
```

hace un build del server/api

- ### serve
```bash
   $ npm run serve:name_servicio
```

corre el servicio deseado en modo desarrollo

- ### Deploy
```bash
   $ npm run deploy
   $ npm run deploy:name_service
```

El primero arranca todo el backend en modo desarrollo y el segundo arranca un servicio en modo desarrollo

## aviso

En la carpeta public/pages/viajesco2 se encuentra el build del frontend del proyecto, una vez hacer npm run deploy, puedes acceder a el por la ruta local
localhost:84/viajesco2/


## Docs

### Autenticación

Cada llamada a la API requiere un encabezado con un token con el usuario de autorización del desarrollador y la contraseña del socio.
El token tiene la siguiente estructura: <code> {"contraseña": "123456", "usuario": "admin"} (este objeto tiene que estar en bas64 o usar la funcion btoa para encriptar) </code> y el nombre del encabezado es <code> x-access-control </code>. 

### Peticiones


Las solicitudes al servidor deben realizarse a través de las URL: http: // localhost: 81 / api / $ {endpint} /? $ {Query}, cada punto final se proporcionará para el recurso que desean obtener o mutar, por ejemplo: http: // localhost: 81 / api / conceptos /? limit = 20 & fields = id, nombre

#### Query
+ **fields**: Este parámetro indica cuáles de los atributos de la entidad son requeridos por el usuario, separados por coma.
+ **offset**: Este parámetro indica el índice donde comienza la ruta de datos.
+ **limit**: Este parámetro indica la longitud de la matriz de datos.
+ **order**: Este parámetro indica el orden de la matriz ascendente / descendente.
+ **orderField**: Este parámetro indica la clave o campo por el cual se ordenará la matriz.
+ **before**: se concatena antes del campo de clave de filtro para indicar que los registros son menores o iguales que el valor.
+ **after**: se concatena antes del campo de clave de filtro para indicar que los registros son mayores o iguales que el valor.

## Examples

Route: `GET: http://localhost:81/api/viajes/?fields=id,punto_inicio,punto_fin,&after-kilometros=1&before-kilometros=10`

Code:
```js
        //Request
        fetch('http://localhost:81/api/viajes/?fields=id,punto_inicio,punto_fin,kilometros,&after-kilometros=1&before-kilometros=10',
        {
            method: 'GET',
            headers: {
                'x-access-control' : 'eyJ1c2VyIjoiaXJpb2pnb21lenZAZ21haWwuY29tIiwicGFzc3dvcmQiOiIxMjM0N'
            }
        })
            .then( (response) =>{
                var respuesta = JSON.parse(response);
                console.log(response.data);
            });
```

Response:

```js
        {
            "totalCount": 6,
            "count": 4,
            "data": [
                {
                    "id": 1,
                    "punto_inicio": "Porlmar",
                    "punto_fin": "Centro",
                    "kilometros": "5.75"
                },
                {
                     "id": 2,
                    "punto_inicio": "el valle",
                    "punto_fin": "Manzanillo",
                    "kilometros": "2"
                },
                {
                     "id": 3,
                    "punto_inicio": "san juan",
                    "punto_fin": "el valle",
                    "kilometros": "9"
                },
                {
                     "id": 4,
                    "punto_inicio": "san juan",
                    "punto_fin": "el espinal",
                    "kilometros": "6"
                }
            ],
        }
```





## Responses and errors

| Response | Description | Message | Code |
| -------- | ----------- | ------- | ---- |
| Ok | Todo estuvo bien y se espera la respuesta deseada | Ok | 200 |
| Created | Los datos se guardan y el registro se crea correctamente | Record created | 201 |
| Updated | El registro se actualizó y midificó con éxito | Record updated | 201 |
| Deleted | El registro fue eliminado de la api | Record deleted | 200 |
| Empty | La solicitud fue buena pero el punto final está vacío | The entity is empty | 200 |
| Invalid ID | El ID proporcionado no tiene el formato numérico correcto | The given ID is not valid | 400 |
| Bad Request | La ruta o los datos tienen un formato no válido o no existen | Bad Request | 400 |
| Unauthorized | Las credenciales faltan o son inválidas | The credentials are invalids | 401 |
| Forbidden | El usuario no tiene permisos para usar esta ruta. | You are not allow to use this route | 403 |
| Element Not Found | El elemento solicitado no existe | Element not found | 404 |
| Route Not Found | La ruta solicitada no existe | Route not found | 404 |
| Bad Format | El formato de los datos no es válido. | Format invalid | 406 |
| Internal Server Error | Ha ocurrido un error en el servidor y la solicitud fue rechazada | Internal server error | 500 |


## Endpoints

- **Viajes**
- **usuario**
- **umedio_transporte**