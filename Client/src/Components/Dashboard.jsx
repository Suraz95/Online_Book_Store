import React from "react";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar";
import { HomeIcon, CogIcon, UserIcon, BellIcon, ClipboardIcon, CheckCircleIcon } from "@heroicons/react/24/outline";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1 ml-64 p-8 min-h-screen flex flex-col items-center justify-center"
      >
        <motion.h1
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          style={{ color: "#bd9f67", fontFamily: "Dancing Script, cursive" }} 
          className="text-8xl font-extrabold text-gray-900 mb-8"
        >
          Welcome Admin
        </motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-4xl mb-16">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white p-6 rounded-lg shadow-lg flex items-center space-x-4 transition-transform duration-200 hover:shadow-2xl"
          >
            <HomeIcon className="h-12 w-12  text-yellow-600" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
              <p className="text-gray-600">Overview of your activities</p>
            </div>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white p-6 rounded-lg shadow-lg flex items-center space-x-4 transition-transform duration-200 hover:shadow-2xl"
          >
            <UserIcon className="h-12 w-12 text-yellow-600" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Profile</h2>
              <p className="text-gray-600">Manage your profile settings</p>
            </div>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white p-6 rounded-lg shadow-lg flex items-center space-x-4 transition-transform duration-200 hover:shadow-2xl"
          >
            <CogIcon className="h-12 w-12  text-yellow-600" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
              <p className="text-gray-600">Adjust your preferences</p>
            </div>
          </motion.div>

          {/* Additional Divs for Admin Dashboard */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white p-6 rounded-lg shadow-lg flex items-center space-x-4 transition-transform duration-200 hover:shadow-2xl"
          >
            <BellIcon className="h-12 w-12 text-yellow-600" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Notifications</h2>
              <p className="text-gray-600">Manage notification settings</p>
            </div>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white p-6 rounded-lg shadow-lg flex items-center space-x-4 transition-transform duration-200 hover:shadow-2xl"
          >
            <ClipboardIcon className="h-12 w-12  text-yellow-600" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Clipboard</h2>
              <p className="text-gray-600">Manage copied items</p>
            </div>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white p-6 rounded-lg shadow-lg flex items-center space-x-4 transition-transform duration-200 hover:shadow-2xl"
          >
            <CheckCircleIcon className="h-12 w-12  text-yellow-600" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Tasks</h2>
              <p className="text-gray-600">View completed tasks</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
