import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css"

import Home from "./Components/Home";

import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import Signup from "./Components/Signup";
import Book from "./Components/Book/Book";
import Wishlist from "./Components/Wishlist";
import CustomerDashboard from "./Components/CustomerDashboard";
import Bookdata from "./Components/Bookdata";
import Orders from "./Components/MyOrders"
const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/book" element={<Book />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/customerdashboard" element={<CustomerDashboard />} />
            <Route path="/bookdata" element={<Bookdata />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </div>
      
      </div>
    </Router>
  );
};

export default App;
