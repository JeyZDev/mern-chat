require("dotenv").config();
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: [process.env.FRONT_END_URL],
  },
});
// ครอบ server
// socket(http(express))

const userSocketMap = []; //{userId: socketId}
function getReceiverSocketId(userId) {
    return userSocketMap[userId];
}

io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    if(userId) {
        userSocketMap[userId] = socket.id;
    }
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
    // socket.on("event", (data) => {

    // })
    socket.on("disconnect", () => {
        delete userSocketMap[userId];
    })
})

module.exports = { io, app, server, getReceiverSocketId };