import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import TaskDetailsModal from "./TaskDetailsModal";
import Pagination from "./Pagination";

const TaskTable = ({
  currentTasks,
  formatDate,
  openUpdateModal,
  openDeleteModal,
  tasksPerPage,
    totalTasks,
    paginate,
    currentPage
}) => {
  const [selectedTask, setSelectedTask] = useState(null);

  // Function to get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "text-yellow-500";
      case "In Progress":
        return "text-blue-500";
      case "Completed":
        return "text-green-500";
      default:
        return "text-white";
    }
  };

  // Function to get priority color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "text-red-500";
      case "Medium":
        return "text-yellow-500";
      case "Low":
        return "text-green-500";
      default:
        return "text-white";
    }
  };

  const openTaskDetailsModal = (task) => {
    setSelectedTask(task);
  };

  const closeTaskDetailsModal = () => {
    setSelectedTask(null);
  };

  return (
    <>
    <div className="w-full lg:w-7/12 bg-gray-800/80 backdrop-blur-md p-4 sm:p-6 rounded-xl shadow-lg border border-gray-700/50">
      <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-200">My Tasks</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="p-2 sm:p-3 cursor-pointer text-gray-400 hover:text-white transition-all duration-300">
                Task ID
              </th>
              <th className="p-2 sm:p-3 cursor-pointer text-gray-400 hover:text-white transition-all duration-300">
                Task Name
              </th>
              <th className="p-2 sm:p-3 cursor-pointer text-gray-400 hover:text-white transition-all duration-300">
                Status
              </th>
              <th className="p-2 sm:p-3 cursor-pointer text-gray-400 hover:text-white transition-all duration-300">
                Priority
              </th>
              <th className="p-2 sm:p-3 cursor-pointer text-gray-400 hover:text-white transition-all duration-300">
                Due Date
              </th>
              <th className="p-2 sm:p-3 text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentTasks.map((task, index) => (
              <tr
                key={task._id}
                className="border-b border-gray-700 hover:bg-gray-700/50 transition-all duration-300 cursor-pointer"
                onClick={() => openTaskDetailsModal(task)}
              >
                <td className="p-2 sm:p-3 text-center">{index + 1}</td>
                <td className="p-2 sm:p-3">{task.title}</td>
                <td className={`p-2 sm:p-3 ${getStatusColor(task.status)}`}>
                  {task.status}
                </td>
                <td className={`p-2 sm:p-3 ${getPriorityColor(task.priority)}`}>
                  {task.priority}
                </td>
                <td className="p-2 sm:p-3">{formatDate(task.dueDate)}</td>
                <td className="p-2 sm:p-3 flex gap-3 justify-evenly">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openUpdateModal(task);
                    }}
                    className="text-blue-500 hover:text-blue-600 transition-all duration-300"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openDeleteModal(task);
                    }}
                    className="text-red-500 hover:text-red-600 transition-all duration-300"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        tasksPerPage={tasksPerPage}
        totalTasks={totalTasks}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
      {selectedTask && (
        <TaskDetailsModal task={selectedTask} onClose={closeTaskDetailsModal} />
      )}
      </>
  );
};

export default TaskTable;