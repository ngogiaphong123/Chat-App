const express = require('express');
const http = require('http');
const path = require('path');
const socketio = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketio(server);
//? Set static folders
app.use(express.static(path.join(__dirname, 'public')));
//? Run when client connect
io.on('connection', (socket) => {
    console.log('New client connected');
    //? socket.io() send a message to client who just connected
    socket.emit('message', 'Welcome to the chat');
    //? Broadcast when a user connect (send to everyone except the one who connect)
    socket.broadcast.emit('message', 'A new user has joined the chat');
    //? Run when client disconnect
    socket.on('disconnect', () => {
        //? io.emit() sends a message to all connected clients
        io.emit('message', 'Client disconnected');
    })
    //? Listen for chat messages
    socket.on('chatMessage', (message) => {
        io.emit('message', message);
    })
})
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));