const express = require('express');
const cors = require('cors');
const routesUsuarios = require('../routes/user.routes');
const routesAuth = require('../routes/auth.routes');
const routesCategorias = require('../routes/categoria.routes');
const routesProductos = require('../routes/producto.routes');
const routesBusquedas = require('../routes/busqueda.routes');

const { dbConnection } = require('../database/config');


class Server {


    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        
        // conectar la base de datos
        this.connectarDB();

        // Middlewares
        this.middlewares();
        // Rutas de mi aplicacion
        this.routes();
    }

    async connectarDB() {
        await dbConnection();
    }

    middlewares() {
        // Directorio público
        this.app.use( express.static('public') );
        // cors
        this.app.use(cors());
        // Lectura y parse del body
        this.app.use(express.json());
    }

    routes() {
        
        this.app.use('/api/auth', routesAuth);
        this.app.use('/api/usuarios', routesUsuarios);
        this.app.use('/api/categorias', routesCategorias);
        this.app.use('/api/productos', routesProductos);
        this.app.use('/api/busqueda',routesBusquedas);
        
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto: ${this.port}`);
        });
    }

}


module.exports = Server;