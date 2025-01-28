import React from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaTelegramPlane,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-200 py-6">
      <div className="container mx-auto px-6">
        {/* Footer Content */}
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Left Section - Coaching Details */}
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h3 className="text-xl font-bold text-white mb-2">
              THE ACHIEVERS' POINT
            </h3>
            <p className="text-sm">
              Babu para, Sadar Hospital Road, near Board Middle School
            </p>
            <p className="text-sm">kumarmishraabhi1999@gmail.com</p>
            <p className="text-sm">Phone: 7061823757</p>
          </div>

          {/* Vertical Divider */}
          <div className="hidden md:block w-px bg-gray-700 h-16"></div>

          {/* Right Section - Social Media Links */}
          <div className="text-center md:text-right space-y-2">
            <h4 className="text-lg font-bold text-white">Follow Us</h4>
            <div className="flex justify-center md:justify-end space-x-4">
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
        </div>

        {/* Footer Bottom */}
        <div className="mt-6 border-t border-gray-700 pt-4 text-center text-sm">
          <p className="mb-2">&copy; 2025 THE ACHIEVERS' POINT. All Rights Reserved.</p>
          <p>
            <a href="#" className="hover:underline">
              Contact Us
            </a>{" "}
            |{" "}
            <a href="#" className="hover:underline">
              Terms of Service
            </a>{" "}
            |{" "}
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
