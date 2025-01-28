import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase"; // Firestore instance
import { collection, getDocs, query, where } from "firebase/firestore";
import { FaCheckCircle, FaTimesCircle, FaPlayCircle } from "react-icons/fa";

const QuizPage = () => {
  const { topic } = useParams();
  const navigate = useNavigate();
  const [quizData, setQuizData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [answerStatus, setAnswerStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const quizCollection = collection(db, "quizzes");
        const quizQuery = query(quizCollection, where("topic", "==", topic));
        const quizSnapshot = await getDocs(quizQuery);
        const quizList = quizSnapshot.docs.map((doc) => doc.data());

        setQuizData(quizList);
        setLoading(false);
      } catch (err) {
        setError("Error fetching quiz data: " + err.message);
        setLoading(false);
      }
    };

    fetchQuizData();
  }, [topic]);

  useEffect(() => {
    if (timeRemaining === 0) {
      handleNextQuestion();
    }

    const timerInterval = setInterval(() => {
      if (timeRemaining > 0) {
        setTimeRemaining((prevTime) => prevTime - 1);
      }
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [timeRemaining]);

  const handleAnswerChange = (selectedOption) => {
    const currentQuestion = quizData[currentQuestionIndex];
    const isCorrect = selectedOption === currentQuestion.correctOption;

    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [currentQuestionIndex]: selectedOption,
    }));
    setAnswerStatus(isCorrect ? "Correct" : "Incorrect");

    setTimeout(() => {
      handleNextQuestion();
    }, 1000);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setAnswerStatus("");
      setTimeRemaining(30);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    let correctAnswers = 0;
    quizData.forEach((quiz, index) => {
      if (answers[index] === quiz.correctOption) {
        correctAnswers++;
      }
    });

    alert(`You answered ${correctAnswers} out of ${quizData.length} correctly!`);
    navigate("/");
  };

  const handleQuit = () => {
    navigate("/");
  };

  if (loading) {
    return <div className="text-center text-white text-xl">Loading quiz...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  const currentQuiz = quizData[currentQuestionIndex];

  return (
    <div className="max-w-3xl mx-auto bg-gradient-to-r from-blue-600 to-green-400 ">
      <div className=" mb-6">
        <h2 className="text-2xl font-bold text-teal-300 left-0">Quiz: {topic}</h2>
      </div>

      {currentQuiz ? (
        <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg">
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-3">{currentQuiz.question}</h3>

            <div className="space-y-4">
              {currentQuiz.options.map((option, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-lg flex items-center cursor-pointer transition transform hover:scale-105 ${
                    answers[currentQuestionIndex] === option
                      ? "bg-teal-500"
                      : "bg-gray-700"
                  }`}
                  onClick={() => handleAnswerChange(option)}
                >
                  <div className="w-6 h-6 border-2 border-white rounded-full mr-4 flex justify-center items-center">
                    {answers[currentQuestionIndex] === option ? (
                      <FaCheckCircle className="text-white" />
                    ) : (
                      <div className="w-3 h-3 bg-transparent" />
                    )}
                  </div>
                  <p>{option}</p>
                </div>
              ))}
            </div>

            {answerStatus && (
              <div
                className={`mt-4 text-xl flex items-center justify-center ${
                  answerStatus === "Correct" ? "text-green-400" : "text-red-400"
                }`}
              >
                {answerStatus === "Correct" ? (
                  <FaCheckCircle className="mr-2" />
                ) : (
                  <FaTimesCircle className="mr-2" />
                )}
                {answerStatus}
              </div>
            )}
          </div>

          <div className="flex justify-between items-center mt-6">
            <button
              className="bg-red-600 text-white py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-red-700 transition"
              onClick={handleQuit}
            >
              <FaTimesCircle />Quit
            </button>
            <div className="flex items-center text-teal-300">
              <FaPlayCircle className="mr-2" />
              Time Remaining: {timeRemaining} sec
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-xl text-yellow-300 mt-4">No more questions.</div>
      )}
    </div>
  );
};

export default QuizPage;
