import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import QuizList from "./QuizListPage";
import Notes from "../components/Notes";
import AttendancePage from "./AttendancePage";
import CourseCarousel from "../components/CourseCarousel";
import LoadingSpinner from "../components/LoadingSpinner";
import ClassesPage from "../components/ClassesPage";

const HomePage = () => {
  const [userClass, setUserClass] = useState("");
  const [loading, setLoading] = useState(true);

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
        alert("Error fetching user data: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserClass(user.uid);
      } else {
        alert("No user is signed in.");
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-100 py-10 px-2">
      <div className="max-w-6xl mx-auto space-y-12">
        <ClassesPage />

        {/* Course Carousel Section */}
        <section className="p-6 rounded-lg shadow-sm">
          <CourseCarousel />
        </section>

        {/* Quizzes Section */}
        <section className="p-6 rounded-lg shadow-sm">
          <h2 className="text-3xl font-semibold text-blue-800 mb-4">Challenge Yourself with a Quiz</h2>
          <QuizList />
        </section>

        {/* Notes Section */}
        <section className="p-6 rounded-lg shadow-sm">
          <Notes />
        </section>

        {/* Attendance Section */}
        <section className="p-6 rounded-lg shadow-sm">
          <AttendancePage />
        </section>
      </div>
    </div>
  );
};

export default HomePage;
