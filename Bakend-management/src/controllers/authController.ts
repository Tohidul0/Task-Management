import { Request, Response } from "express";
import bcrypt from "bcryptjs";

import { User } from "../models/User";
import { generateToken } from "../utils/jwt";
import { string } from "zod";


export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, isAdmin, role, title } = req.body;

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
    console.log(user)
    if (!user) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch)
    if (!isMatch) {
      res.status(401).json({ message: "Invalid credentials." });
      return;
    }
    console.log("aaaaa")

    const token : string = await  generateToken(user.email);
    console.log(token)
    res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" });
    
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
