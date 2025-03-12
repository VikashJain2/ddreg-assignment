import React from "react";
import { axiosInstance } from "../utils/axiosInstance";
import { summaryApi } from "../utils/summaryAPI";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { removeTask } from "../store/taskSlice";

const DeleteModal = ({ closeDeleteModal, taskId,fetchAnalytics }) => {
  const dispatch = useDispatch();
  const handleDeleteTask = async () => {
    try {
      const response = await axiosInstance({
        method: summaryApi.delateTask.method,
        url: `${summaryApi.delateTask.path}/${taskId}`,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(removeTask(taskId));
        fetchAnalytics()
        closeDeleteModal();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Error deleting task");
      }
    }
  };
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-gray-800/90 backdrop-blur-md p-4 sm:p-6 rounded-xl shadow-lg w-full max-w-sm">
        <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-200">
          Delete Task
        </h3>
        <p className="text-gray-300 mb-6">
          Are you sure you want to delete this task?
        </p>
        <div className="flex justify-end gap-2">
          <button
            onClick={closeDeleteModal}
            className="px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 transition-all duration-300"
          >
            Cancel
          </button>
          <button
            onClick={handleDeleteTask}
            className="px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 transition-all duration-300"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
