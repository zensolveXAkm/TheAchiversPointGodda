import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs, addDoc, doc, query, where, getDoc } from "firebase/firestore";
import axios from "axios";
import { getAuth } from "firebase/auth";

const HomeworkPage = () => {
  const [homeworkList, setHomeworkList] = useState([]);
  const [submission, setSubmission] = useState({
    name: "",
    email: "",
    remarks: "",
    file: null,
  });
  const [userSubmissions, setUserSubmissions] = useState({});
  const [userClass, setUserClass] = useState(""); // Store the user's class

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser) {
      const fetchUserData = async () => {
        const userDoc = await getDoc(doc(db, "students", currentUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setSubmission((prev) => ({
            ...prev,
            name: userData.name || "",
            email: userData.email || "",
          }));
          setUserClass(userData.class); // Set the user's class
        }
      };
      fetchUserData();
    }
  }, []);

  useEffect(() => {
    if (userClass) {
      const fetchHomework = async () => {
        const querySnapshot = await getDocs(collection(db, "homework"));
        const filteredHomework = querySnapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((hw) => hw.class === userClass);
        setHomeworkList(filteredHomework);
      };
      fetchHomework();
    }
  }, [userClass]);

  useEffect(() => {
    const fetchUserSubmissions = async () => {
      const auth = getAuth();
      const currentUser = auth.currentUser;
      if (currentUser) {
        const submissionsQuery = query(
          collection(db, "homework_submissions"),
          where("email", "==", currentUser.email)
        );
        const querySnapshot = await getDocs(submissionsQuery);
        const userSubmissionsData = {};
        querySnapshot.docs.forEach((doc) => {
          userSubmissionsData[doc.data().homeworkId] = true;
        });
        setUserSubmissions(userSubmissionsData);
      }
    };
    fetchUserSubmissions();
  }, []);

  const handleFileChange = (e) => setSubmission({ ...submission, file: e.target.files[0] });

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "uday-oc");
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/dqubwzm17/upload`,
      formData
    );
    return response.data.secure_url;
  };

  const handleSubmit = async (homeworkId) => {
    if (!submission.file) {
      alert("Please select a file to upload.");
      return;
    }
    if (userSubmissions[homeworkId]) {
      alert("You have already submitted your homework for this topic.");
      return;
    }

    try {
      const attachmentUrl = await uploadToCloudinary(submission.file);
      await addDoc(collection(db, "homework_submissions"), {
        homeworkId,
        name: submission.name,
        email: submission.email,
        remarks: submission.remarks,
        attachmentUrl,
        submittedAt: new Date(),
      });
      alert("Homework submitted successfully!");
      setSubmission((prev) => ({ ...prev, remarks: "", file: null }));

      setUserSubmissions((prev) => ({ ...prev, [homeworkId]: true }));
    } catch (error) {
      alert("Error submitting homework: " + error.message);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-b from-gray-100 to-blue-50">
      <h2 className="text-4xl font-extrabold mb-6 text-center text-blue-800">Homework for Class {userClass}</h2>
      <div className="space-y-6">
        {homeworkList.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">No homework available for this class.</p>
        ) : (
          homeworkList.map((hw) => (
            <div
              key={hw.id}
              className="p-6 bg-white rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-all"
            >
              <h3 className="text-2xl font-semibold mb-2">{hw.topic}</h3>
              <p className="text-gray-700 mb-2">{hw.description}</p>
              <p className="text-sm text-gray-500">Due: {hw.dueDate}</p>
              <a
                href={hw.attachmentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-3 text-blue-500 hover:underline"
              >
                View Attachment
              </a>
              {userSubmissions[hw.id] ? (
                <p className="mt-4 text-green-600 font-bold text-center">
                  Homework is Completed. Chill now!
                </p>
              ) : (
                <>
                  <label className="block mt-4 font-semibold">
                    Upload Homework:
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="block mt-2 p-2 border rounded"
                    />
                  </label>
                  <input
                    type="text"
                    name="remarks"
                    value={submission.remarks}
                    onChange={(e) =>
                      setSubmission((prev) => ({ ...prev, remarks: e.target.value }))
                    }
                    placeholder="Remarks (optional)"
                    className="w-full p-2 mt-3 border rounded"
                  />
                  <button
                    onClick={() => handleSubmit(hw.id)}
                    className="w-full mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                  >
                    Submit My Homework
                  </button>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HomeworkPage;
