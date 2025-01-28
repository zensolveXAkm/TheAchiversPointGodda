import React, { useState } from "react";
import { auth, db } from "../firebase"; // Firebase Auth and Firestore
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    fatherName: "",
    motherName: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;
      await setDoc(doc(db, "students", user.uid), {
        ...formData,
        class: "GENERAL", // Default class
        profilePhoto: "", // Optional placeholder for profile photo
      });

      // Auto-login after signup
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      alert("Signup successful!");
      navigate("/"); // Redirect to home page
    } catch (error) {
      alert("Error during signup: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-lg rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Signup</h2>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 w-full rounded mb-4"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 w-full rounded mb-4"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="border p-2 w-full rounded mb-4"
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="border p-2 w-full rounded mb-4"
          required
        />
        <input
          type="text"
          name="fatherName"
          placeholder="Father's Name"
          value={formData.fatherName}
          onChange={handleChange}
          className="border p-2 w-full rounded mb-4"
          required
        />
        <input
          type="text"
          name="motherName"
          placeholder="Mother's Name"
          value={formData.motherName}
          onChange={handleChange}
          className="border p-2 w-full rounded mb-4"
          required
        />
        <textarea
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="border p-2 w-full rounded mb-4"
          required
        />
        <button
          type="submit"
          className={`bg-blue-600 text-white p-2 w-full rounded ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
          }`}
          disabled={loading}
        >
          {loading ? "Signing up..." : "Signup"}
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
