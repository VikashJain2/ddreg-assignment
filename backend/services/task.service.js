import Task from "../models/task.model.js";
import User from "../models/user.model.js";
import mongoose from "mongoose";
const createTask = async ({
  title,
  description,
  dueDate,
  priority,
  userId,
}) => {
  try {
    const newTask = await Task.create({
      title,
      description,
      dueDate,
      priority,
      createdBy: userId,
    });

    const updateUser = await User.findByIdAndUpdate(userId, {
      $push: { tasks: newTask._id },
    });

    if (updateUser.isModified) {
      console.log("User Modified");
    } else {
      console.log("User not Modified");
    }

    return {
      task: newTask,
      success: true,
      message: "Task Created SuccessFully",
    };
  } catch (error) {
    throw new Error(error);
  }
};

const getTasks = async ({ filter, sortOptions }) => {
  try {
    const task = await Task.find(filter).sort(sortOptions);
    if (!task) {
      return {
        success: false,
        message: "Task Not Found",
      };
    }
    return {
      success: true,
      task: task,
    };
  } catch (error) {
    throw new Error(error);
  }
};

const getAnalytics = async ({ userId }) => {
  try {
    const analyticsData = await Task.aggregate([
      {
        $match: {
          createdBy: new mongoose.Types.ObjectId(userId),
          dueDate: { $exists: true },
        },
      },
      {
        $facet: {
          priorityData: [
            {
              $group: {
                _id: null,
                highPriority: {
                  $sum: {
                    $cond: [{ $eq: ["$priority", "High"] }, 1, 0],
                  },
                },
                mediumPriority: {
                  $sum: {
                    $cond: [{ $eq: ["$priority", "Medium"] }, 1, 0],
                  },
                },
                lowPriority: {
                  $sum: {
                    $cond: [{ $eq: ["$priority", "Low"] }, 1, 0],
                  },
                },
                totalTasks: {
                  $sum: 1,
                },
              },
            },
            {
              $project: {
                _id: 0,
                highPriority: 1,
                mediumPriority: 1,
                lowPriority: 1,
                totalTasks: 1,
              },
            },
          ],

          dayWiseCompletionData: [
            {
              $addFields: {
                completionDate: {
                  $ifNull: ["$completedAt", "$createdAt"],
                },
              },
            },
            {
              $match: {
                completionDate: { $exists: true },
              },
            },
            {
              $addFields: {
                dayStart: {
                  $dateFromParts: {
                    year: { $year: "$completionDate" },
                    month: { $month: "$completionDate" },
                    day: { $dayOfMonth: "$completionDate" },
                  },
                },
              },
            },
            {
              $group: {
                _id: "$dayStart",
                totalTasks: { $sum: 1 },
                completedTasks: {
                  $sum: {
                    $cond: [{ $eq: ["$status", "Completed"] }, 1, 0],
                  },
                },
              },
            },
            {
              $addFields: {
                completionPercentage: {
                  $cond: {
                    if: { $eq: ["$totalTasks", 0] },
                    then: 0,
                    else: {
                      $multiply: [
                        { $divide: ["$completedTasks", "$totalTasks"] },
                        100,
                      ],
                    },
                  },
                },
              },
            },
            {
              $project: {
                _id: 0,
                day: "$_id",
                totalTasks: 1,
                completedTasks: 1,
                completionPercentage: 1,
              },
            },
          ],
        },
      },
    ]);

    return {
      success: true,
      analyticsData,
    };
  } catch (error) {
    throw new Error(error);
  }
};
export default { createTask, getTasks, getAnalytics };
