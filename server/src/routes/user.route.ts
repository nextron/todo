import express from "express";
import { UserController } from "../controllers/";
import authenticate from "../utils/authenticate.util";

const router = express.Router();
const userController = new UserController();

router.get("/", authenticate, userController.getProfile);
router.post("/signup", userController.signUp);
router.post("/login", userController.login);
export default router;
