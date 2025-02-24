import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import CourseListPage from "../components/CourseListPage"; 
import coursesData from "./CoursesData.json"

const VideoPage2 = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const courseData = coursesData.find(c => c.id === id);
    setCourse(courseData);
  }, [id]);

  if (!course) {
    return <div className="text-center mt-10">Course not found.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-5 py-12">
      <Link to="/" className="text-blue-500 flex items-center mb-5">
        <FaArrowLeft className="mr-2" /> Back to Home
      </Link>

      <h2 className="text-3xl font-extrabold text-gray-800 mb-4">{course.title}</h2>

      <div className="relative pb-[56.25%] mb-8">
        <iframe
          src={course.videoLink.replace("watch?v=", "embed/")}
          className="absolute inset-0 w-full h-full"
          title={course.title}
          allowFullScreen
        ></iframe>
      </div>

      <p className="text-lg text-gray-600 mb-6">{course.description}</p>
      <p className="text-sm text-gray-500"><b>Author:</b> {course.author}</p>

    </div>
  );
};

export default VideoPage2;
