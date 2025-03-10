import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      minlength: [3, "Title must be at least 3 characters long"],
      maxlength: [100, "Title cannot be longer than 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      minlength: [10, "Description must be at least 10 characters long"],
      maxlength: [500, "Description cannot be longer than 500 characters"],
    },
    dueDate: {
      type: Date,
      required: [true, "Due date is required"],
      validate: {
        validator: function (value) {
          return value > Date.now();
        },
        message: "Due date must be in the future",
      },
    },
    priority: {
      type: String,
      enum: {
        values: ["High", "Medium", "Low"],
        message: "Priority must be one of: High, Medium, or Low",
      },
      default: "Medium",
    },
    assignedTo: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Assigned user is required"],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Creator is required"],
    },
    completed: {
      type: Boolean,
      default: false,
    },
    completedAt: {
      type: Date,
      validate: {
        validator: function (value) {
          return !this.completed || value != null;
        },
        message: "completedAt must be provided if the task is completed",
      },
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
