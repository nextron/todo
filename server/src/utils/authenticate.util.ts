import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface User {
  _id: string;
  email: string;
}

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
    const decoded = jwt.verify(token, process.env.SECRET_KEY!) as User;
    req.user = decoded;
    next();
    // return;
  } catch (error) {
    res.status(401).send({ error: "Please authenticate." });
    return;
  }
  return; // Add this return statement
};

export default authenticate;
