import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase"; // Firestore instance
import { collection, getDocs } from "firebase/firestore";

const QuizList = () => {
  const [quizzes, setQuizzes] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const quizCollection = collection(db, "quizzes");
        const quizSnapshot = await getDocs(quizCollection);
        const quizList = quizSnapshot.docs.map((doc) => doc.data());

        // Group quizzes by topic
        const groupedQuizzes = quizList.reduce((acc, quiz) => {
          const { topic } = quiz;
          if (!acc[topic]) {
            acc[topic] = [];
          }
          acc[topic].push(quiz);
          return acc;
        }, {});

        setQuizzes(groupedQuizzes);
        setLoading(false);
      } catch (err) {
        setError("Error fetching quizzes: " + err.message);
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600 text-lg">
        Loading quizzes...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-600 text-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-10">
      <h2 className="text-center text-2xl font-semibold mb-6">Available Quizzes</h2>

      {Object.keys(quizzes).length === 0 ? (
        <div className="text-center text-gray-600">No quizzes available</div>
      ) : (
        <div className="relative">
          {/* Scroll Buttons */}
          <button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white rounded-full p-3 shadow-md hover:bg-blue-700 focus:outline-none z-10 transition-opacity duration-300 opacity-60 hover:opacity-100"
            onClick={scrollLeft}
          >
            ←
          </button>

          {/* Scrollable Cards Container */}
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto space-x-4 scroll-smooth snap-x snap-mandatory pr-10"
            style={{
              scrollSnapType: "x mandatory",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {Object.keys(quizzes).map((topic) => (
              <Link
                key={topic}
                to={`/quiz/${topic}`}
                className="flex-none w-64 bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 snap-start"
              >
                {/* Thumbnail */}
                <img
                  src="/Quiz.png"
                  alt={`${topic} thumbnail`}
                  className="w-full h-28 object-cover"
                />

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900">{topic}</h3>
                  <ul className="text-sm text-gray-700">
                    <li>
                      <strong>Per Question Time:</strong>{" "}
                      {quizzes[topic][0]?.time || "N/A"} seconds
                    </li>
                    <li>
                      <strong>Total Questions:</strong> {quizzes[topic].length}
                    </li>
                    <li>
                      <strong>For Class:</strong> {quizzes[topic][0]?.class || "N/A"}
                    </li>
                  </ul>
                  <p className="text-blue-500 font-medium mt-4 text-right">
                    Start Quiz →
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* Scroll Right Button */}
          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white rounded-full p-3 shadow-md hover:bg-blue-700 focus:outline-none z-10 transition-opacity duration-300 opacity-60 hover:opacity-100"
            onClick={scrollRight}
          >
            →
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizList;
