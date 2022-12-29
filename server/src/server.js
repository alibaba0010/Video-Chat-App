import { createServer } from "http";
import app from "./app.js";
import { Server } from "socket.io";
const server = createServer(app);

const io = new Server(server);
io.on("connection", (socket) => {
  socket.on("join-room", (roomId, userId) => {
    socket.join(roomId);
    socket.broadcast.to(roomId).emit("user-connected", userId);
  });
});
server.listen(3000, () => console.log("Server listening at port 3000"));
