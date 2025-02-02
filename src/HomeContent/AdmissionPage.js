import React, { useState } from "react";
import { db } from "../firebase"; // Import Firestore setup
import { collection, addDoc } from "firebase/firestore";
import axios from "axios"; // Use axios for HTTP requests
import Navbar2 from "./Navbar";
import { FaCloudUploadAlt, FaPhone, FaEnvelope, FaUser, FaHome, FaSchool, FaUserTie } from "react-icons/fa";
import Footer from "./Footer";

const AdmissionPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    class: "",
    address: "",
    fatherName: "",
    motherName: "",
  });

  const [profilePhoto, setProfilePhoto] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.name === "profilePhoto") {
      setProfilePhoto(e.target.files[0]);
    }
  };

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "tap-edu");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dkzczonkz/upload",
        formData
      );
      return response.data.secure_url;
    } catch (error) {
      alert("Error uploading file: " + error.message);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    const profilePhotoUrl = await uploadToCloudinary(profilePhoto);

    if (profilePhotoUrl) {
      const fullData = {
        ...formData,
        profilePhoto: profilePhotoUrl,
      };

      try {
        await addDoc(collection(db, "admissions"), fullData);
        alert("Admission form submitted successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          class: "",
          address: "",
          fatherName: "",
          motherName: "",
        });
        setProfilePhoto(null);
      } catch (error) {
        alert("Error submitting form: " + error.message);
      }
    } else {
      alert("File upload failed. Please try again.");
    }
    setUploading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 via-blue-300 to-blue-400 flex flex-col items-center">
      <Navbar2 />
      <div className="text-center p-6">
        <br />
        <br />
        <img
          src="/logo.jpeg"
          alt="Coaching Logo"
          className="mx-auto w-24 h-24 rounded-full mb-4"
        />
        <h1 className="text-3xl font-bold text-gray-800">
          THE ACHIEVERS' POINT
        </h1>
        <p className="text-lg font-medium text-gray-700">
          Dedicated to providing the best learning experience.
        </p>
        <p className="text-sm text-gray-600 italic">
          "Our Hardwork + Your Hardwork = Success"
        </p>
        <div className="mt-4 text-gray-700">
          <p>
            <FaUserTie className="inline text-blue-600" /> Abhishek Kumar Mishra
          </p>
          <p>
            <FaEnvelope className="inline text-blue-600" /> kumarmishraabhi1999@gmail.com
          </p>
          <p>
            <FaPhone className="inline text-blue-600" /> 7061823757
          </p>
          <p>
            <FaHome className="inline text-blue-600" /> Babu Para, Sadar Hospital Road,
            near Board Middle School
          </p>
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">Admission Form</h2>
        <p className="text-center text-sm text-gray-600">
          Fill in the details carefully to ensure smooth processing.
        </p>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-600">Full Name</label>
            <div className="flex items-center gap-2">
              <FaUser className="text-blue-500" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Full Name"
                className="flex-1 border px-4 py-2 rounded-lg"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-600">Email Address</label>
            <div className="flex items-center gap-2">
              <FaEnvelope className="text-blue-500" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Email Address"
                className="flex-1 border px-4 py-2 rounded-lg"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-600">Phone Number</label>
            <div className="flex items-center gap-2">
              <FaPhone className="text-blue-500" />
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="Phone Number"
                className="flex-1 border px-4 py-2 rounded-lg"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-600">Class Enrolling For</label>
            <div className="flex items-center gap-2">
              <FaSchool className="text-blue-500" />
              <select
                name="class"
                value={formData.class}
                onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                className="flex-1 border px-4 py-2 rounded-lg"
                required
              >
                <option value="" disabled>
                  Select Class
                </option>            
                <option value="">Select a class</option>
            <option value="VI">VI</option>
            <option value="VII">VII</option>
            <option value="VIII">VIII</option>
            <option value="IX">IX</option>
            <option value="X">X</option>
            <option value="XI">XI</option>
            <option value="XII">XII</option>
            <option value="COMPETITIVE EXAM">Competitive Exam</option>
            <option value="GENERAL">GENERAL</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-gray-600">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="Address"
              className="w-full border px-4 py-2 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600">Profile Photo</label>
            <div className="flex items-center gap-2">
              <FaCloudUploadAlt className="text-blue-500" />
              <input
                type="file"
                name="profilePhoto"
                onChange={handleFileChange}
                className="flex-1 border px-4 py-2 rounded-lg"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-600">Father's Name</label>
            <input
              type="text"
              name="fatherName"
              value={formData.fatherName}
              onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
              placeholder="Father's Name"
              className="w-full border px-4 py-2 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600">Mother's Name</label>
            <input
              type="text"
              name="motherName"
              value={formData.motherName}
              onChange={(e) => setFormData({ ...formData, motherName: e.target.value })}
              placeholder="Mother's Name"
              className="w-full border px-4 py-2 rounded-lg"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Submit"}
          </button>
        </div>
      </form>
      <Footer />
    </div>
  );
};

export default AdmissionPage;
