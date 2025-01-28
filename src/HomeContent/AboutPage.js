import React from "react";
import { motion } from "framer-motion";
import {
  FaGraduationCap,
  FaAward,
  FaChalkboardTeacher,
} from "react-icons/fa";
import profilePic from "./profilePic.png"; // Replace with your profile picture
import logo from "./logo.jpeg"; // Replace with your logo
import Navbar2 from "./Navbar";

const AboutPage = () => {
  return (
      <section className="bg-gray-50 text-gray-800 py-16">
        <Navbar2/>
      {/* Header Section */}
      <div className="container mx-auto px-6 text-center mb-16">
        <motion.img
          src={logo}
          alt="The Achievers' Point Logo"
          className="w-40 h-40 mx-auto mb-6 rounded-full shadow-lg border-4 border-indigo-600"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        />
        <motion.h1
          className="text-5xl font-extrabold text-indigo-600 mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Welcome to THE ACHIEVERS' POINT
        </motion.h1>
        <p className="text-lg text-gray-700 italic max-w-3xl mx-auto">
          A coaching center dedicated to shaping the future of students with 9+
          years of teaching experience, unparalleled mentorship, and innovative
          learning techniques.
        </p>
      </div>

      {/* About Section */}
      <div className="container mx-auto px-6 space-y-16">
        {/* Section 1: Personal Introduction */}
        <motion.div
          className="flex flex-col md:flex-row items-center gap-12"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Image */}
          <div className="md:w-1/2">
            <img
              src={profilePic}
              alt="Abhishek Kumar Mishra"
              className="w-full h-auto rounded-full shadow-lg border-4 border-indigo-500"
            />
          </div>
          {/* Text */}
          <div className="md:w-1/2">
            <h2 className="text-4xl font-bold text-indigo-600 mb-4">
              Meet Abhishek Kumar Mishra
            </h2>
            <p className="text-lg text-gray-700">
              I am a dedicated educator with over 9 years of experience, a
              master’s degree, and ADCA certification in computer applications.
              Selected in Byju’s interview, my mission is to provide students
              with quality education tailored to competitive exams and holistic
              personal development.
            </p>
            <p className="mt-4 text-gray-700">
              Our coaching center, <strong>The Achievers' Point</strong>, has
              been instrumental in the academic success of countless students.
              We emphasize both conceptual clarity and practical application,
              ensuring that every student is fully prepared for their academic
              and professional journeys.
            </p>
          </div>
        </motion.div>

        {/* Section 2: Educational Background */}
        <motion.div
          className="flex flex-col md:flex-row-reverse items-center gap-12"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Image */}
          <div className="md:w-1/2">
            <img
              src={logo}
              alt="The Achievers' Point Logo"
              className="w-full h-auto rounded-full shadow-lg border-4 border-indigo-500"
            />
          </div>
          {/* Text */}
          <div className="md:w-1/2">
            <h2 className="text-4xl font-bold text-indigo-600 mb-4">
              Our Achievements
            </h2>
            <ul className="list-disc ml-6 space-y-2 text-gray-700">
              <li>9+ years of teaching experience in competitive exams.</li>
              <li>Master’s degree and ADCA in computer applications.</li>
              <li>Selected in Byju’s prestigious interview process.</li>
              <li>
                Successful mentorship for board exams, competitive exams, and
                personal growth.
              </li>
              <li>
                Consistently delivering a 90%+ success rate among our students.
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Section 3: Key Highlights */}
        <motion.div
          className="bg-white rounded-lg shadow-lg p-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-indigo-600 mb-6 text-center">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <FaChalkboardTeacher className="text-indigo-500 text-6xl mb-4" />
              <h3 className="text-2xl font-semibold">Expert Faculty</h3>
              <p className="text-gray-700 text-center">
                Learn from experienced educators with a passion for teaching.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <FaAward className="text-indigo-500 text-6xl mb-4" />
              <h3 className="text-2xl font-semibold">Proven Success</h3>
              <p className="text-gray-700 text-center">
                Join the ranks of students who have achieved their goals with
                us.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <FaGraduationCap className="text-indigo-500 text-6xl mb-4" />
              <h3 className="text-2xl font-semibold">Comprehensive Programs</h3>
              <p className="text-gray-700 text-center">
                Tailored courses to meet the unique needs of each student.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Section 4: Google Map */}
        <div>
          <h2 className="text-4xl font-bold text-indigo-600 mb-4 text-center">
            Visit Us
          </h2>
          <div className="overflow-hidden rounded-lg shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4399.0958556654!2d87.21320177600312!3d24.825545446652605!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f0f5b3a88f715f%3A0x31f93b9c65e34bfa!2sThe%20Achiever%20Point!5e1!3m2!1sen!2sin!4v1737373696617!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
