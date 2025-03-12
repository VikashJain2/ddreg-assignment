import React from 'react';
import { FaCalendarAlt } from 'react-icons/fa';

const Filters = ({ searchQuery, setSearchQuery, statusFilter, setStatusFilter, priorityFilter, setPriorityFilter, showUpcoming, setShowUpcoming, openModal }) => {
  return (
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
  );
};

export default Filters;