// src/controllers/taskController.ts
import { Request, Response } from "express";
import { Task } from "../models/Task";

export const createTask = async (req: Request, res: Response) => {
    const { title, description, priority, assignedTo } = req.body;
    const task = new Task({ title, description, priority, assignedTo });
    await task.save();
    res.status(201).json(task);
};

export const getTasks = async (req: Request, res: Response) => {
    const tasks = await Task.find().populate("assignedTo");
    res.status(200).json(tasks);
};
