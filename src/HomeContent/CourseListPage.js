import React from "react";
import { Link } from "react-router-dom";

const coursesData = [
  {
    id: "course1",
    thumbnail: "https://via.placeholder.com/150",
    title: "React Basics",
    description: "Learn the basics of React with this comprehensive guide.",
    videoLink: "https://www.youtube.com/watch?v=Ke90Tje7VS0",
    author: "John Doe"
  },
  {
    id: "course2",
    thumbnail: "https://via.placeholder.com/150",
    title: "Firebase Crash Course",
    description: "Learn Firebase for backend development.",
    videoLink: "https://www.youtube.com/watch?v=f8qBeaGe2S4",
    author: "Jane Smith"
  }
];

const CourseListPage = () => {
  return (
    <div className="max-w-6xl mx-auto py-12 px-5">
      <h1 className="text-3xl font-extrabold text-blue-600 mb-8 text-center">Explore Free Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {coursesData.map(course => (
          <Link
            to={`/course/${course.id}`}
            key={course.id}
            className="block bg-white shadow-md rounded-lg overflow-hidden transition-transform hover:scale-105"
          >
            <img src={course.thumbnail} alt={course.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-bold text-gray-800">{course.title}</h2>
              <p className="text-gray-600 text-sm mt-2">{course.description}</p>
              <p className="mt-3 text-blue-500 font-semibold">Watch Now</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CourseListPage;
