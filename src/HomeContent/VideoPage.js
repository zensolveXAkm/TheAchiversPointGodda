import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import CourseListPage from "../components/CourseListPage"; 

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
    thumbnail: "assets/course5.jpeg",
    title: "A Letter to God || Flamingo  || Class - 10",
    description: "One shot l 2024 - 25 Exam.",
    videoLink: "https://www.youtube.com/watch?v=j9v2inRYQU0",
    type: "video",
    author: "Abhishek Kumar Mishra",
  },
  {
    id: "course4",
    thumbnail: "assets/course6.jpeg",
    title: "The Last Lesson || Flamingo || Class - 12th",
    description: "One shot l 2024 - 25 Exam.",
    videoLink: "https://www.youtube.com/watch?v=zJocZtCB2i0",
    type: "video",
    author: "Abhishek Kumar Mishra",
  },
  {
    id: "course4",
    thumbnail: "assets/course7.jpeg",
    title: "My Mother at Sixty -Six || Flamingo || Class - 12th",
    description: "One shot l 2024 - 25 Exam.",
    videoLink: "https://www.youtube.com/watch?v=HYnStG7tBdc",
    type: "video",
    author: "Abhishek Kumar Mishra",
  },
  {
    id: "course4",
    thumbnail: "assets/course7.jpeg",
    title: " Is Matter Around us Pure? || Chemistry || Class - 9th",
    description: "One shot l 2024 - 25 Exam.",
    videoLink: "https://www.youtube.com/watch?v=HYnStG7tBdc",
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
