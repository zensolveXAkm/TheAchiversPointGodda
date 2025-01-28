import React, { useState } from "react";
import axios from "axios";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import AboutSection from "../HomeContent/About";
import Navbar2 from "../HomeContent/Navbar";

const db = getFirestore();

const cloudinaryConfig = {
  cloudName: "dqubwzm17",
  uploadPreset: "uday-oc",
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    attachment: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "attachment") {
      setFormData({ ...formData, attachment: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let uploadedFileUrl = "";

    if (formData.attachment) {
      const formDataObj = new FormData();
      formDataObj.append("file", formData.attachment);
      formDataObj.append("upload_preset", cloudinaryConfig.uploadPreset);

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/upload`,
        formDataObj
      );
      uploadedFileUrl = response.data.secure_url;
    }

    try {
      await addDoc(collection(db, "messages"), {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        attachmentUrl: uploadedFileUrl,
        createdAt: new Date(),
      });
      alert("Message submitted successfully!");
      setFormData({ name: "", email: "", phone: "", message: "", attachment: null });
    } catch (error) {
      console.error("Error submitting message: ", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar2 />
      <div className="max-w-7xl mx-auto p-5">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-semibold text-center mb-5"><br/>Contact Us</h1>
          <div className="lg:flex lg:space-x-10">
            {/* Form Section */}
            <div className="lg:w-1/2 mb-8 lg:mb-0">
              <form onSubmit={handleSubmit} className="space-y-6">
                <label className="block">
                  <span className="text-gray-700">Name</span>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg shadow-md mt-2"
                    required
                  />
                </label>
                <label className="block">
                  <span className="text-gray-700">Email</span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg shadow-md mt-2"
                    required
                  />
                </label>
                <label className="block">
                  <span className="text-gray-700">Phone</span>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg shadow-md mt-2"
                  />
                </label>
                <label className="block">
                  <span className="text-gray-700">Message</span>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg shadow-md mt-2"
                    required
                  />
                </label>
                <label className="block">
                  <span className="text-gray-700">Attachment</span>
                  <input
                    type="file"
                    name="attachment"
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg shadow-md mt-2"
                  />
                </label>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg mt-4 hover:bg-blue-700 transition-all"
                >
                  Submit
                </button>
              </form>
            </div>

            {/* About Section */}
            <div className="lg:w-1/2">
              <AboutSection />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
