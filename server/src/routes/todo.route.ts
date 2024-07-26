import express from "express";
import { TodoController } from "../controllers/";
import authenticate from "../utils/authenticate.util";

const router = express.Router();
const todoController = new TodoController();

router.get("/", authenticate, todoController.getAllTodos);
router.post("/", authenticate, todoController.createTodo);

export default router;
