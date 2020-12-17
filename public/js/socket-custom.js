// este io() es el mismo objeto que se usa en el fuente server/server.js
var socket = io();

// 3. Código que se ejecutará cuando estemos conectados con el servidor
// on -> escuchar información
socket.on('connect', function () {
  console.log('Conectado al servidor');
});

// 4. Código que se ejecutará cuando se pierda la conexión con el servidor
socket.on('disconnect', function () {
  console.log('Perdimos conexión con el servidor');
});

// 5. Emitir un mensaje desde el cliente y que lo escuche el servidor
// emit -> emitir información
// El string que colocamos es lo que el servidor va a escuchar y luego podemos
// enviar una información que el servidor recibirá cuando emitamos enviarMensaje
//
// 7. Además, podemos especificar un tercer argumento al emit, un callback
// que utilizará el servidor para mandarnos información de cómo ha ido nuestra
// petición. Lo ejecutará el servidor cuando termine de realizar la acción y
// puede enviarnos esa información a través del parámetro resp.
socket.emit(
  'enviarMensaje',
  {
    usuario: 'José Manuel',
    mensaje: 'Hola Mundo',
  },
  function (resp) {
    console.log('respuesta server:', resp);
  }
);

// 6. Escuchar información
// Se recibe una función y la información estará en el parámetro mensaje
socket.on('enviarMensaje', function (mensaje) {
  console.log('Servidor:', mensaje);
});
