import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { format } from "date-fns"; // For date comparison
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

const ClassesPage = () => {
  const [classes, setClasses] = useState([]);
  const [liveClasses, setLiveClasses] = useState([]);
  const [upcomingClasses, setUpcomingClasses] = useState([]);
  const [userClass, setUserClass] = useState("");

  useEffect(() => {
    const fetchUserClass = async (uid) => {
      try {
        const userDoc = await getDoc(doc(db, "students", uid));
        if (userDoc.exists()) {
          setUserClass(userDoc.data().class);
        } else {
          alert("No user data found!");
        }
      } catch (error) {
        console.error("Error fetching user data: ", error.message);
      }
    };

    const fetchClasses = async () => {
      const querySnapshot = await getDocs(collection(db, "liveClasses"));
      const classesData = [];
      querySnapshot.forEach((doc) => {
        classesData.push({ id: doc.id, ...doc.data() });
      });
      setClasses(classesData);
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

  useEffect(() => {
    if (userClass) {
      filterClasses();
    }
  }, [classes, userClass]);

  const filterClasses = () => {
    const now = new Date();
    const filteredClasses = classes.filter(
      (classItem) => classItem.class === userClass
    );

    const live = filteredClasses.filter(
      (classItem) =>
        new Date(classItem.startDateTime) <= now &&
        new Date(classItem.endDateTime) >= now
    );
    const upcoming = filteredClasses.filter(
      (classItem) => new Date(classItem.startDateTime) > now
    );

    setLiveClasses(live);
    setUpcomingClasses(upcoming);
  };

  return (
    <div className="bg-gray-100 p-6">

      {/* Live Classes Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Live Classes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {liveClasses.map((classItem) => (
            <div
              key={classItem.id}
              className={`transition-all duration-300 ${
                new Date(classItem.endDateTime) < new Date()
                  ? "p-4 bg-gray-300"
                  : "p-4 bg-white"
              } rounded-lg border border-blue-300 shadow-lg`}
            >
              {/* Thumbnail on top */}
              <div className="w-full h-48 overflow-hidden rounded-t-md bg-gray-200">
                <img
                  src={classItem.thumbnail}
                  alt={`${classItem.topic} thumbnail`}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content below the image */}
              <div className="p-4">
                <h3 className="text-xl font-semibold text-green-700">
                  {classItem.topic}
                </h3>
                <p className="text-gray-600 mt-2">
                  {format(new Date(classItem.startDateTime), "MMM dd, yyyy HH:mm")}{" "}
                  -{" "}
                  {format(new Date(classItem.endDateTime), "MMM dd, yyyy HH:mm")}
                </p>
                <p className="text-gray-500 mt-1">
                  <strong>Teacher:</strong> {classItem.teacher || "Abishek Mishrwa"}
                </p>

                {/* Buttons */}
                <div className="mt-4 flex space-x-4">
                  {/* Show "Join Class" button only if live */}
                  {new Date(classItem.startDateTime) <= new Date() &&
                  new Date(classItem.endDateTime) >= new Date() ? (
                    <a
                      href={classItem.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-all duration-300"
                    >
                      Join Class
                    </a>
                  ) : (
                    <span className="px-4 py-2 bg-gray-500 text-white rounded">
                      Class Over
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Classes Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Upcoming Classes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {upcomingClasses.map((classItem) => (
            <div
              key={classItem.id}
              className="transition-all duration-300 p-4 bg-white rounded-lg border border-blue-300 shadow-lg"
            >
              {/* Thumbnail on top */}
              <div className="w-full h-48 overflow-hidden rounded-t-md bg-gray-200">
                <img
                  src={classItem.thumbnail}
                  alt={`${classItem.topic} thumbnail`}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content below the image */}
              <div className="p-4">
                <h3 className="text-xl font-semibold text-green-700">
                  {classItem.topic}
                </h3>
                <p className="text-gray-600 mt-2">
                  {format(new Date(classItem.startDateTime), "MMM dd, yyyy HH:mm")}{" "}
                  -{" "}
                  {format(new Date(classItem.endDateTime), "MMM dd, yyyy HH:mm")}
                </p>
                <p className="text-gray-500 mt-1">
                  <strong>Teacher:</strong> {classItem.teacher || "Abishek Mishrwa"}
                </p>

                {/* Show "Waiting" button for upcoming classes */}
                <div className="mt-4 flex space-x-4">
                  <span className="px-4 py-2 bg-yellow-500 text-white rounded">
                    Waiting
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClassesPage;
