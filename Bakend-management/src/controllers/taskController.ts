// src/controllers/taskController.ts
import { Request, Response } from "express";
import { Task } from "../models/Task";

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
  
      const task = await Task.create({
        title,
        team,
        stage: stage.toLowerCase(),
        date,
        priority: priority.toLowerCase(),
        assets,
        activities: [activity], // Activities is an array
      });
  
      // await Notice.create({
      //   team,
      //   text,
      //   task: task._id,
      // });
  
      res
        .status(200)
        .json({ status: true, task, message: "Task created successfully." });
    } catch (error: any) {
      console.error(error);
      res.status(400).json({ status: false, message: error.message });
    }
  };

// export const getTasks = async (req: Request, res: Response) => {
//     const tasks = await Task.find().populate("assignedTo");
//     res.status(200).json(tasks);
// };

export const allTask = async (req: Request, res: Response): Promise<void> => {
  try {
    // Retrieve all users from the database
    const tasks = await Task.find({});
    // Exclude the password field for security

    // Check if any users exist
    if (!tasks || tasks.length === 0) {
      res.status(404).json({
        status: false,
        message: "No tasks found.",
      });
      return;
    }
    console.log(tasks)
    res.status(200).json({
      status: true,
      message: "tasks retrieved successfully.",
      data: tasks,
    });
  } catch (error) {
    console.error("Error fetching all tasks:", error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error. Please try again.",
    });
  }
};
