import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface CustomRequest extends Request {
    user?: string | JwtPayload; 
}

export const authenticate = (req: CustomRequest, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization?.split(" ")[1];
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
        return jwt.verify(token, "secret");
    } catch {
        return null;
    }
};
