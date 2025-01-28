import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase"; // Firebase Firestore and Authentication
import { collection, getDocs, query, where } from "firebase/firestore"; // Firestore functions
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import LoadingSpinner from "./LoadingSpinner";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AttendanceCheck = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [teacher, setTeacher] = useState(null); // To check if the user is a teacher

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentUser = auth.currentUser;
        if (currentUser) {
          setTeacher(currentUser); // Set teacher user
          // Fetch all attendance data for all students
          const attendanceQuery = collection(db, "attendance");
          const attendanceSnapshot = await getDocs(attendanceQuery);
          const attendanceList = attendanceSnapshot.docs.map((doc) => doc.data());
          setAttendanceData(attendanceList);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching attendance data: ", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Prepare data for the chart and table
  const chartData = {
    labels: ["Present", "Absent"], // We only care about present and absent days
    datasets: [
      {
        label: "Attendance Summary",
        data: [
          attendanceData.filter((attendance) => attendance.present).length,
          attendanceData.filter((attendance) => !attendance.present).length
        ],
        backgroundColor: ["rgba(75, 192, 192, 0.5)", "rgba(255, 99, 132, 0.5)"],
        borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  if (loading) {
    return <LoadingSpinner/>
  }

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h2 className="text-4xl font-bold mb-6 text-center">Attendance Records</h2>

      {/* Bar Chart */}
      <div className="mb-8">
        <Bar data={chartData} options={{ responsive: true }} />
      </div>

      {/* Table of Attendance */}
      <table className="min-w-full table-auto bg-white shadow-lg rounded-lg">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Student ID</th>
            <th className="py-2 px-4 border-b">Date</th>
            <th className="py-2 px-4 border-b">Status</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((attendance, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b">{attendance.userId}</td>
              <td className="py-2 px-4 border-b">{attendance.date}</td>
              <td className="py-2 px-4 border-b">{attendance.present ? "Present" : "Absent"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceCheck;
