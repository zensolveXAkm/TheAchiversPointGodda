import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { FaClock } from "react-icons/fa";
import { motion } from "framer-motion";
import LoadingSpinner from "../components/LoadingSpinner";
import PastClassList from "../components/PastClassList";

const LiveClassPage = () => {
  const [classes, setClasses] = useState([]);
  const [userClass, setUserClass] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserClass = async (uid) => {
      try {
        const userDoc = await getDoc(doc(db, "students", uid));
        if (userDoc.exists()) {
          setUserClass(userDoc.data().class); // Get user class from profile
        } else {
          alert("No user data found!");
        }
      } catch (error) {
        alert("Error fetching user data: " + error.message);
      }
    };

    const fetchClasses = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "liveClasses"));
        const classData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setClasses(classData);
      } catch (error) {
        console.error("Error fetching live classes: ", error);
      } finally {
        setLoading(false);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserClass(user.uid).then(() => fetchClasses());
      } else {
        alert("No user is signed in.");
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  const filteredClasses = classes.filter((classItem) => classItem.class === userClass);

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h2 className="text-4xl font-bold mb-6 text-center">Live Classes</h2>
      <div className="overflow-x-auto">
        <motion.div
          className="flex gap-6"
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {filteredClasses.length > 0 ? (
            filteredClasses.map((classItem) => (
              <motion.div
                key={classItem.id}
                className="bg-white shadow-lg rounded-lg p-4 min-w-[300px] sm:min-w-[350px] flex-shrink-0 hover:scale-105 transition-transform duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <motion.img
                  src={classItem.thumbnail}
                  alt={`${classItem.topic} thumbnail`}
                  className="w-full h-40 object-cover rounded"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
                <h3 className="text-2xl font-semibold mt-4">{classItem.topic}</h3>
                <p className="text-gray-600 mt-1">Class: {classItem.class}</p>
                <p className="text-gray-600 mt-1">
                  Time: {classItem.startTime} - {classItem.endTime}
                </p>
                <a
                  href={classItem.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 text-blue-500 underline hover:text-blue-700"
                >
                  <FaClock className="inline-block mr-2" /> Join Class
                </a>
              </motion.div>
            ))
          ) : (
            <p className="text-center text-gray-600">No live classes available for your class.</p>
          )}
        </motion.div>
        <PastClassList/>
      </div>
    </div>
  );
};

export default LiveClassPage;
