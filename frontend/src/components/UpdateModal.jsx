import React, { useState } from 'react'
import { axiosInstance } from '../utils/axiosInstance';
import { summaryApi } from '../utils/summaryAPI';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { updateTask } from '../store/taskSlice';
const UpdateModal = ({closeUpdateModal, selectedTask:task}) => {
  const dispatch = useDispatch();
  const [isUpdatingTask, setIsUpdatingTask] = useState(false);
  const [selectedTask, setSelectedTask] = useState({
    _id: task._id,
    title: task.title,
    description: task.description,
    dueDate: task.dueDate ? task.dueDate.split("T")[0] : "",
    priority: task.priority,
    status: task.status
  });

  // console.log(selectedTask)
  const handleUpdateInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedTask({ ...selectedTask, [name]: value });
  };

  const handleUpdateTask = async()=>{
    setIsUpdatingTask(true)
    try{
      const response = await axiosInstance({
        method: summaryApi.updateTask.method,
        url: `${summaryApi.updateTask.path}/${selectedTask._id}`,
        data: selectedTask
      })
      console.log(response.data.success)

      if(response.data.success){
        toast.success(response.data.message)
        dispatch(updateTask(response.data.data))
        closeUpdateModal()
      }else{
        toast.error(response.data.message)
      }
    }catch(error){
      if(error.response){
        toast.error(error.response.data.message)
      }else{
        toast.error("Error updating task")
      }
    }finally{
      setIsUpdatingTask(false)
    }
  }
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-gray-800/90 backdrop-blur-md p-4 sm:p-6 rounded-xl shadow-lg w-full max-w-md">
        <h3 className="text-lg sm:text-xl font-semibold mb-6 text-gray-200">
          Update Task
        </h3>

        {/* Title Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Title
          </label>
          <input
            type="text"
            name="title"
            placeholder="Enter task title"
            value={selectedTask.title}
            onChange={handleUpdateInputChange}
            className="w-full p-2 rounded-md bg-gray-700/50 border-2 border-gray-600/50 text-white focus:outline-none focus:border-indigo-500 transition-all duration-300 hover:border-gray-500"
          />
        </div>

        {/* Description Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Description
          </label>
          <textarea
            name="description"
            placeholder="Enter task description"
            value={selectedTask.description}
            onChange={handleUpdateInputChange}
            rows="3"
            className="w-full p-2 rounded-md bg-gray-700/50 border-2 border-gray-600/50 text-white focus:outline-none focus:border-indigo-500 transition-all duration-300 hover:border-gray-500 resize-none"
          />
        </div>

        {/* Due Date Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Due Date
          </label>
          <input
            type="date"
            name="dueDate"
            value={selectedTask.dueDate}
            onChange={handleUpdateInputChange}
            className="w-full p-2 rounded-md bg-gray-700/50 border-2 border-gray-600/50 text-white focus:outline-none focus:border-indigo-500 transition-all duration-300 hover:border-gray-500"
          />
        </div>

        {/* Priority Dropdown */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Priority
          </label>
          <div className="relative">
            <select
              name="priority"
              value={selectedTask.priority}
              onChange={handleUpdateInputChange}
              className="w-full p-2 pr-8 rounded-md bg-gray-700/50 border-2 border-gray-600/50 text-white focus:outline-none focus:border-indigo-500 appearance-none transition-all duration-300 hover:border-gray-500"
            >
              <option value="High" className="bg-gray-800 text-red-400">
                High
              </option>
              <option value="Medium" className="bg-gray-800 text-yellow-400">
                Medium
              </option>
              <option value="Low" className="bg-gray-800 text-green-400">
                Low
              </option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
              <svg
                className="h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>


        <div className="mb-6">
                    <div className="relative">
            <select
              name="status"
              value={selectedTask.status}
              onChange={handleUpdateInputChange}
              className="w-full p-2 pr-8 rounded-md bg-gray-700/50 border-2 border-gray-600/50 text-white focus:outline-none focus:border-indigo-500 appearance-none transition-all duration-300 hover:border-gray-500"
            >
                <option value="In Progress" className="bg-gray-800">In Progress</option>
                <option value="Completed" className="bg-gray-800">Completed</option>
                <option value="Pending" className="bg-gray-800">Pending</option>
            </select>
          
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-2">
          <button
            onClick={closeUpdateModal}
            className="px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 transition-all duration-300"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdateTask}
            className="px-4 py-2 rounded-md bg-indigo-500 hover:bg-indigo-600 transition-all duration-300"
          >
            {isUpdatingTask ? (
              <div className="flex items-center justify-center">
                <div className="w-6 h-6 border-4 border-t-transparent border-indigo-500 rounded-full animate-spin"></div>
              </div>
            ) : (
              "Update Task"
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default UpdateModal
