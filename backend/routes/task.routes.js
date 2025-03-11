import express from "express";
import {
  createTask,
  delateSpecificTask,
  getTaskById,
  getTasks,
  updateSpecificTask,
} from "../controllers/task.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const taskRouter = express.Router();

taskRouter.post("/tasks", authMiddleware, createTask);
taskRouter.get("/tasks", authMiddleware, getTasks);
taskRouter.get("/tasks/:id", authMiddleware, getTaskById);
taskRouter.put("/tasks/:id", authMiddleware, updateSpecificTask);
taskRouter.delete("/tasks/:id", authMiddleware, delateSpecificTask);
export default taskRouter;
