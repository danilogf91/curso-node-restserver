const express = require('express');
const cors = require('cors');

class Server{

    constructor() {
        this.app = express();           // crear app 
        this.port = process.env.PORT;   // valor del puerto pasado por variables de entorno
        this.usuariosPath = '/api/usuarios'; // path usuarios

        // Middlewares
        this.middlewares();


        // Rutas de mi aplicacion
        this.routes();              // llamar a las rutas

    }

    middlewares() {

        // CORS
        this.app.use(cors());

        // Lectura y parseo del body 
        this.app.use(express.json());   // cualquier informacion que venga en post, put, delete va a reconocer y serializar

        // Directorio publico
        this.app.use(express.static('public'));
    }

    // manejar las rutas
    routes() {

        // cambio de rutas usadas en la carpeta routes/user
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
    
    }

    // escuchar el servidor en un puerto
    listen() {
    this.app.listen(this.port, () => {
        console.log(`Servidor corriendo en el puerto: ${this.port}`);
        });
    }
}

module.exports = Server;