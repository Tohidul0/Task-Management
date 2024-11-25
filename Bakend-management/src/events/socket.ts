// src/events/socket.ts
import { Server } from "socket.io";

export const setupSocket = (server: any) => {
    const io = new Server(server);

    io.on("connection", (socket) => {
        console.log("User connected:", socket.id);

        socket.on("task_updated", (data) => {
            io.emit("notification", data);
        });
    });

    return io;
};
