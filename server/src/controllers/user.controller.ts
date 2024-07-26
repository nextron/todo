import { Request, Response } from "express";
import { userModel } from "../models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UserController {
  async getProfile(req: Request, res: Response) {
    // get users from db
    const users = await userModel.find();
    console.log(users);
    res.json();
  }

  async signUp(req: Request, res: Response) {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 8);
      const user = new userModel({ ...req.body, password: hashedPassword });
      console.log(user);
      await user.save();
      const token = await jwt.sign({ _id: user._id }, process.env.SECRET_KEY!, {
        expiresIn: "7 days",
      });
      res.send({ user, token });
    } catch (error) {
      // res.status(400);
      res.status(400).send({ message: "Error in signup", error });
    }
  }

  async login(req: Request, res: Response) {
    try {
      console.log(req.body);
      const user = await userModel.findOne({ email: req.body.email });
      res.send(user);
    } catch (error) {
      res.send({ message: "Error in login", error });
    }
  }
}

export default UserController;
