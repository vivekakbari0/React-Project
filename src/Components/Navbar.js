import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUserCircle } from 'react-icons/fa';
import { MdCreateNewFolder } from 'react-icons/md';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/">
            <FaHome size={25} color="white" />
          </Link>
          <div className="ml-10">
            <Link to="/create-post">
              <MdCreateNewFolder size={25} color="white" />
            </Link>
          </div>
        </div>
        <Link to="/Login">
          <FaUserCircle size={25} color="white" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
