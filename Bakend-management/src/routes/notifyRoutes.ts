import { authenticate } from "../middlewares/authMiddleware";
import {  getNotifications, markNotificationAsRead } from "../controllers/notifyContoller";
import express from "express";
const router = express.Router();

router.get("/:userId",authenticate,getNotifications); // Get all notifications for a user
router.put("/:notificationId/read/:userId",authenticate,markNotificationAsRead); // Get all notifications for a user



export default router;
