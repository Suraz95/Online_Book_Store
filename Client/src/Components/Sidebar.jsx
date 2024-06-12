import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:8000/logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      localStorage.removeItem("token");
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
      // Optional: Display an error message to the user
    }
  };

  return (
    <div className="h-screen bg-gray-800 text-white py-8 px-4 fixed md:w-64 w-48">
      <nav>
        <ul>
          <li className="mb-4">
            <h1 className="text-3xl font-bold mb-2 ml-5">Admin</h1>
            <NavLink
              to="/dashboard"
              className="block py-2 px-4 rounded hover:bg-gray-700 text-lg font-semibold ml-5 mb-3"
              activeClassName="bg-gray-700"
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/dashboard/book"
              className="block py-2 px-4 rounded hover:bg-gray-700 text-lg font-semibold ml-5 mb-3"
              activeClassName="bg-gray-700"
            >
              Add a Book
            </NavLink>
          </li>
          <li className="mb-4">
            <NavLink
              to="/customerdashboard"
              className="block py-2 px-4 rounded hover:bg-gray-700 text-lg font-semibold ml-5 mb-3"
              activeClassName="bg-gray-700"
            >
              Customers Data
            </NavLink>
            <NavLink
              to="/bookdata"
              className="block py-2 px-4 rounded hover:bg-gray-700 text-lg font-semibold ml-5 mb-3"
              activeClassName="bg-gray-700"
            >
              Books Data
            </NavLink>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="block py-2 px-4 rounded hover:bg-gray-700 text-lg font-semibold ml-5"
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
