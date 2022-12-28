import { createServer } from "http";
import app from "./app.js";
import { Server } from "socket.io";
const server = createServer(app);

const io = new Server(server);
io.on("connection", (socket)=>{
   socket.on("join-room", (roomId, userId)=>{
      console.log();
   })
})
// io.listen(3000, () => console.log("Server listening at port 3000"));
server.listen(3000, () => console.log("Server listening at port 3000"));
