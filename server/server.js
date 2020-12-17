// Configuración para usar socket.io, parte back-end

const express = require('express');
// 1. Importación de socket.io
const socketIO = require('socket.io');
// 2. socket.io no trabaja directamente con la app de express, pero si trabaja
// con un servidor HTTP que ya trae Node por defecto.
const http = require('http');

const path = require('path');

const app = express();
// 3. Para usar socket.io hay que hacer una pequeña configuración en el app de express
// para que trabaje en base a un servidor que vamos a definir.
const server = http.createServer(app);

const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

// 4. Inicializar el socket
//    IO (input-output) va a mantener una conexión directa con el servidor (parte backend)
//    IO nos va a decir usuarios conectados, va a disparar eventos...
// Este io se usa también en la parte front-end. Ver fuente public/index.html
module.exports.io = socketIO(server);

// 6. Para que el servidor sepa cuando un usuario se conecta a el.
//    client es un objeto que contiene toda la información de la conexión que se estableció
require('./sockets/socket');

// 5. No se usa app.listen sino server.listen, usando el servidor HTTP
server.listen(port, err => {
  if (err) throw new Error(err);

  console.log(`Servidor corriendo en puerto ${port}`);
});
