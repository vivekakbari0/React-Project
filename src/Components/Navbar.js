import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

const Navbar = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Function to handle logout
  const handleLogout = () => {};

  // Function to toggle logout modal
  const toggleLogoutModal = () => {
    setShowLogoutModal(!showLogoutModal);
  };

  return (
    <nav className="bg-gray-800 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Link to="/">
          <FaHome size={25} color="white" />
        </Link>
        <div className="flex items-center">
          <div
            className="text-gray-300 mr-6 cursor-pointer"
            onClick={toggleLogoutModal}
          >
            Login
          </div>
        </div>
      </div>
      {showLogoutModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white rounded-md overflow-hidden shadow-xl">
            <div className="px-4 py-3">
              <p className="text-gray-900 font-bold">
                Are you sure you want to log out?
              </p>
              <div className="mt-4 flex justify-center">
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleLogout}
                >
                  Logout
                </button>
                <button
                  className="bg-gray-500 hover:bg-gray-700 ml-2 text-white font-bold py-2 px-4 rounded"
                  onClick={toggleLogoutModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
