import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaBookOpen,
  FaUserFriends,
  FaChalkboardTeacher,
  FaRegStickyNote,
} from "react-icons/fa";

const Navbar = () => {
  const location = useLocation();

  const getIconStyle = (path) =>
    location.pathname === path
      ? "text-green-700 bg-green-100 shadow-md"
      : "text-blue-500 hover:bg-blue-50";

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-gradient-to-r from-green-200 to-blue-200 flex justify-around py-2 shadow-md z-50">
      {/* Home */}
      <Link to="/" className="flex flex-col items-center">
        <div className={`p-2 rounded-full text-2xl ${getIconStyle("/dashboard")}`}>
          <FaHome />
        </div>
        {location.pathname === "/" && (
          <span className="text-xs text-green-700 font-semibold">Home</span>
        )}
      </Link>

      {/* Live Classes */}
      <Link to="/course" className="flex flex-col items-center">
        <div
          className={`p-2 rounded-full text-2xl ${getIconStyle("/course")}`}
        >
          <FaChalkboardTeacher />
        </div>
        {location.pathname === "/course" && (
          <span className="text-xs text-green-700 font-semibold">
            Courses
          </span>
        )}
      </Link>

      {/* Community */}
      <Link to="/community" className="flex flex-col items-center">
        <div
          className={`p-2 rounded-full text-2xl ${getIconStyle("/community")}`}
        >
          <FaUserFriends />
        </div>
        {location.pathname === "/community" && (
          <span className="text-xs text-green-700 font-semibold">
            Community
          </span>
        )}
      </Link>

      {/* Homework */}
      <Link to="/homework" className="flex flex-col items-center">
        <div
          className={`p-2 rounded-full text-2xl ${getIconStyle("/homework")}`}
        >
          <FaBookOpen />
        </div>
        {location.pathname === "/homework" && (
          <span className="text-xs text-green-700 font-semibold">
            Homework
          </span>
        )}
      </Link>

      {/* Notes */}
      <Link to="/notes" className="flex flex-col items-center">
        <div
          className={`p-2 rounded-full text-2xl ${getIconStyle("/notes")}`}
        >
          <FaRegStickyNote />
        </div>
        {location.pathname === "/notes" && (
          <span className="text-xs text-green-700 font-semibold">Notes</span>
        )}
      </Link>
    </nav>
  );
};

export default Navbar;
