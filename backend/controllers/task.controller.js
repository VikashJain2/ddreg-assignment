
import Task from "../models/task.model.js";
import taskService from "../services/task.service.js";
import userModel from "../models/user.model.js";
const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority } = req.body;

    if (!title || !description || !dueDate || !priority) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    // const newTask = new Task({
    //   title: title,
    //   description: description,
    //   dueDate: dueDate,
    //   priority: priority,
    //   createdBy: req.user.userId,
    // });

    // await newTask.save();

    const response = await taskService.createTask({
      title,
      description,
      dueDate,
      priority,
      userId: req.user.userId,
    });

    if (response.success === false) {
      return res
        .status(400)
        .json({ success: response.success, message: response.message });
    }
    return res.status(201).json({
      success: response.success,
      message: response.message,
      newTask: response.task,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message || error });
  }
};

const getDashboardAnalytics = async (req, res) => {
  try {
    const response = await taskService.getAnalytics({userId: req.user.userId})

    const result = {
      priorityData: response.analyticsData[0].priorityData[0] || {},
      dayWiseCompletionData: response.analyticsData[0]?.dayWiseCompletionData || [],
    };
    console.log(result);

    return res.status(200).json({
      success: true,
      message: "Dashboard analytics fetched successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error fetching dashboard analytics:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message || error,
    });
  }
};

const getTasks = async (req, res) => {
  try {
    const { status, priority, sortBy, sortOrder } = req.query;
    const filter = { createdBy: req.user.userId };

    if (status) {
      filter.completed = status === "completed";
    }

    if (priority) {
      filter.priority = priority;
    }

    const sortOptions = {};
    if (sortBy) {
      sortOptions[sortBy] = sortOrder === "desc" ? -1 : 1;
    }

    const response = await taskService.getTasks({ filter, sortOptions });
    if (!response.success) {
      return res
        .status(400)
        .json({ success: response.success, message: response.message });
    }

    return res
      .status(200)
      .json({ success: response.success, task: response.task });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message || error });
  }
};

const getTaskById = async (req, res) => {
  try {
    const taskId = req.params.id;
    if (!taskId) {
      return res
        .status(400)
        .json({ success: false, message: "Task ID is required" });
    }
    const task = await Task.findById(taskId);
    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }
    return res.status(200).json({ success: true, data: task });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message || error });
  }
};

const updateSpecificTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    if (!taskId) {
      return res
        .status(400)
        .json({ success: false, message: "Task ID is required" });
    }
    const task = await Task.findById(taskId);
    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }
    const { title, description, dueDate, priority, status } = req.body;
    const updateData = {
      ...(title && { title }),
      ...(description && { description }),
      ...(dueDate && { dueDate }),
      ...(priority && { priority }),
      ...(status && { status }),
    };

    if (status === "Completed") {
      updateData.completed = true;
      updateData.completedAt = new Date();
    } else {
      updateData.completed = false;
      updateData.completedAt = null;
    }

    const updatedTask = await Task.findByIdAndUpdate(taskId, updateData, {
      new: true,
    });
    return res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: updatedTask,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: error.message || error });
  }
};

const delateSpecificTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const user = await userModel.findById(req.user.userId);
    if (!taskId) {
      return res
        .status(400)
        .json({ success: false, message: "Task ID is required" });
    }
    const task = await Task.findById(taskId);
    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }
    await Task.findByIdAndDelete(taskId);

    user.tasks = user.tasks.filter((task) => task.toString() !== taskId);

    await user.save();
    return res
      .status(200)
      .json({ success: true, message: "Task deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message || error });
  }
};
export {
  createTask,
  getDashboardAnalytics,
  getTasks,
  getTaskById,
  updateSpecificTask,
  delateSpecificTask,
};
