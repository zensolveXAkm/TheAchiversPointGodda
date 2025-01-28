import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const PastClassList = () => {
  const [pastClasses, setPastClasses] = useState([]);
  const [userClass, setUserClass] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async (uid) => {
      const userDoc = await getDoc(doc(db, "students", uid));
      if (userDoc.exists()) {
        setUserClass(userDoc.data().class); // Fetch and set user class
      }
    };

    const fetchPastClasses = async () => {
      const querySnapshot = await getDocs(collection(db, "pastClasses"));
      setPastClasses(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };

    onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserData(user.uid).then(() => fetchPastClasses());
      } else {
        alert("No user is signed in.");
      }
    });
  }, []);

  const viewDetails = (id) => {
    navigate(`/pastclass/${id}`);
  };

  return (
    <div className="p-6 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Past Classes for {userClass}</h2>
      <div className="flex space-x-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400">
        {pastClasses
          .filter((cls) => cls.classFor === userClass) // Filter by user class
          .map((cls) => (
            <div
              key={cls.id}
              className="min-w-[250px] bg-white rounded-lg shadow p-4 cursor-pointer transform hover:scale-105 transition"
              onClick={() => viewDetails(cls.id)}
            >
              <img
                src={cls.thumbnailUrl}
                alt="Thumbnail"
                className="w-full h-40 object-cover rounded mb-2"
              />
              <h3 className="font-semibold text-lg">{cls.description}</h3>
              <p className="text-sm text-gray-600">Date: {cls.date}</p>
              <p className="text-sm text-blue-600">Class: {cls.classFor}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PastClassList;
