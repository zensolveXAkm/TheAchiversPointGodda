import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaQuestionCircle,
  FaBook,
  FaInfoCircle,
  FaPhone,
  FaRegStickyNote,
  FaSignOutAlt,
  FaHistory,
} from "react-icons/fa";

const Sidebar = ({
  userData,
  animateSidebar,
  closeSidebar,
  handleLogout,
}) => {
  const location = useLocation();

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex justify-start transition-opacity duration-300 ease-in-out ${
        animateSidebar ? "animate-fadeIn" : "animate-fadeOut"
      }`}
      style={{ zIndex: "49" }} // Set a high z-index to avoid overlap
    >
      <div
        className={`sidebar bg-gradient-to-br from-green-100 to-blue-50 w-64 p-5 shadow-2xl transform transition-transform duration-300 ease-in-out ${
          animateSidebar ? "animate-slideIn" : "animate-slideOut"
        }`}
        style={{
          height: "calc(100vh - 60px)", // Full height minus navbar height
          marginTop: "50px", // Start below the navbar
          position: "fixed", // Fix the sidebar in place
          top: 0, // Align to top of the screen
          zIndex: "9999", // Ensure the sidebar is above other components
        }}
      >
        {/* Profile Section */}
        <div className="flex items-center gap-3 mb-4 p-4 bg-green-200 rounded-lg">
          <img
            src={userData?.profilePhoto || "/default-profile.png"}
            alt="Profile"
            className="w-12 h-12 rounded-full"
          />
          <div>
            <p className="text-sm font-semibold">
              {userData?.name || "User Name"}
            </p>
            <p className="text-xs text-gray-600">
              {userData?.email || "Email not available"}
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-3">
          {/* New Past Class Option */}
          <Link
            to="/clist"
            className={`block py-3 px-4 text-lg items-center gap-3 ${
              location.pathname === "/clist"
                ? "bg-green-200 rounded-lg shadow-md"
                : "hover:bg-green-50 rounded-lg"
            }`}
            onClick={closeSidebar}
          >
            <FaHistory className="text-xl" />
            Past Class
          </Link>
          <Link
            to="/locate-us"
            className={`block py-3 px-4 text-lg items-center gap-3 ${
              location.pathname === "/locate-us"
                ? "bg-green-200 rounded-lg shadow-md"
                : "hover:bg-green-50 rounded-lg"
            }`}
            onClick={closeSidebar}
          >
            <FaMapMarkerAlt className="text-xl" />
            Locate Us
          </Link>
          <Link
            to="/terms"
            className={`block py-3 px-4 text-lg items-center gap-3 ${
              location.pathname === "/terms"
                ? "bg-green-200 rounded-lg shadow-md"
                : "hover:bg-green-50 rounded-lg"
            }`}
            onClick={closeSidebar}
          >
            <FaQuestionCircle className="text-xl" />
            FAQ
          </Link>
          <Link
            to="/terms"
            className={`block py-3 px-4 text-lg items-center gap-3 ${
              location.pathname === "/terms"
                ? "bg-green-200 rounded-lg shadow-md"
                : "hover:bg-green-50 rounded-lg"
            }`}
            onClick={closeSidebar}
          >
            <FaBook className="text-xl" />
            Terms & Conditions
          </Link>
          <Link
            to="/about"
            className={`py-3 px-4 text-lg flex items-center gap-3 ${
              location.pathname === "/about"
                ? "bg-green-200 rounded-lg shadow-md"
                : "hover:bg-green-50 rounded-lg"
            }`}
            onClick={closeSidebar}
          >
            <FaInfoCircle className="text-xl" />
            About Us
          </Link>
          <Link
            to="/contact"
            className={`py-3 px-4 text-lg flex items-center gap-3 ${
              location.pathname === "/contact"
                ? "bg-green-200 rounded-lg shadow-md"
                : "hover:bg-green-50 rounded-lg"
            }`}
            onClick={closeSidebar}
          >
            <FaPhone className="text-xl" />
            Contact
          </Link>
          <Link
            to="/contact"
            className={`block py-3 px-4 text-lg items-center gap-3 ${
              location.pathname === "/contact"
                ? "bg-green-200 rounded-lg shadow-md"
                : "hover:bg-green-50 rounded-lg"
            }`}
            onClick={closeSidebar}
          >
            <FaRegStickyNote className="text-xl" />
            Report Issue
          </Link>
          <button
            onClick={handleLogout}
            className="block w-full text-left py-3 px-4 text-lg text-red-600 items-center gap-3 hover:bg-red-100 rounded-lg"
          >
            <FaSignOutAlt className="text-xl" />
            Logout
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
