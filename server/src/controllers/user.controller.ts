import { Request, Response } from "express";
import { userModel } from "../models";

class UserController {
  async getUsers(req: Request, res: Response) {
    // get users from db
    const users = await userModel.find();
    console.log(users);
    res.json();
  }
}

export default UserController;
