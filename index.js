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
          socket.broadcast.emit('newUser', { id: socket.id, username: username });
          sockets.push({ id: socket.id, userAppName: userAppName });
          console.log(sockets);
   //     }
   // array sockets conectados
      });

       socket.on('mensajeGeneral', (msg) => {
        console.log("mensaje en el chat general -- " + msg);
        socket.broadcast.emit('mensajeGeneral', msg);
      });

      socket.on('mensajeNoGeneral', (msg2) => {
        console.log("mensaje en el chat NO general -- " + msg2);
        socket.broadcast.emit('mensajeNoGeneral', msg2);
      });
  

    socket.on('mensajeDirecto', ({ privateMessage, reciever }) => {
      console.log("mendaje directo: " + privateMessage);
      socket.to(reciever).emit("mensaje directo", privateMessage);
    });

    socket.on('disconect', () => {
      // implementar desconexion
        console.log("se desconectó");
        // array sockets conectados
  });
});

function refreshUsers (){
}


http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});