import React from "react";

const TaskDetailsModal = ({ task, onClose }) => {
  if (!task) return null;

  // Function to get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "text-yellow-500"; // Yellow for Pending
      case "In Progress":
        return "text-blue-500"; // Blue for In Progress
      case "Completed":
        return "text-green-500"; // Green for Completed
      default:
        return "text-white";
    }
  };

  // Function to get priority color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "text-red-500"; // Red for High
      case "Medium":
        return "text-yellow-500"; // Yellow for Medium
      case "Low":
        return "text-green-500"; // Green for Low
      default:
        return "text-white";
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      style={{ backdropFilter: "blur(4px)" }} // Optional: Adds a blur effect to the backdrop
    >
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
        <h2 className="text-2xl font-bold mb-4 text-white">Task Details</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400">Title</label>
            <p className="mt-1 text-white">{task.title}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400">Description</label>
            <p className="mt-1 text-white">{task.description}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400">Status</label>
            <p className={`mt-1 ${getStatusColor(task.status)}`}>{task.status}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400">Priority</label>
            <p className={`mt-1 ${getPriorityColor(task.priority)}`}>{task.priority}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400">Creation Time</label>
            <p className="mt-1 text-white">{new Date(task.createdAt).toLocaleString()}</p>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-all duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsModal;