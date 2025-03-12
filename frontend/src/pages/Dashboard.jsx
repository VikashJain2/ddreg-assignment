import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { summaryApi } from '../utils/summaryAPI';
import { setAllTasks } from '../store/taskSlice';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';
import CreateTask from '../components/CreateTask';
import DeleteModal from '../components/DeleteModal';
import UpdateModal from '../components/UpdateModal';
import Charts from '../components/Charts';
import TaskTable from '../components/TaskTable';
import Filters from '../components/Filters';
import { axiosInstance } from '../utils/axiosInstance';

const Dashboard = () => {
  const dispatch = useDispatch();
  const [taskId, setTaskId] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [priorityData, setPriorityData] = useState({ highPriority: 0, mediumPriority: 0, lowPriority: 0});
  const [dayWiseCompletionData, setDayWiseCompletionData] = useState([]);


  // Fetch Function to fetch all tasks
  const fetchAllTasks = async () => {
    try {
      const response = await axiosInstance({
        // method and url comming from summary api
        method: summaryApi.getTasks.method,
        url: summaryApi.getTasks.path,
      });

      if (response.data.success) {
        // this will dispatch a store function to set all task in store
        dispatch(setAllTasks(response.data.task));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      // Error handling
      if (error.response) {
        toast.error(error.response.data.message);
      }

    } finally {
      // this will set the loading to false wheather the request is solved or not.
      setIsLoading(false);
    }
  };

  // function to fetch Dashboard Analytics 
  const fetchAnalytics = async () => {
    try {
      const response = await axiosInstance({
        method: summaryApi.analytics.method,
        url: summaryApi.analytics.path,
      });

      if (response.data.success) {
        // Update the priority state and daywiseComletionData state with comming data
        setPriorityData(response.data.data.priorityData);
        setDayWiseCompletionData(response.data.data.dayWiseCompletionData);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    }
  };

  useEffect(() => {
    fetchAllTasks();
    fetchAnalytics();
  }, []);

  const data = useSelector((state) => state.tasks || []);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  // States
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [showUpcoming, setShowUpcoming] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage] = useState(4);

  // To Perform The filteration on data
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
        return dueDate > today;
      }
      return true;
    });

    // Calculation of pagination

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredData.slice(indexOfFirstTask, indexOfLastTask);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openDeleteModal = (task) => {
    setTaskId(task._id);
    setIsDeleteModalOpen(true);
  };
  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  const openUpdateModal = (task) => {
    setSelectedTask(task);
    setIsUpdateModalOpen(true);
  };
  const closeUpdateModal = () => setIsUpdateModalOpen(false);

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

          <Charts priorityData={priorityData} dayWiseCompletionData={dayWiseCompletionData} formatDate={formatDate} />

          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
            <TaskTable
              currentTasks={currentTasks}
              formatDate={formatDate}
              getPriorityColor={getPriorityColor}
              openUpdateModal={openUpdateModal}
              openDeleteModal={openDeleteModal}
              tasksPerPage={tasksPerPage}
              totalTasks={filteredData.length}
              paginate={paginate}
              currentPage={currentPage}
            />

            <Filters
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              priorityFilter={priorityFilter}
              setPriorityFilter={setPriorityFilter}
              showUpcoming={showUpcoming}
              setShowUpcoming={setShowUpcoming}
              openModal={openModal}
            />
          </div>
        </div>

        {isModalOpen && <CreateTask closeModal={closeModal} fetchAnalytics={fetchAnalytics}/>}
        {isDeleteModalOpen && <DeleteModal closeDeleteModal={closeDeleteModal} taskId={taskId} fetchAnalytics={fetchAnalytics}/>}
        {isUpdateModalOpen && (
          <UpdateModal closeUpdateModal={closeUpdateModal} selectedTask={selectedTask} fetchAnalytics={fetchAnalytics}/>
        )}
      </div>
    </>
  );
};

export default Dashboard;