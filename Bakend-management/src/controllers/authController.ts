import { Request, Response } from "express";
import bcrypt from "bcryptjs";

import { User } from "../models/User";
import { generateToken } from "../utils/jwt";
import { string } from "zod";


export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, isAdmin=false, role, title } = req.body;

    // Check if the user already exists
    const userExist = await User.findOne({ email });
    if (userExist) {
      res.status(400).json({
        status: false,
        message: "User already exists",
      });
      return;
    }

    // Hash the password for security
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword, // Save the hashed password
      isAdmin,
      role,
      title,
    });

    res.status(201).json({
      status: true,
      message: "success"
      
    });
    return;
  } catch (error) {
    console.error("Error in user registration:", error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error. Please try again.",
    });
    return;
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    console.log(req.body)
    const user = await User.findOne({ email });
    
    if (!user) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      res.status(401).json({ message: "Invalid credentials." });
      return;
    }
    //console.log("aaaaa")

    const token : string =   generateToken(user._id);
    //console.log(token)
    res.cookie("token", token, { httpOnly: true,
       secure: process.env.NODE_ENV === "production",
       sameSite: "none",
       domain: process.env.NODE_ENV === "production" ? "http://localhost:3000" : undefined });
    
    res.status(200).json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isAdmin: user.isAdmin,
        isActive: user.isActive,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "An error occurred.", error });
  }
};
export const logoutUser = async(req: Request, res: Response): Promise<void> =>{
  try {
    res.cookie("token", "", {
      //htttpOnly: true,
      expires: new Date(0),
    });

    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.log(error);
     res.status(400).json({  message: "Logout failed!!"});
  }
};





export const allUser = async (req: Request, res: Response): Promise<void> => {
  try {
    // Retrieve all users from the database
    const users = await User.find({}).select("-password"); // Exclude the password field for security

    // Check if any users exist
    if (!users || users.length === 0) {
      res.status(404).json({
        status: false,
        message: "No users found.",
      });
      return;
    }
    //console.log(users)
    res.status(200).json({
      status: true,
      message: "Users retrieved successfully.",
      data: users,
    });
  } catch (error) {
    console.error("Error fetching all users:", error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error. Please try again.",
    });
  }
};

