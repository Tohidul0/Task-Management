import { Request, Response } from "express";
import { Task } from "../models/Task";
import Notice from "../models/notification";
import { User } from "../models/User";

export const createTask = async (req: any, res: Response): Promise<void> => {
  try {
    const { userId } = req.user;

    const { title, team, stage, date, priority } = req.body;

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
   
    var Team = [];
    for (let i = 0; i < team.length; i++) {
      
      let user = await User.findOne({ _id: team?.[i] });
    
     if(user){
      const { password, ...userWithoutPassword } = user.toObject();
      Team.push(userWithoutPassword);
     }
     
    }
    console.log(Team);

    const task = await Task.create({
      title,
      team: Team,
      stage: stage.toLowerCase(),
      date,
      priority: priority.toLowerCase(),
     
      activities: [activity],
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

export const updateTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { taskId } = req.params; 
    const { title, team, stage, date, priority } = req.body; 

    const task = await Task.findById(taskId);

    if (!task) {
      res.status(404).json({ status: false, message: "Task not found." });
      return;
    }

    if (title) task.title = title;
    if (stage) task.stage = stage.toLowerCase();
    if (date) task.date = date;
    if (priority) task.priority = priority.toLowerCase();
    

    let updatedTeam = task.team;

    if (team && team.length) {
      updatedTeam = [];
      for (let i = 0; i < team.length; i++) {
        const user = await User.findOne({ _id: team[i] });
        if (user) {
          const { password, ...userWithoutPassword } = user.toObject();
          updatedTeam.push(userWithoutPassword);
        }
      }
      task.team = updatedTeam;
    }

    // Save the updated task
    const updatedTask = await task.save();

    res.status(200).json({
      status: true,
      message: "Task updated successfully.",
      task: updatedTask,
    });
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ status: false, message: error.message });
  }
};



export const deleteTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { taskId } = req.params;
    const task = await Task.findById(taskId);

    if (!task) {
      res.status(404).json({ status: false, message: "Task not found." });
      return;
    }
    await Task.findByIdAndDelete(taskId);

    res.status(200).json({
      status: true,
      message: "Task deleted successfully.",
    });
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ status: false, message: error.message });
  }
};
export const OneTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { taskdetailsID } = req.params;
    const task = await Task.findById(taskdetailsID);

    if (!task) {
      res.status(404).json({ status: false, message: "Task not found." });
      return;
    }
    console.log(task)
    

    res.status(200).json({
      status: true,
      data: task,
      message: "Get Task successfully.",
    });
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ status: false, message: error.message });
  }
};


export const allTask = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;
  const whoIsUser = await User.findById(userId);
  console.log(whoIsUser);

  if(whoIsUser?.isAdmin){
    try {
      const tasks = await Task.find({});
  
      if (!tasks || tasks.length === 0) {
        res.status(404).json({
          status: false,
          message: "No tasks found.",
        });
        return;
      }
      let todo = 0;
      let inprogress = 0;
      let completed = 0;
      let medium = 0;
      let high = 0;
      let normal = 0;
      let low = 0;
  
      for (let i = 0; i < tasks.length; i++) {
        if (tasks?.[i]?.stage == "todo") {
          todo++;
        }
        if (tasks?.[i]?.stage == "in progress") {
          inprogress++;
        }
        if (tasks?.[i]?.stage == "completed") {
          completed++;
        }
        if (tasks?.[i]?.priority == "medium") {
          medium = medium + 100;
        }
        if (tasks?.[i]?.priority == "high") {
          high = high + 100;
        }
        if (tasks?.[i]?.priority == "normal") {
          normal = normal + 100;
        }
        if (tasks?.[i]?.priority == "low") {
          low = low + 100;
        }
      }
      const all = {
        todo,
        inprogress,
        completed,
      };
      const chart = [
        { name: "High", total: high },
        { name: "Medium", total: medium },
        { name: "Normal", total: normal },
        { name: "Low", total: low },
      ];
  
      //console.log(tasks)
      res.status(200).json({
        status: true,
        message: "tasks retrieved successfully.",
        data: tasks,
        all,
        chart,
      });
    } 
    catch (error) {
      console.error("Error fetching all tasks:", error);
      res.status(500).json({
        status: false,
        message: "Internal Server Error. Please try again.",
      });
    }
  }
  else{
    try{
      const tasks = await Task.find({
        team: {
          $elemMatch: {
            _id: userId
          }
        }
      });
      if (!tasks || tasks.length === 0) {
        res.status(404).json({
          status: false,
          message: "No tasks found.",
        });
        return;
      }
      let todo = 0;
      let inprogress = 0;
      let completed = 0;
      let medium = 0;
      let high = 0;
      let normal = 0;
      let low = 0;
  
      for (let i = 0; i < tasks.length; i++) {
        if (tasks?.[i]?.stage == "todo") {
          todo++;
        }
        if (tasks?.[i]?.stage == "in progress") {
          inprogress++;
        }
        if (tasks?.[i]?.stage == "completed") {
          completed++;
        }
        if (tasks?.[i]?.priority == "medium") {
          medium = medium + 100;
        }
        if (tasks?.[i]?.priority == "high") {
          high = high + 100;
        }
        if (tasks?.[i]?.priority == "normal") {
          normal = normal + 100;
        }
        if (tasks?.[i]?.priority == "low") {
          low = low + 100;
        }
      }
      const all = {
        todo,
        inprogress,
        completed,
      };
      const chart = [
        { name: "High", total: high },
        { name: "Medium", total: medium },
        { name: "Normal", total: normal },
        { name: "Low", total: low },
      ];
  
      //console.log(tasks)
      res.status(200).json({
        status: true,
        message: "tasks retrieved successfully.",
        data: tasks,
        all,
        chart,
      });
    }catch(error){
      console.error("Error fetching all tasks:", error);
      res.status(500).json({
        status: false,
        message: "Internal Server Error. Please try again.",
      });
    }

    
  }
};
