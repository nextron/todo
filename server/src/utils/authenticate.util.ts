import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../constants/global";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).send({ error: "Please authenticate." });
    }
    const decoded = await jwt.verify(token, process.env.SECRET_KEY!);
    req.user = decoded as User;
    next();
    // return;
  } catch (error) {
    res.status(401).send({ error: "Please authenticate." });
    return;
  }
  return; // Add this return statement
};

export default authenticate;
