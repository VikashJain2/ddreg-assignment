import express from "express";
import { body, param, validationResult } from "express-validator"; // Import express-validator
import {
  createTask,
  delateSpecificTask,
  getDashboardAnalytics,
  getTaskById,
  getTasks,
  updateSpecificTask,
} from "../controllers/task.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const taskRouter = express.Router();

// Validation middleware for creating a task
const validateCreateTask = [
  body("title").notEmpty().withMessage("Title is required"),
  body("description").optional().isString().withMessage("Description must be a string"),
  body("dueDate").isISO8601().withMessage("Due date must be a valid date"),
  body("priority").isIn(["High", "Medium", "Low"]).withMessage("Priority must be High, Medium, or Low"),
  body("status").optional().isIn(["Pending", "In Progress", "Completed"]).withMessage("Status must be Pending, In Progress, or Completed"),
];

// Validation middleware for updating a task
const validateUpdateTask = [
  param("id").isMongoId().withMessage("Invalid task ID"),
  body("title").optional().notEmpty().withMessage("Title cannot be empty"),
  body("description").optional().isString().withMessage("Description must be a string").isLength({min:10}).withMessage("Description must be at least 10 characters long"),
  body("dueDate").optional().isISO8601().withMessage("Due date must be a valid date"),
  body("priority").optional().isIn(["High", "Medium", "Low"]).withMessage("Priority must be High, Medium, or Low"),
  body("status").optional().isIn(["Pending", "In Progress", "Completed"]).withMessage("Status must be Pending, In Progress, or Completed"),
];

// Validation middleware for task ID
const validateTaskId = [
  param("id").isMongoId().withMessage("Invalid task ID"),
];

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }
  next();
};

// Routes
taskRouter.post("/tasks", authMiddleware, validateCreateTask, handleValidationErrors, createTask);
taskRouter.get("/tasks", authMiddleware, getTasks);
taskRouter.get("/tasks/:id", authMiddleware, validateTaskId, handleValidationErrors, getTaskById);
taskRouter.put("/tasks/:id", authMiddleware, validateUpdateTask, handleValidationErrors, updateSpecificTask);
taskRouter.delete("/tasks/:id", authMiddleware, validateTaskId, handleValidationErrors, delateSpecificTask);
taskRouter.get("/analytics", authMiddleware, getDashboardAnalytics);

export default taskRouter;