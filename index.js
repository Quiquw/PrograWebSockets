const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

var awa = "Nombre de usuario: ";
var sockets = [];

 app.get('/', (req, res) => {
   res.sendFile(__dirname + '/index.html');
 });

 app.get('/chat', (req, res) => {
  res.sendFile(__dirname + '/chat.html');
});

    io.on('connection', (socket) => {
      socket.on('user connection', (userAppName) => {
  //      if (socket not in stack) {
          sockets.push({ id: socket.id, userAppName: userAppName });
   //     }
   // array sockets conectados
      });

       socket.on('mensajeGeneral', (msg) => {
        console.log("mensaje en el chat general -- " + msg);
        socket.broadcast.emit('mensajeGeneral', msg);
      });
  

    socket.on('mensaje directo', ({ privateMessage, reciever }) => {
      console.log("mendaje directo: " + privateMessage);
      socket.to(reciever).emit("mensaje directo", privateMessage);
    });

    socket.on('disconect', () => {
      // implementar desconexion
        console.log("se desconectó");
        // array sockets conectados
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});