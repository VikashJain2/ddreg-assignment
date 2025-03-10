import Task from "../models/task.model.js";

const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority } = req.body;

    if (!title || !description || !dueDate || !priority) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const newTask = new Task({
      title: title,
      description: description,
      dueDate: dueDate,
      priority: priority,
      createdBy: req.user.userId,
    });

    await newTask.save();
    return res
      .status(201)
      .json({ success: true, message: "Task created successfully", newTask });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message || error });
  }
};

const getDashboardAnalytics = async (req, res) => {
  try {
    // Aggregation Pipeline
    const analytics = await Task.aggregate([
      {
        $group: {
          _id: "$assignedTo",
          totalTasks: { $sum: 1 },
          completedTasks: {
            $sum: {
              $cond: [{ $eq: ["$completed", true] }, 1, 0],
            },
          },
          pendingTasks: {
            $sum: {
              $cond: [{ $eq: ["$completed", false] }, 1, 0],
            },
          },
        },
      },

      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      {
        $unwind: {
          path: "$userDetails",
          preserveNullAndEmptyArrays: true,
        },
      },

      {
        $facet: {
          tasksByPriority: [
            {
              $group: {
                _id: "$priority",
                totalTasks: { $sum: 1 },
              },
            },
          ],
          taskStatus: [
            {
              $group: {
                _id: "$completed",
                totalTasks: { $sum: 1 },
              },
            },
          ],
          tasksByDueDate: [
            {
              $group: {
                _id: {
                  $cond: [
                    { $gte: ["$dueDate", new Date()] },
                    "Upcoming",
                    "Overdue",
                  ],
                },
                totalTasks: { $sum: 1 },
              },
            },
          ],
        },
      },
    ]);

    const result = {
      userTasks: analytics,
      tasksByPriority: analytics[0]?.tasksByPriority || [],
      taskStatus: analytics[0]?.taskStatus || [],
      tasksByDueDate: analytics[0]?.tasksByDueDate || [],
    };

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

    const tasks = await Task.find(filter).sort();

    return res.status(200).json({ success: true, tasks });
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
    const { title, description, dueDate, priority, completed } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(taskId, {
      ...(title && { title }),
      ...(description && { description }),
      ...(dueDate && { dueDate }),
      ...(priority && { priority }),
      ...(completed && { completed }),
    });
    return res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: updatedTask,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message || error });
  }
};

const delateSpecificTask = async (req, res) => {
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
    await Task.findByIdAndDelete(taskId);
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
