import { Request, Response } from "express";
import { userModel } from "../models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../constants/global";

class UserController {
  async getProfile(req: Request, res: Response) {
    res.status(200).send({ user: req.user });
  }

  async signUp(req: Request, res: Response) {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 8);
      const user = new userModel({ ...req.body, password: hashedPassword });
      await user.save();
      const token = await jwt.sign({ _id: user._id }, process.env.SECRET_KEY!, {
        expiresIn: "7 days",
      });
      res.status(200).send({ user, token });
    } catch (error) {
      // res.status(400);
      res.status(400).send({ message: "Error in signup", error });
    }
  }

  async login(req: Request, res: Response) {
    try {
      console.log(req.body);
      // or opertaion can be performed as below. if needed.
      // const user = await userModel.findOne({
      // $or: [{ email: req.body.email }, { username: req.body.username }],
      // });
      const user = await userModel.findOne({
        email: req.body.email,
      });
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
      // checking for the password
      if (!(await bcrypt.compare(req.body.password, user.password as string))) {
        return res.status(401).send({ message: "Invalid password" });
      }
      const data = user._doc as User;
      data.password && delete data.password;
      // if successful, generate token
      const token = await jwt.sign({ ...data }, process.env.SECRET_KEY!, {
        expiresIn: "7 days",
      });
      return res.status(200).send({ token });
    } catch (error) {
      return res.send({ message: "Error in login", error });
    }
  }
}

export default UserController;
