import { Request, Response } from "express";
import { todoModel } from "../models/";

class TodoController {
  async getAllTodos(req: Request, res: Response) {
    const todos = await todoModel.find();
    res.json(todos);
  }

  async createTodo(req: Request, res: Response) {
    const todo = new todoModel(req.body);
    await todo.save();
    res.json(todo);
  }
}

export default TodoController;
