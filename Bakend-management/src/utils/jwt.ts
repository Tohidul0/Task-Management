import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET : any = process.env.JWT_SECRET ;

export const generateToken = (email: string): string => {
   
  return jwt.sign({ email }, JWT_SECRET , { expiresIn: "1d" });
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, JWT_SECRET);
};
