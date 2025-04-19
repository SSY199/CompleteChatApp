import { Server } from "socket.io";
import Message from "./models/message.model.js";

const setupSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.ORIGIN,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  const userSocketMap = new Map();

  const disconnectUser = (userId, socket) => {
    console.log(`User ${userId} disconnected with socket ID: ${socket.id}`);
    for (const [storedUserId, socketId] of userSocketMap.entries()) {
      if (socketId === socket.id) {
        userSocketMap.delete(storedUserId);
        break;
      }
    }
  };

  const sendMessage = async (message) => {
    const senderSocketId = userSocketMap.get(message.sender);
    const receiverSocketId = userSocketMap.get(message.receiver);

    const createdMessage = await Message.create(message);

    const messageData = await Message.findById(createdMessage.id)
      .populate("sender", "_id email firstName lastName image color") // Ensure _id is included
      .populate("receiver", "_id email firstName lastName image color"); // Ensure _id is included

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("receiveMessage", messageData);
    }
    if (senderSocketId) {
      io.to(senderSocketId).emit("receiveMessage", messageData);
    }
  };

  io.on("connection", (socket) => {
    const userId = socket.handshake.auth.userId;

    if (userId) {
      userSocketMap.set(userId, socket.id);
      console.log(`User ${userId} connected with socket ID: ${socket.id}`);
    } else {
      console.log("User ID not provided in handshake query.");
    }

    socket.on("sendMessage", sendMessage);

    socket.on("disconnect", () => disconnectUser(userId, socket));
  });

  return io;
};

export default setupSocket;