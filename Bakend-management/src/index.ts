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

dotenv.config();

const app = express();
const server = http.createServer(app);

setupSocket(server);
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

server.listen(3000, () => console.log("Server running on port 3000"));
