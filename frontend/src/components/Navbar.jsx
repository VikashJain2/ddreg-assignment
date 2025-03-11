import React, { useState } from 'react';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { axiosInstance } from '../utils/axiosInstance';
import { summaryApi } from '../utils/summaryAPI';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate()
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async() => {
    try{
        const response = await axiosInstance({
            method: summaryApi.logout.method,
            url: summaryApi.logout.path
        })

        if(response.data.success){
            toast.success(response.data.message)
            navigate("/")
        }
    }catch(error){
        if(error.response){
            toast.error(error.response.data.message)
        }
    }
    // Implement logout functionality here
  };

  return (
    <nav className="bg-gray-900/80 backdrop-blur-md text-white p-4 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Navbar Left Side */}
        <div className="text-2xl font-bold">
          <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            My Dashboard
          </h1>
        </div>

        {/* Navbar Right Side - User Icon */}
        <div className="relative">
          {/* User Icon Button */}
          <button
            onClick={toggleMenu}
            className="flex items-center text-3xl hover:text-neutral-400 transition-all duration-300 p-2 rounded-full hover:bg-gray-700/50"
          >
            <FaUserCircle />
          </button>

          {/* Dropdown Menu - Logout Button */}
          {isMenuOpen && (
            <div className="absolute right-0 mt-3 bg-gray-800/90 backdrop-blur-md p-2 rounded-lg shadow-xl w-48 transform scale-95 transition-all duration-300 ease-out">
              <button
                onClick={handleLogout}
                className="flex items-center text-sm text-white hover:text-red-500 w-full py-2 px-4 rounded-md transition-all duration-300 ease-in-out hover:bg-gray-700/50"
              >
                <FaSignOutAlt className="mr-3 text-lg" /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;