import express from "express";
import { allTask, createTask, deleteTask, OneTask, updateTask } from "../controllers/taskController";
import { authenticate } from "../middlewares/authMiddleware";

const router = express.Router();

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     description: This endpoint creates a new task by providing the title, description, priority, and assigned user.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Task title"
 *               description:
 *                 type: string
 *                 example: "Task description goes here."
 *               priority:
 *                 type: string
 *                 example: "High"
 *               assignedTo:
 *                 type: string
 *                 example: "60d5f78e9b0dcd2f8f8b5e7a"  # Example user ID
 *     responses:
 *       201:
 *         description: Task successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "60d6b75f33a2d8f6b8d9f7d1"
 *                 title:
 *                   type: string
 *                   example: "Task title"
 *                 description:
 *                   type: string
 *                   example: "Task description goes here."
 *                 priority:
 *                   type: string
 *                   example: "High"
 *                 assignedTo:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "60d5f78e9b0dcd2f8f8b5e7a"
 *                     name:
 *                       type: string
 *                       example: "John Doe"
 *       400:
 *         description: Bad Request, invalid input
 *       500:
 *         description: Internal server error
 */
router.post("/", authenticate, createTask);
router.get("/taskdetails/:taskdetailsID", authenticate, OneTask);
router.put("/:taskId", authenticate, updateTask);
router.delete("/:taskId", authenticate, deleteTask);

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks
 *     description: This endpoint retrieves all tasks from the database.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "60d6b75f33a2d8f6b8d9f7d1"
 *                   title:
 *                     type: string
 *                     example: "Task title"
 *                   description:
 *                     type: string
 *                     example: "Task description goes here."
 *                   priority:
 *                     type: string
 *                     example: "High"
 *                   assignedTo:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "60d5f78e9b0dcd2f8f8b5e7a"
 *                       name:
 *                         type: string
 *                         example: "John Doe"
 *       500:
 *         description: Internal server error
 */
//router.get("/", authenticate, getTasks);
router.get("/allTask/:userId", authenticate, allTask)
export default router;
