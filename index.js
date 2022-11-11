const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 3000;

var awa = "Nombre de usuario: ";
var sockets = [];

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/chat", (req, res) => {
  res.sendFile(__dirname + "/chat.html");
});

io.on("connection", (socket) => {
  console.log(socket.id);
  console.log("");
  console.log('se conecto socket');
  console.log(sockets.length);
  socket.on("user connection", (userAppName) => {
    socket.broadcast.emit("newUser", {
      id: socket.id,
      userAppName: userAppName
    });
    sockets.push({ id: socket.id, userAppName: userAppName });
    console.log('array sockets'+JSON.stringify(sockets));
  });

  socket.on("mensajeGeneral", (msg) => {
    console.log("mensaje en el chat general -- " + msg);
    socket.broadcast.emit("mensajeGeneral", msg);
  });

  socket.on("mensajeNoGeneral", (msg2) => {
    console.log("mensaje en el chat NO general -- " + msg2);
    socket.broadcast.emit("mensajeNoGeneral", msg2);
  });

  socket.on("mensajeDirecto", ({ privateMessage, reciever }) => {
    console.log("mendaje directo: " + privateMessage);
    socket.to(reciever).emit("mensaje directo", privateMessage);
  });

  socket.on("disconnect", () => {
    sockets = sockets.filter((theSocket) => theSocket.id !== socket.id);
    console.log("se desconectó " + JSON.stringify(sockets));
   // socket.broadcast.emit('disconnected', userAppName);
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
