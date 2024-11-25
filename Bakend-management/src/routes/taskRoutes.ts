// src/routes/taskRoutes.ts
import express from "express";
import { createTask, getTasks } from "../controllers/taskController";
import { authenticate } from "../middlewares/authMiddleware";
const router = express.Router();

router.post("/", authenticate, createTask);
router.get("/", authenticate, getTasks);

export default router;
