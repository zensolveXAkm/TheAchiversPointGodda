import React from "react";
import { FaLightbulb, FaRocket, FaArrowDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <section className="relative text-white py-24 text-center overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute inset-0 object-cover w-full h-full z-0"
        autoPlay
        loop
        muted
      >
        <source src="/darkside.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay for Contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10 opacity-80"></div>

      {/* Hero Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6">
        {/* Flex Container for Left and Right Aligning */}
        <div className="flex justify-between items-center md:flex-row flex-col md:space-x-12">
          {/* Left Section: Tagline */}
          <div className="md:w-1/2 w-full text-left mb-6 md:mb-0">
            <h1 className="text-5xl font-extrabold mb-6 leading-tight tracking-tight font-merriweather-sans">
              Where Passion Meets <span className="text-indigo-400">Education</span>
            </h1>
            <p className="text-xl mb-8 font-nunito-sans">
              <FaRocket className="inline-block mr-2" /> Building a community of lifelong learners.
            </p>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button
                onClick={() => handleNavigation("/login")}
                className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 rounded-lg text-white font-semibold shadow-lg transition duration-300"
              >
                Get Started
              </button>
              <button
                onClick={() => handleNavigation("/admission")}
                className="px-6 py-3 bg-green-500 hover:bg-green-600 rounded-lg text-white font-semibold shadow-lg transition duration-300"
              >
                Get Admission
              </button>
            </div>
          </div>

          {/* Vertical Line Divider (For Desktop Only) */}
          <div className="hidden md:block w-px bg-white mx-8"></div>

          {/* Right Section: Logo and Coaching Name */}
          <div className="md:w-1/2 w-full text-center">
            <div className="mb-8">
              <img
                src="/logo.jpeg" // Path to your logo
                alt="THE ACHIEVERS' POINT"
                className="mx-auto mb-4 w-32 h-32 rounded-full object-cover"
              />
              <h2 className="text-3xl font-semibold text-indigo-400 font-outfit">THE ACHIEVERS' POINT</h2>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-16 animate-bounce text-center">
          <FaArrowDown className="text-4xl text-white" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
