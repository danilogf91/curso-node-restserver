const express = require("express");
const cors = require("cors");
const path = require("path");

const dbConnection = require("../database/congif");

class Server {
  constructor() {
    this.app = express(); // crear app

    //! Set pug template
    this.app.set("view engine", "pug");
    this.app.set("views", path.join(__dirname, "../views"));

    this.port = process.env.PORT; // valor del puerto pasado por variables de entorno

    this.path = {
      usuariosPath: "/api/usuarios", // path usuarios
      itemsPath: "/api/items", // path usuarios
      categoriasPath: "/api/categorias", // path usuarios
    };

    // Conexion con DB
    this.conectarDB();

    // Middlewares
    this.middlewares();

    // Rutas de mi aplicacion
    this.routes(); // llamar a las rutas
  }

  // Funcion asincrona que espera la conexion con la base de datos
  async conectarDB() {
    await dbConnection();
  }

  // habilitar rutas cruzadas del servidor y permitir el paso de datos
  middlewares() {
    // CORS
    this.app.use(cors());

    // Lectura y parseo del body
    this.app.use(express.json()); // cualquier informacion que venga en post, put, delete va a reconocer y serializar

    // Directorio publico
    this.app.use(express.static("public"));
  }

  // manejar las rutas
  routes() {
    // cambio de rutas usadas en la carpeta routes/user
    this.app.use(this.path.categoriasPath, require("../routes/categorias"));
    this.app.use(this.path.itemsPath, require("../routes/items"));
    this.app.use(this.path.usuariosPath, require("../routes/usuarios"));
  }

  // escuchar el servidor en un puerto
  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en el puerto: ${this.port}`);
    });
  }
}

module.exports = Server;
