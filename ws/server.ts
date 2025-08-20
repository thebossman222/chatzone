import { createServer } from "http";
import { Server, Socket } from "socket.io";

const server = createServer();
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on(`connection`, async (socket: Socket) => {
  socket.on(`join`, (channelId) => {
    socket.join(channelId);
    io.to(channelId).emit(`user joined`, socket.id);
  });

  socket.on(`chat message`, (msg, channelId) => {
    io.to(channelId).emit(`chat message`, {
      content: msg,
    });
  });

  socket.on(`disconnect`, () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

const WEBSOCKET_PORT = 3001;
server.listen(WEBSOCKET_PORT, () => {
  console.log(
    `WebSocket server is running on ws://localhost:${WEBSOCKET_PORT}`
  );
});
