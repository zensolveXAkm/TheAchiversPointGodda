import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { FaPlay, FaClock, FaUserAlt } from "react-icons/fa"; // Added React Icons for UI enhancement
import CourseListPage from "../components/CourseListPage"; // Importing CourseListPage to display all courses

const VideoPage = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      const courseDoc = doc(db, "past_classes", id);
      const courseSnapshot = await getDoc(courseDoc);
      if (courseSnapshot.exists()) {
        setCourse(courseSnapshot.data());
      }
      setLoading(false);
    };

    fetchCourse();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin h-16 w-16 border-t-4 border-blue-500 rounded-full"></div>
        <p className="ml-4 text-xl">Loading...</p>
      </div>
    );
  }

  if (!course) {
    return <div className="text-center mt-10">Course not found.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Sticky Video Player with 16:9 Aspect Ratio */}
      <div className="relative w-full mb-6 sticky top-0 z-10 bg-white">
        <div className="relative pb-[56.25%]"> {/* Aspect ratio 16:9 */}
        <iframe
  src={course.videoLink.replace("watch?v=", "embed/") + "?controls=0&showinfo=0&rel=0&modestbranding=0&fs=1&iv_load_policy=0"}
  title={course.title}
  className="absolute inset-0 w-full h-full"
  allowFullScreen
></iframe>

        </div>
      </div>

      {/* Course Content */}
      <div className="overflow-y-auto" py-6>
        <div className="bg-white shadow-xl rounded-lg overflow-hidden mb-10">
          {/* Course Details */}
          <div className="p-6 mt-6">
            {/* Course Title */}
            <h2 className="text-3xl font-bold text-gray-800 mb-4">{course.title}</h2>

            {/* Author and Class Information */}
            <div className="flex items-center mb-4">
              <FaUserAlt className="text-gray-500 mr-2" />
              <p className="text-lg text-gray-600"><b>By: </b>{course.author}</p>
            </div>

            {/* Description */}
            <p className="text-lg text-gray-800 mb-6">{course.description}</p>

            {/* Attachment Link */}
            {course.attachmentUrl && (
              <a
                href={course.attachmentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline text-lg"
              >
                View Attachment
              </a>
            )}
          </div>
        </div>

        {/* Course List */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Other Courses</h2>
          <CourseListPage /> {/* Display all courses here */}
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
