import React from "react";
import { FaPhoneAlt, FaMapMarkedAlt, FaRegClock } from "react-icons/fa"; // React Icons

const LocateUs = () => {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-10">Locate Us - The Achiever Point</h1>

      {/* Updated Google Map Embed */}
      <div className="relative mb-10">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3621.1208460431303!2d87.21577669999999!3d24.8255406!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f0f5b3a88f715f%3A0x31f93b9c65e34bfa!2sThe%20Achiever%20Point!5e0!3m2!1sen!2sin!4v1737908244095!5m2!1sen!2sin"
          width="600"
          height="450"
          style={{ border: "0" }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-[500px] rounded-lg shadow-lg"
        ></iframe>
      </div>

      {/* Details Section */}
      <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">The Achiever Point</h2>
        <p className="text-gray-600 text-lg">5.0 / 5 based on 5.024 reviews</p>

        <div className="flex items-center space-x-4 text-gray-700">
          <FaMapMarkedAlt className="text-xl text-blue-500" />
          <p className="text-lg">
            <strong>Address:</strong> Gandhi Maidan, Babu Para Road, Godda, Jharkhand 814133
          </p>
        </div>

        <div className="flex items-center space-x-4 text-gray-700">
          <FaRegClock className="text-xl text-blue-500" />
          <p className="text-lg">
            <strong>Hours:</strong> Closed ⋅ Opens 6 am Mon <br />
            Republic Day might affect these hours
          </p>
        </div>

        <div className="flex items-center space-x-4 text-gray-700">
          <FaPhoneAlt className="text-xl text-blue-500" />
          <p className="text-lg">
            <strong>Phone:</strong>{" "}
            <a href="tel:+917061823757" className="text-blue-500 hover:underline">
              070618 23757
            </a>
          </p>
        </div>

        <div className="text-lg text-gray-700">
          <strong>Exams Offered:</strong> CBSE Board · IBPS RBB
        </div>

        {/* Buttons for saving or sharing */}
        <div className="mt-6 space-x-4">
          <button className="bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-600 transition-all duration-300">
            Save
          </button>
          <button className="bg-green-500 text-white py-2 px-6 rounded-full hover:bg-green-600 transition-all duration-300">
            Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocateUs;
