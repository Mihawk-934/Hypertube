const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io").listen(server)
const port = 3008;
const {addUser,getUser,removeUser} = require('./Users')
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
// io.on("connection",socket=> {
//     console.log('user connected')
//     // socket.on('join',({name,room})=>{
//     //     console.log(name)
//     //     const {user} = addUser({id:socket.id,name,room})
//     //     // ce msg et destiner a lutilisateur du back o front
//     //     socket.emit('message',{users:'admin',text:`${user.name},welcome to chat`})
//     //     // ce ms et destiner a tt le chat du back o front
//     //     socket.broadcast.to(user.room).emit('message',{user:'admin',text:`${user.name},nous a rejoind`})
//     //    socket.join(user.room)
//     // })
//     // socket.on('SendMessage',(message,callback)=>{
//     //     const user= getUser(socket.id)
//     //     io.to(user.room).emit('message',{user:user.name,text:message})
//     //     callback();
//     //})
//     // socket.on('disconnect',()=>{
//     //     console.log('DECONNECTERRRRRR')
//     // })
//     // socket.emit("ton ID",socket.id);
//     // socket.on("sendmessage", body => {
//     //     io.emit("message",body)
//     // })
// })
server.listen(port, () => console.log('serveur ACTIVEEE-->'))