import React, { useEffect, useState } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, BarElement } from 'chart.js';
import Navbar from '../components/Navbar';
import CreateTask from '../components/CreateTask';
import { useDispatch, useSelector } from 'react-redux';
import { summaryApi } from '../utils/summaryAPI';
import { setAllTasks } from '../store/taskSlice';
import toast from 'react-hot-toast';
import axios from 'axios';
import DeleteModal from '../components/DeleteModal';
import { axiosInstance } from '../utils/axiosInstance';
import { FaCalendarAlt, FaEdit, FaTrash } from 'react-icons/fa'; // Import calendar icon
import UpdateModal from '../components/UpdateModal';

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, BarElement);

const Dashboard = () => {
  const dispatch = useDispatch();
  const [taskId, setTaskId] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Fetch all tasks from the API
  const fetchAllTasks = async () => {
    try {
      const response = await axiosInstance({
        method: summaryApi.getTasks.method,
        url: summaryApi.getTasks.path,
      });

      if (response.data.success) {
        dispatch(setAllTasks(response.data.task));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllTasks();
  }, []);

  // Get tasks from Redux store
  const data = useSelector((state) => state.tasks || []);

  // Format date
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  // State for Search and Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [showUpcoming, setShowUpcoming] = useState(false); // State for upcoming tasks filter

  // State for Modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  // Filtered Data
  const filteredData = data.tasks
    .filter((task) => {
      const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'All' || task.status === statusFilter;
      const matchesPriority = priorityFilter === 'All' || task.priority === priorityFilter;
      const isPendingOrCompleted = task.status === 'Pending' || task.status === 'Completed';
      return matchesSearch && matchesStatus && matchesPriority && isPendingOrCompleted;
    })
    .filter((task) => {
      if (showUpcoming) {
        const today = new Date();
        const dueDate = new Date(task.dueDate);
        return dueDate > today; // Only show tasks with due dates in the future
      }
      return true; // Show all tasks if "Upcoming" filter is not active
    });

  // Handle Modal Open/Close
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Handle Delete Modal Open/Close
  const openDeleteModal = (task) => {
    setTaskId(task._id);
    setIsDeleteModalOpen(true);
  };
  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  // Handle Update Modal Open/Close
  const openUpdateModal = (task) => {
    setSelectedTask(task);
    setIsUpdateModalOpen(true);
  };
  const closeUpdateModal = () => setIsUpdateModalOpen(false);

  // Priority Colors
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'text-red-500';
      case 'Medium':
        return 'text-yellow-500';
      case 'Low':
        return 'text-green-500';
      default:
        return 'text-white';
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="bg-gray-900 text-white min-h-screen w-full p-4 sm:p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold mb-8 bg-gradient-to-r from-indigo-400 to-pink-600 bg-clip-text text-transparent">
            Welcome to Your Dashboard
          </h1>

          {/* Graphs Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8">
            {/* Pie Chart */}
            <div className="bg-gray-800/80 backdrop-blur-md p-4 sm:p-6 rounded-xl shadow-lg border border-gray-700/50">
              <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-200">Task Status</h3>
              <div className="h-48 sm:h-64 flex items-center justify-center">
                <Pie
                  data={{
                    labels: ['Completed', 'In Progress', 'Pending'],
                    datasets: [
                      {
                        data: [30, 50, 20], // Example data
                        backgroundColor: ['#4CAF50', '#FFC107', '#FF5733'],
                        hoverBackgroundColor: ['#66BB6A', '#FFD54F', '#FF7043'],
                      },
                    ],
                  }}
                  options={{
                    plugins: {
                      legend: {
                        labels: {
                          color: '#fff',
                        },
                      },
                    },
                  }}
                />
              </div>
            </div>

            {/* Bar Chart */}
            <div className="bg-gray-800/80 backdrop-blur-md p-4 sm:p-6 rounded-xl shadow-lg border border-gray-700/50">
              <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-200">Task Progress</h3>
              <div className="h-48 sm:h-64">
                <Bar
                  data={{
                    labels: ['Task 1', 'Task 2', 'Task 3'], // Replace with dynamic data
                    datasets: [
                      {
                        label: 'Tasks',
                        data: [12, 19, 3], // Example data
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                      },
                    ],
                  }}
                  options={{
                    scales: {
                      y: {
                        beginAtZero: true,
                        grid: {
                          color: '#4A5568',
                        },
                        ticks: {
                          color: '#fff',
                        },
                      },
                      x: {
                        grid: {
                          color: '#4A5568',
                        },
                        ticks: {
                          color: '#fff',
                        },
                      },
                    },
                    plugins: {
                      legend: {
                        labels: {
                          color: '#fff',
                        },
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>

          {/* Table and Filters Section */}
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
            {/* Table Section */}
            <div className="w-full lg:w-7/12 bg-gray-800/80 backdrop-blur-md p-4 sm:p-6 rounded-xl shadow-lg border border-gray-700/50">
              <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-200">My Tasks</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                  <thead>
                    <tr>
                      <th className="p-2 sm:p-3 cursor-pointer text-gray-400 hover:text-white transition-all duration-300">Task ID</th>
                      <th className="p-2 sm:p-3 cursor-pointer text-gray-400 hover:text-white transition-all duration-300">Task Name</th>
                      <th className="p-2 sm:p-3 cursor-pointer text-gray-400 hover:text-white transition-all duration-300">Status</th>
                      <th className="p-2 sm:p-3 cursor-pointer text-gray-400 hover:text-white transition-all duration-300">Priority</th>
                      <th className="p-2 sm:p-3 cursor-pointer text-gray-400 hover:text-white transition-all duration-300">Due Date</th>
                      <th className="p-2 sm:p-3 text-gray-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((task, index) => (
                      <tr
                        key={task._id}
                        className="border-b border-gray-700 hover:bg-gray-700/50 transition-all duration-300"
                      >
                        <td className="p-2 sm:p-3 text-center">{index + 1}</td>
                        <td className="p-2 sm:p-3">{task.title}</td>
                        <td className="p-2 sm:p-3">{task.status}</td>
                        <td className={`p-2 sm:p-3 ${getPriorityColor(task.priority)}`}>{task.priority}</td>
                        <td className="p-2 sm:p-3">{formatDate(task.dueDate)}</td>
                        <td className="p-2 sm:p-3 flex gap-3 justify-evenly">
                            <button
                              onClick={() => openUpdateModal(task)}
                              className="text-blue-500 hover:text-blue-600 transition-all duration-300"
                            >
                              <FaEdit />
                            </button>
                            <button
                              onClick={() => openDeleteModal(task)}
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
            </div>

            {/* Search and Filters Section */}
            <div className="w-full lg:w-5/12 bg-gray-800/80 backdrop-blur-md p-4 sm:p-6 rounded-xl shadow-lg border border-gray-700/50">
              <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-200">Filters</h3>
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-2 mb-4 rounded-md bg-gray-700/50 border border-gray-600/50 text-white focus:outline-none focus:border-indigo-500"
              />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full p-2 mb-4 rounded-md bg-gray-700/50 border border-gray-600/50 text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="All">All Statuses</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
              </select>
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="w-full p-2 mb-4 rounded-md bg-gray-700/50 border border-gray-600/50 text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="All">All Priorities</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
              <button
                onClick={() => setShowUpcoming(!showUpcoming)}
                className="w-full p-2 mb-4 rounded-md bg-indigo-500 text-white hover:bg-indigo-600 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <FaCalendarAlt /> {showUpcoming ? 'Show All Tasks' : 'Show Upcoming Tasks'}
              </button>
              <button
                onClick={openModal}
                className="w-full p-2 rounded-md bg-indigo-500 text-white hover:bg-indigo-600 transition-all duration-300"
              >
                + New Task
              </button>
            </div>
          </div>
        </div>

        {/* Modal for Creating New Task */}
        {isModalOpen && <CreateTask closeModal={closeModal} />}

        {/* Modal for Deleting Task */}
        {isDeleteModalOpen && <DeleteModal closeDeleteModal={closeDeleteModal} taskId={taskId} />}

        {/* Modal for Updating Task */}
        {isUpdateModalOpen && (
        <UpdateModal closeUpdateModal={closeUpdateModal} selectedTask={selectedTask}/>
        )}
      </div>
    </>
  );
};

export default Dashboard;