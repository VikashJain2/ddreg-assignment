import Task from "../models/task.model.js";

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

    return {
      task: newTask,
      success: true,
      message: "Task Created SuccessFully",
    };
  } catch (error) {
    throw new Error(error)
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
    throw new Error(error)
  }
};

export default { createTask,getTasks };
