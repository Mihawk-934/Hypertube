const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io").listen(server)
const port = 3008;

app.get('/home', (req,res) => {
    res.send('<h1>Hello world</h1>');
});

io.on('connection', (socket) => {
  console.log('a user connected',socket.id);
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('msg envoyer :', (name,msg) => {
    console.log('message: ', name ,msg);
    socket.broadcast.emit('msg serveur:',`${name} : ${msg}`)
  });
});

server.listen(port, () => console.log('serveur lancer'))