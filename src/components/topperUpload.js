import React, { useState } from "react";
import axios from "axios";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase"; // Make sure this path is correct

const UploadToppersForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    percentage: "",
    testimonial: "",
  });
  const [image, setImage] = useState(null);

  // Handle form data changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle image file changes
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please select an image.");
      return;
    }

    try {
      // Upload image to Cloudinary
      const formDataImage = new FormData();
      formDataImage.append("file", image);
      formDataImage.append("upload_preset", "tap-edu"); // Make sure your Cloudinary preset is correct

      const cloudinaryResponse = await axios.post(
        "https://api.cloudinary.com/v1_1/dkzczonkz/image/upload",
        formDataImage
      );

      const imageUrl = cloudinaryResponse.data.secure_url;

      // Add the topper data to Firestore
      await addDoc(collection(db, "toppers"), {
        ...formData,
        imageUrl, // Add Cloudinary image URL
      });

      alert("Topper data uploaded successfully!");
      setFormData({ name: "", city: "", percentage: "", testimonial: "" });
      setImage(null); // Reset form after submission
    } catch (error) {
      console.error("Error uploading data:", error);
      alert("Failed to upload topper data.");
    }
  };

  return (
    <div className="p-8 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Upload Topper Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Percentage</label>
          <input
            type="text"
            name="percentage"
            value={formData.percentage}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Testimonial</label>
          <textarea
            name="testimonial"
            value={formData.testimonial}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Image</label>
          <input type="file" onChange={handleFileChange} required />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Upload Topper
        </button>
      </form>
    </div>
  );
};

export default UploadToppersForm;
