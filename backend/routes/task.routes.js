import express from 'express'
import { createTask } from '../controllers/task.controller.js'
import authMiddleware from '../middleware/auth.middleware.js'

const taskRouter = express.Router()

taskRouter.post("/tasks", authMiddleware, createTask)

export default taskRouter