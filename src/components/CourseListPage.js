import React, { useState, useEffect } from "react";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { Link } from "react-router-dom";
import { FaPlay, FaClock, FaUserAlt } from "react-icons/fa"; // React Icons
import { motion } from "framer-motion"; // For Animations
import { auth, db } from "../firebase"; // Firebase Auth and Firestore
import { onAuthStateChanged } from "firebase/auth"; // To get current user

const CourseListPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userClass, setUserClass] = useState(null); // State to store user's class

  // Fetch the user's class based on their profile
  useEffect(() => {
    const fetchUserClass = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, "students", user.uid));
        if (userDoc.exists()) {
          setUserClass(userDoc.data().class); // Set user's class
        }
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserClass();
      } else {
        alert("No user is signed in.");
      }
    });

    return () => unsubscribe();
  }, []);

  // Fetch courses from Firestore
  useEffect(() => {
    const fetchCourses = async () => {
      const courseCollection = collection(db, "past_classes");
      const courseSnapshot = await getDocs(courseCollection);
      const courseList = courseSnapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter((course) => course.class === userClass); // Filter courses by user class
      setCourses(courseList);
      setLoading(false);
    };

    if (userClass) {
      fetchCourses();
    }
  }, [userClass]);

  if (loading) {
    return (
      <div className="text-center mt-10">
        <div className="animate-spin h-10 w-10 border-t-2 border-blue-500 rounded-full mx-auto mb-2"></div>
        <p className="text-xl font-semibold text-gray-500">Loading courses...</p>
      </div>
    );
  }

  if (courses.length === 0) {
    return <div className="text-center mt-10">No courses available for your class.</div>;
  }

  return (
    <div className="bg-gradient-to-r from-green-200 via-blue-200 to-white min-h-screen p-6 relative bg-fixed">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute animate-pulse w-48 h-48 bg-green-300 rounded-full opacity-30 -left-20 top-20"></div>
        <div className="absolute animate-pulse w-64 h-64 bg-blue-300 rounded-full opacity-20 -right-24 bottom-32"></div>
        <div className="absolute animate-pulse w-36 h-36 bg-white rounded-full opacity-25 -left-10 bottom-10"></div>
      </div>

      <div className="relative z-10">
        {/* Scrollable Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 overflow-y-auto max-h-screen">
          {courses.map((course) => (
            <motion.div
              key={course.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white rounded-lg shadow-2xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl"
            >
              <Link to={`/video/${course.id}`} className="block">
                {/* Thumbnail */}
                <div className="relative">
                  {course.thumbnail ? (
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-56 object-cover rounded-t-lg"
                    />
                  ) : (
                    <div className="w-full h-56 bg-gray-200 flex items-center justify-center text-gray-400 text-xl rounded-t-lg">
                      No Thumbnail
                    </div>
                  )}

                  {/* Play Icon */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-4xl">
                    <FaPlay className="hover:text-gray-200 transition-all" />
                  </div>
                </div>

                {/* Course Details */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800">{course.title}</h3>
                  <div className="flex items-center text-sm text-gray-500 mt-3">
                    <FaUserAlt className="mr-2" />
                    <p>{course.author}</p>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mt-2">
                    <FaClock className="mr-2" />
                    <p>{course.duration}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseListPage;
