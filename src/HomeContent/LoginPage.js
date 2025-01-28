import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import Navbar2 from "./Navbar";

const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
      alert("Login successful!");
      navigate("/");
    } catch (error) {
      alert("Error logging in: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <Navbar2 />
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-blue-700">Login to Your Account</h2>
        <p className="text-sm text-gray-500 text-center">
          Welcome back! Please enter your credentials to continue.
        </p>
        <div className="space-y-4">
          <label className="block">
            <span className="font-semibold text-gray-700">Email Address</span>
            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full border px-4 py-2 rounded-lg mt-1 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </label>
          <label className="block">
            <span className="font-semibold text-gray-700">Password</span>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full border px-4 py-2 rounded-lg mt-1 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </label>
        </div>
        <button
          type="submit"
          className={`w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <p className="text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign up here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
