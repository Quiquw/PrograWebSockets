const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

var awa = "Nombre de usuario: ";

 app.get('/', (req, res) => {
   res.sendFile(__dirname + '/index.html');
 });

 app.get('/chat', (req, res) => {
  res.sendFile(__dirname + '/chat.html');
});

io.on('connection', (socket) => {
 // var userName = sessionStorage.getItem('appUsername');
  console.log(awa + 'se conecto');
  socket.on('chat message', msg => {
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
  socket.on('disconnect', () => { 
    console.log('se desconecto');
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});

