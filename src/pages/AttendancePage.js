import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase"; // Firebase Firestore and Auth
import { collection, addDoc, query, where, getDocs } from "firebase/firestore"; // Firestore functions
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const AttendancePage = () => {
  const [isPresent, setIsPresent] = useState(false);
  const [attendanceMarked, setAttendanceMarked] = useState(false);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate(); // To navigate between pages

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUserId(user.uid); // Set the user ID from Firebase Authentication
    } else {
      navigate("/login"); // Redirect to login if no user is logged in
    }
  }, [navigate]);

  // Check if attendance has already been marked for today
  useEffect(() => {
    if (userId) {
      const checkIfAttendanceMarked = async () => {
        const today = new Date().toISOString().split("T")[0]; // Today's date (YYYY-MM-DD)
        const q = query(
          collection(db, "attendance"),
          where("userId", "==", userId),
          where("date", "==", today)
        );
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          setAttendanceMarked(true); // Attendance already marked
        }
      };
      checkIfAttendanceMarked();
    }
  }, [userId]);

  // Handle marking the attendance
  const handleAttendanceSubmit = async () => {
    if (userId) {
      const today = new Date().toISOString().split("T")[0]; // Today's date
      try {
        await addDoc(collection(db, "attendance"), {
          userId,
          date: today,
          present: isPresent,
        });
        setAttendanceMarked(true);
        alert("Attendance marked successfully!");
      } catch (error) {
        console.error("Error marking attendance:", error);
      }
    }
  };

  return (
    <div className=" bg-gray-100 flex items-center py-10 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Mark Your Attendance</h2>
        <div className="text-center">
          {attendanceMarked ? (
            <p className="text-green-600 text-lg flex items-center justify-center gap-2">
              <FaCheckCircle /> Attendance for today has already been marked.
            </p>
          ) : (
            <>
              <label className="block text-lg font-semibold text-gray-700 mb-4">
                Are you present today?
              </label>
              <div className="flex items-center justify-center gap-6 mb-6">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="true"
                    checked={isPresent === true}
                    onChange={() => setIsPresent(true)}
                    className="form-radio text-blue-500"
                  />
                  <span className="text-gray-700">Yes</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="false"
                    checked={isPresent === false}
                    onChange={() => setIsPresent(false)}
                    className="form-radio text-blue-500"
                  />
                  <span className="text-gray-700">No</span>
                </label>
              </div>
              <button
                onClick={handleAttendanceSubmit}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition duration-300"
              >
                Submit Attendance
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AttendancePage;
