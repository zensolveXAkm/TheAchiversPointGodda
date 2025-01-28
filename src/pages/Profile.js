import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase"; // Firebase Auth and Firestore
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { FaUserCircle, FaPhone, FaEnvelope, FaMapMarkerAlt, FaIdCard } from "react-icons/fa";
import { MdOutlineSchool, MdPerson } from "react-icons/md";
import LoadingSpinner from "../components/LoadingSpinner";

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async (uid) => {
      try {
        const userDoc = await getDoc(doc(db, "students", uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        } else {
          alert("No user data found!");
        }
      } catch (error) {
        alert("Error fetching user data: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserData(user.uid);
      } else {
        alert("No user is signed in.");
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!userData) {
    return <p className="text-center text-gray-600">No user data available.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-lg overflow-hidden shadow-2xl">
        {/* Header with Photo and Info */}
        <div className="flex items-center bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8">
          <div className="flex-shrink-0">
            {userData.profilePhoto ? (
              <img
                src={userData.profilePhoto}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
              />
            ) : (
              <FaUserCircle className="w-32 h-32 rounded-full border-4 border-white shadow-lg" />
            )}
          </div>
          <div className="ml-8">
            <h2 className="text-4xl font-bold">{userData.name}</h2>
            <div className="flex items-center mt-2 text-lg">
              <FaEnvelope className="mr-2" /> {userData.email}
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
          <div className="space-y-4">
            <div className="flex items-center">
              <FaPhone className="text-blue-600 mr-3" />
              <span className="text-gray-700">
                <strong>Phone:</strong> {userData.phone}
              </span>
            </div>
            <div className="flex items-center">
              <MdOutlineSchool className="text-blue-600 mr-3" />
              <span className="text-gray-700">
                <strong>Class:</strong> {userData.class}
              </span>
            </div>
            <div className="flex items-center">
              <MdPerson className="text-blue-600 mr-3" />
              <span className="text-gray-700">
                <strong>Father's Name:</strong> {userData.fatherName}
              </span>
            </div>
            <div className="flex items-center">
              <MdPerson className="text-blue-600 mr-3" />
              <span className="text-gray-700">
                <strong>Mother's Name:</strong> {userData.motherName}
              </span>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center">
              <FaMapMarkerAlt className="text-blue-600 mr-3" />
              <span className="text-gray-700">
                <strong>Address:</strong> {userData.address}
              </span>
            </div>
            {userData.aadharCardLink && (
              <div className="flex items-center">
                <FaIdCard className="text-blue-600 mr-3" />
                <span className="text-gray-700">
                  <strong>ID Proof:</strong>{" "}
                  <a
                    href={userData.aadharCardLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    View Aadhar
                  </a>
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Footer Section */}
        <div className="bg-gray-100 text-center py-4">
          <a
            href={userData.profilePhoto}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-all"
          >
            View Full Profile Photo
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
