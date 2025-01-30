import React from "react";
import { Link } from "react-router-dom";

const coursesData = [
  {
    id: "course1",
    thumbnail: "assets/course1.jpeg",
    title: "Chemical Equations and Reactions || Class - 10",
    description: "One shot l 2024 - 25 Exam.",
    videoLink: "https://www.youtube.com/watch?v=DU2IRc-mMqE",
    type: "video",
    author: "Abhishek Kumar Mishra",
  },
  {
    id: "course2",
    thumbnail: "assets/course3.jpeg",
    title: "Tense",
    description: "One Shot Video ll Abhishek Kumar Mishra ll SBI, IBPS, SSC, CAT, MAT & other Competitive Exam",
    videoLink: "https://www.youtube.com/live/f38gVO431Bs?si=ojRZVhjEcPAGOKwf",
    type: "video",
    author: "Abhishek Kumar Mishra",
  },
  {
    id: "course3",
    thumbnail: "assets/course1.jpeg",
    title: "A Letter to God || Flamingo  || Class - 10",
    description: "One shot l 2024 - 25 Exam.",
    videoLink: "https://www.youtube.com/watch?v=DU2IRc-mMqE",
    type: "video",
    author: "Abhishek Kumar Mishra",
  },
  {
    id: "playlist1",
    thumbnail: "assets/course2.jpeg",
    title: "120 Rules of Grammar",
    description: "Complete Solutions of English Grammer.",
    videoLink: "https://www.youtube.com/playlist?list=PLXOOUAgjCcK7taMblmZHTlRy4-Dq3a9MJ",
    type: "playlist",
    author: "Abhishek Kumar Mishra",
  },
  {
    id: "playlist2",
    thumbnail: "assets/course4.jpeg",
    title: "Vedic Mathematics - वैदिक गणित",
    description: "अब गणित का समाधान चुटकियों में",
    videoLink: "https://www.youtube.com/playlist?list=PLXOOUAgjCcK6fYhs8ZthzhitotlELzDPe",
    type: "playlist",
    author: "Abhishek Kumar Mishra",
  },
];

const CourseListPage = () => {
  return (
    <div className="max-w-6xl mx-auto py-12 px-5">
      <h1 className="text-3xl font-extrabold text-blue-600 mb-8 text-center">
        Explore Free Courses
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {coursesData.map((course) => (
          <Link
            to={course.type === "video" ? `/course/${course.id}` : course.videoLink}
            key={course.id}
            className="block bg-white shadow-md rounded-lg overflow-hidden transition-transform hover:scale-105"
            target={course.type === "playlist" ? "_blank" : "_self"} // Open playlists in a new tab
            rel="noopener noreferrer"
          >
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold text-gray-800">{course.title}</h2>
              <p className="text-gray-600 text-sm mt-2">{course.description}</p>
              <p className={`mt-3 font-semibold ${
                course.type === "playlist" ? "text-green-500" : "text-blue-500"
              }`}>
                {course.type === "playlist" ? "View Playlist" : "Watch Now"}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CourseListPage;
