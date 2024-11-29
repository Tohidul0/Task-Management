import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import dotenv from "dotenv";
const cookieParser = require('cookie-parser');
dotenv.config();
const JWT_SECRET : any = process.env.JWT_SECRET ;

interface CustomRequest extends Request {
    user?: string | JwtPayload; 
}

export const authenticate = (req: CustomRequest, res: Response, next: NextFunction): void => {
    console.log(req.header)
    const token = req.cookies.token
    console.log(token)
    if (!token) {
        res.status(401).send("Unauthorized");
        return;
    }

    const decoded = verifyToken(token);
    if (!decoded) {
        res.status(401).send("Invalid token");
        return;
    }

    req.user = decoded;
    next();
};

const verifyToken = (token: string): string | JwtPayload | null => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch {
        return null;
    }
};
