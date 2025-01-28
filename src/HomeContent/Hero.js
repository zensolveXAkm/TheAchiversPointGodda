import React from "react";
import { FaRocket, FaArrowDown } from "react-icons/fa";

const HeroSection = () => {
  return (
    <section
      className="relative text-white py-24 text-center overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: "url('/darkside.png')",
        background-size: "cover";
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10 opacity-80"></div>

      <div className="relative z-20 max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center md:flex-row flex-col md:space-x-12">
          <div className="md:w-1/2 w-full text-left mb-6 md:mb-0">
            <h1 className="text-5xl font-extrabold mb-6 leading-tight tracking-tight font-merriweather-sans">
              Where Passion Meets <span className="text-indigo-400">Education</span>
            </h1>
            <p className="text-xl mb-8 font-nunito-sans">
              <FaRocket className="inline-block mr-2" /> Building a community of lifelong learners.
            </p>
          </div>

          <div className="hidden md:block w-px bg-white mx-8"></div>

          <div className="md:w-1/2 w-full text-center">
            <div className="mb-8">
              <img
                src="/logo.jpeg" // Path to your logo
                alt="THE ACHIEVERS' POINT"
                className="mx-auto mb-4 w-32 h-32 rounded-full object-cover"
              />
              <h2 className="text-3xl font-semibold text-indigo-400 font-outfit">
                THE ACHIEVERS' POINT
              </h2>
            </div>
          </div>
        </div>

        <div className="mt-16 animate-bounce text-center">
          <FaArrowDown className="text-4xl text-white" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
