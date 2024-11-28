import express from "express";
import http from "http";

import cors from "cors";
import { swaggerSpec } from "./docs/swagger";
import swaggerUi from "swagger-ui-express";
import dotenv from "dotenv";
import { connectDB } from "./config/database";
import { setupSocket } from "./events/socket";
import authRoutes from "./routes/authRoutes";
import taskRoutes from "./routes/taskRoutes";
import notifyRotes from "./routes/notifyRoutes";

import cookieParser from "cookie-parser";

dotenv.config();
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);

setupSocket(server);
connectDB();


app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  }));
app.use(express.json());
app.use(cookieParser());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/notification", notifyRotes);

server.listen(port, () => console.log(`Server running on port ${3000}`));
