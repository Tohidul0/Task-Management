import Notice from "../models/notification";
import { Request, Response } from "express";
import mongoose from "mongoose";

export const getNotifications = async(req: any, res: Response): Promise<void> => {
  const { userId } = req.params; 
  
  try {
   
    const notifications = await Notice.find({
      team: userId,
      isRead: { $ne: userId }, 
    });

    if (!notifications.length) {
      res.json({ message: 'No notifications found for this user.' });
      return;
    }
    res.status(200).json({ notifications });
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching notifications.' });
  }
  };
  
 

export const markNotificationAsRead = async (req: Request, res: Response): Promise<void> => {
  const { notificationId, userId } = req.params;

  try {
    
    const userObjectId = new mongoose.Types.ObjectId(userId);

    const notification = await Notice.findById(notificationId);

    if (!notification) {
      res.status(404).json({ message: 'Notification not found.' });
      return;
    }
    //render

   
    if (notification.isRead.includes(userObjectId)) {
      res.status(400).json({ message: 'Notification already marked as read by this user.' });
      return;
    }

    
    notification.isRead.push(userObjectId);

   
    await notification.save();

    res.status(200).json({ message: 'Notification marked as read.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while updating the notification.' });
  }
};
