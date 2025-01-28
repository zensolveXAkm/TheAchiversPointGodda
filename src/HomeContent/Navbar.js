import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaHome, FaBook, FaUserAlt, FaInfoCircle, FaPhoneAlt } from 'react-icons/fa';

const Navbar2 = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const toggleNavbar = () => setIsExpanded((prev) => !prev);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) setIsExpanded(false);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = [
    { name: 'Home', icon: <FaHome />, path: '/home' },
    { name: 'Admission', icon: <FaBook />, path: '/admission' },
    { name: 'Login', icon: <FaUserAlt />, path: '/login' },
    { name: 'About', icon: <FaInfoCircle />, path: '/about' },
    { name: 'Contact', icon: <FaPhoneAlt />, path: '/contact' },
  ];

  return (
    <nav className="navbar fixed top-5 left-1/2 transform -translate-x-1/2 w-11/12 md:w-3/4 bg-indigo-600 text-white rounded-lg shadow-lg z-50 px-4 py-2 flex items-center justify-between">
      {/* Logo */}
      <div className="logo-container flex items-center">
        <FaBook className="mr-2 text-2xl" />
        <h1 className="text-xl font-bold whitespace-nowrap">THE ACHIEVERS' POINT </h1>
      </div>

      {/* Menu Icon */}
      <div className="menu-icon cursor-pointer md:hidden" onClick={toggleNavbar}>
        {isExpanded ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
      </div>

      {/* Navbar Links */}
      <div
        className={`${
          isExpanded ? 'block' : 'hidden'
        } md:flex md:flex-row items-center md:space-x-4 absolute md:static top-full left-0 w-full bg-indigo-500 md:bg-transparent rounded-b-lg md:rounded-none py-2 md:py-0 shadow-lg md:shadow-none`}
      >
        <ul className="flex flex-col md:flex-row md:space-x-6 font-medium md:justify-end w-full">
          {menuItems.map((item) => (
            <li key={item.name} className="flex items-center">
              <Link
                to={item.path}
                className="flex items-center py-1 px-3 text-white hover:text-yellow-300"
                onClick={() => setIsExpanded(false)}
              >
                {item.icon} <span className="ml-2">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar2;
