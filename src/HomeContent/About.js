import React from "react";
import { motion } from "framer-motion";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaMapMarkerAlt,
  FaTelegramPlane,
} from "react-icons/fa";
import profilePic from "./profilePic.png"; // Replace with the path to your profile photo
import logo from "./logo.jpeg"; // Replace with the path to your logo

const AboutSection = () => {
  return (
    <section className="py-16 bg-white text-gray-800">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={logo}
            alt="Logo"
            className="w-24 h-24 mx-auto rounded-full mb-4"
          />
          <h2 className="text-4xl font-bold text-indigo-600">About Us</h2>
          <p className="text-lg italic mt-2">
            We are <span className="font-bold text-indigo-500">THE ACHIEVERS' POINT</span>, 
            dedicated for providing the best learning experience.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row items-center">
          {/* Left Section - Profile */}
          <motion.div
            className="flex flex-col items-center text-center md:w-1/3 mb-8 md:mb-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src={profilePic}
              alt="Profile"
              className="w-40 h-40 rounded-full border-4 border-indigo-500 shadow-md"
            />
            <h3 className="text-2xl font-bold text-indigo-600 mt-4">
              Abhishek Kumar Mishra
            </h3>
            <p className="text-sm mt-2 italic">
              Dedicated for student success through innovative teaching and mentorship.
            </p>
          </motion.div>

          {/* Vertical Divider */}
          <div className="hidden md:block w-1 bg-gray-300 h-64 mx-6"></div>

          {/* Right Section - Details */}
          <motion.div
            className="md:w-2/3 space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Contact Information */}
            <div>
              <h3 className="text-2xl font-bold text-indigo-600 mb-4">
                Contact Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <FaMapMarkerAlt className="text-indigo-500 text-xl mr-4" />
                  <p>Babu para, Sadar Hospital Road, near Board Middle School</p>
                </div>
                <div className="flex items-center">
                  <FaEnvelope className="text-indigo-500 text-xl mr-4" />
                  <a
                    href="mailto:kumarmishraabhi1999@gmail.com"
                    className="text-indigo-600 underline"
                  >
                    kumarmishraabhi1999@gmail.com
                  </a>
                </div>
                <div className="flex items-center">
                  <FaPhoneAlt className="text-indigo-500 text-xl mr-4" />
                  <a href="tel:7061823757" className="text-indigo-600 underline">
                    7061823757
                  </a>
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div>
              <h3 className="text-2xl font-bold text-indigo-600 mb-4">
                Connect with Us
              </h3>
              <div className="flex space-x-6">
                <a
                  href="https://youtu.be/hcvTljblvc8?si=en9emPDe0_nLPIRr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-500 text-2xl hover:scale-110 transition-transform"
                >
                  <FaYoutube />
                </a>
                <a
                  href="https://www.instagram.com/invites/contact/?igsh=x173odvp3g48&utm_content=3ak7rbg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-500 text-2xl hover:scale-110 transition-transform"
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://www.facebook.com/abhishek.k.mishra.186"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-2xl hover:scale-110 transition-transform"
                >
                  <FaFacebook />
                </a>
                {/* Add Telegram Button */}
                <a
                  href="https://t.me/Theachieversgodda"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 text-2xl hover:scale-110 transition-transform"
                >
                  <FaTelegramPlane />
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tagline */}
        <motion.div
          className="text-center mt-12 text-xl font-semibold italic"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          "Our Hardwork + Your Hardwork = Success"
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
