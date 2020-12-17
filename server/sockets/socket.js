const { io } = require('../server');

io.on('connection', client => {
  console.log('Usuario conectado');

  // 9. Emitir un mensaje al cliente
  client.emit('enviarMensaje', {
    usuario: 'Administrador',
    mensaje: 'Bienvenido a esta aplicación',
  });

  // 7. Para saber cuando el cliente se ha desconectado de la aplicación
  client.on('disconnect', () => {
    console.log('Usuario desconectado');
  });

  // 8. Escuchar el cliente. La información enviada desde el front la tenemos en el
  // parámetro mensaje
  //
  // 10. Además del mensaje, se puede recibir un callback que se ejecutará cuando se
  // realice la acción.
  client.on('enviarMensaje', (data, callback) => {
    console.log(data);

    // 11. Usando broadcast para que fluya la respuesta del servidor a todos los usuarios.
    client.broadcast.emit('enviarMensaje', data);

    // if (mensaje.usuario) {
    //   callback({
    //     resp: 'TODO SALIO BIEN!',
    //   });
    // } else {
    //   callback({
    //     resp: 'TODO SALIO MAL!!!!!!!!',
    //   });
    // }
  });
});
