import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { todoRoute, userRoute } from "./routes";
import { connectDB } from "./utils/db.util";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(bodyParser.json());
connectDB();
app.use("/api/todos", todoRoute);
app.use("/api/user", userRoute);

app.get("/", (req: Request, res: Response) => {
  console.log("Hello World!");
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});

export default app;
