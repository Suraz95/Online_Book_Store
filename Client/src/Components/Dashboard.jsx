import React from 'react';
import Sidebar from './Sidebar';

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-8 bg-gray-100 min-h-screen flex items-center justify-center">
        <h1 className="text-4xl font-bold text-gray-800">Welcome Admin</h1>
      </div>
    </div>
  );
};

export default Dashboard;
