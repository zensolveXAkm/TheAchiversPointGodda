import React, { useEffect, useState, useRef } from "react";
import { db } from "../firebase"; // Firestore setup
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { auth } from "../firebase"; // Firebase Auth
import { onAuthStateChanged } from "firebase/auth";

const CourseCarousel = () => {
  const [courses, setCourses] = useState([]);
  const [userClass, setUserClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState(""); // New state for subject
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const fetchUserClass = async (uid) => {
      try {
        const userDoc = await getDoc(doc(db, "students", uid));
        if (userDoc.exists()) {
          setUserClass(userDoc.data().class);
        } else {
          console.error("No user data found!");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchCourses = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "courses"));
        const courseData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCourses(courseData);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserClass(user.uid);
      }
    });

    fetchCourses();
    return () => unsubscribe();
  }, []);

  // Filter courses by both class and subject
  const filteredCourses = courses.filter((course) => {
    const matchesClass = course.classEnrollingFor === userClass;
    const matchesSubject = selectedSubject ? course.subject === selectedSubject : true;
    return matchesClass && matchesSubject;
  });

  const scrollLeft = () => {
    scrollContainerRef.current.scrollBy({
      left: -300, // Adjust based on card width
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollContainerRef.current.scrollBy({
      left: 300, // Adjust based on card width
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full">
      <h2 className="text-3xl font-bold mb-6 text-blue-800">
        Popular Courses for {userClass || "Your Class"}
      </h2>

      {/* Subject Filter Dropdown */}
      <div className="mb-6">
        <label htmlFor="subject" className="text-sm font-medium text-gray-700">
          Filter by Subject:
        </label>
        <select
          id="subject"
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="w-full border rounded px-4 py-2 mt-2"
        >
          <option value="">All Subjects</option>
          <option value="Science">Science</option>
          <option value="Maths">Maths</option>
          <option value="Social Science">Social Science</option>
          <option value="Hindi">Hindi</option>
          <option value="English">English</option>
          <option value="Computer">Computer</option>
        </select>
      </div>

      <div className="relative">
        {/* Scroll Left Button */}
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full shadow-md hover:bg-blue-600 z-10"
          onClick={scrollLeft}
        >
          ←
        </button>

        {/* Scrollable Courses Container */}
        <div
          ref={scrollContainerRef}
          className="flex space-x-6 overflow-x-auto scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-gray-100 pb-4"
        >
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="min-w-[280px] max-w-xs bg-white rounded-lg overflow-hidden flex-shrink-0 border border-gray-200"
            >
              <img
                src={course.thumbnailUrl}
                alt={course.topic}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 truncate">
                  {course.topic}
                </h3>
                <p className="text-sm text-gray-600 mt-2 truncate">{course.description}</p>
                <p className="mt-2 text-sm text-gray-700">
                  <strong>Author:</strong> {course.author}
                </p>
                <p className="mt-1 text-sm font-medium text-green-600">
                  {course.price === "Free" ? "Free" : `Price: ₹${course.price}`}
                </p>
                <p className="mt-1 text-sm font-medium text-blue-600">
                  Class: {course.classEnrollingFor}
                </p>
                <p className="mt-1 text-sm font-medium text-blue-600">
                  Subject: {course.subject}
                </p>
                <a
                  href={course.courseLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block w-full text-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300"
                >
                  View Course
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll Right Button */}
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full shadow-md hover:bg-blue-600 z-10"
          onClick={scrollRight}
        >
          →
        </button>
      </div>

      {filteredCourses.length === 0 && (
        <p className="text-center text-gray-500 mt-6">
          No courses available for your class and selected subject at the moment.
        </p>
      )}
    </div>
  );
};

export default CourseCarousel;
