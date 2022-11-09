const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

var users = [];
var message = "Nombre de usuario";
var name = "seaa";
var i = 0;

 app.get('/', (req, res) => {
   res.sendFile(__dirname + '/index.html');
 });

 app.get('/chat', (req, res) => {
  res.sendFile(__dirname + '/chat.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
 // name = window.prompt(message, default);
  users.push(name);
  console.log(users);
  socket.on('chat message', msg => {
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
  socket.on('disconnect', () => { 
    console.log('user disconnected');
    users.pop();
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});

