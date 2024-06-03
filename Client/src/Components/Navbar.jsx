import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo/logo.png"
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <img src={logo} alt="Tripify Logo" className="w-auto h-14"/>
            {/* <div className="flex-shrink-0 text-white font-bold text-lg">
              Tripify
            </div> */}
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavLink
                to="/"
                exact="true"
                activeclassname="text-white"
                className="text-gray-100 hover:bg-orange-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300"
              >
                Home
              </NavLink>
              <NavLink
                to="/about"
                activeclassname="text-white"
                className="text-gray-100 hover:bg-orange-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300"
              >
                About
              </NavLink>
              <NavLink
                to="/services"
                activeclassname="text-white"
                className="text-gray-100 hover:bg-orange-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300"
              >
                Services
              </NavLink>
              <NavLink
                to="/contact"
                activeclassname="text-white"
                className="text-gray-100 hover:bg-orange-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300"
              >
                Contact
              </NavLink>
              <NavLink
                to="/login"
                activeclassname="text-white"
                className="bg-pink-500 text-white hover:bg-pink-600 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
              >
                Login
              </NavLink>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-100 hover:text-white focus:outline-none transition duration-300"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden transition duration-300 ease-in-out">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink
              to="/"
              exact="true"
              activeclassname="text-white"
              className="text-gray-100 hover:bg-orange-500 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition duration-300"
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              activeclassname="text-white"
              className="text-gray-100 hover:bg-orange-500 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition duration-300"
            >
              About
            </NavLink>
            <NavLink
              to="/services"
              activeclassname="text-white"
              className="text-gray-100 hover:bg-orange-500 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition duration-300"
            >
              Services
            </NavLink>
            <NavLink
              to="/contact"
              activeclassname="text-white"
              className="text-gray-100 hover:bg-orange-500 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition duration-300"
            >
              Contact
            </NavLink>
            <NavLink
              to="/login"
              activeclassname="text-white"
              className="bg-pink-500 text-white hover:bg-pink-600 block px-3 py-2 rounded-md text-base font-medium transition duration-300"
            >
              Login
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
  