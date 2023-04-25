import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUserCircle } from 'react-icons/fa';
import { MdCreateNewFolder } from 'react-icons/md';

const Navbar = () => {
  // Check user role from localStorage
  const logindata = JSON.parse(localStorage.getItem('data'));
  const logindataUser = logindata?.role;

  return (
    <nav className="bg-gray-800 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/">
            <FaHome size={25} color="white" />
          </Link>
          {/* Show create post button for admin users */}
          <div className="ml-10">
            {logindataUser === 'admin' && (
              <Link to="/create-post">
                <MdCreateNewFolder size={25} color="white" />
              </Link>
            )}
          </div>
        </div>
        <p className="text-white mr-4 capitalize font-serif tracking-wider text-lg">
          Hello {logindataUser}
        </p>
        <Link to="/Login">
          <FaUserCircle size={25} color="white" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
