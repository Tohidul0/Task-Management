// src/controllers/taskController.ts
import { Request, Response } from "express";
import { ITask } from "../models/Task";

export const createTask = async (req: any, res: Response): Promise<void> => {
    try {
      const { userId } = req.user; // User ID from authenticated user
  
      const { title, team, stage, date, priority, assets } = req.body;
  
      let text = "New task has been assigned to you";
      if (team?.length > 1) {
        text = text + ` and ${team.length - 1} others.`;
      }
  
      text += ` The task priority is set as ${priority} priority, so check and act accordingly. The task date is ${new Date(
        date
      ).toDateString()}. Thank you!!!`;
  
      const activity = {
        type: "assigned" as const,
        activity: text,
        by: userId,
      };
  
      const task: ITask = await Task.create({
        title,
        team,
        stage: stage.toLowerCase(),
        date,
        priority: priority.toLowerCase(),
        assets,
        activities: [activity], // Activities is an array
      });
  
      await Notice.create({
        team,
        text,
        task: task._id,
      });
  
      res
        .status(200)
        .json({ status: true, task, message: "Task created successfully." });
    } catch (error: any) {
      console.error(error);
      res.status(400).json({ status: false, message: error.message });
    }
  };

export const getTasks = async (req: Request, res: Response) => {
    const tasks = await Task.find().populate("assignedTo");
    res.status(200).json(tasks);
};
