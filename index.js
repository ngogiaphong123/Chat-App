const express = require("express");
const http = require("http");
const path = require("path");
const socketio = require("socket.io");
const formatMessage = require("./utils/messages");
const {userJoin,getCurrentUser} = require('./utils/users')
const app = express();
const server = http.createServer(app);
const io = socketio(server);
//? Set static folders
app.use(express.static(path.join(__dirname, "public")));
const botName = "Phong Bot";
//? Run when client connect
io.on("connection", (socket) => {
    socket.on("joinRoom", ({ username, room }) => {
        const user = userJoin(socket.id,username, room);
        socket.join(user.room);
        //? socket.io() send a message to client who just connected
        socket.emit("message", formatMessage(botName, "Welcome to the chat app"));
        //? Broadcast when a user connect (send to everyone except the one who connect)
        socket.broadcast.to(user.room).emit(
            "message",
            formatMessage(botName, `${user.username} has joined the chat`)
        );
    });
    //? Listen for chat messages
    socket.on("chatMessage", (message) => {
        const user = getCurrentUser(socket.id);
        io.to(user.room).emit("message", formatMessage(user.username, message));
    });
    //? Run when client disconnect
    socket.on("disconnect", () => {
        //? io.emit() sends a message to all connected clients
        io.emit("message", formatMessage(botName, "A user has left the chat"));
    });
});
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
