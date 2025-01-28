import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaUserCircle,
  FaChevronDown,
} from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { db } from "../firebase"; // Firestore
import { collection, getDocs, query, where, getDoc, doc } from "firebase/firestore";
import Sidebar from "./Sidebar"; // Sidebar Component

const NewNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [animateSidebar, setAnimateSidebar] = useState(false);
  const [userData, setUserData] = useState(null);
  const [displayText, setDisplayText] = useState("");
  const [homeworkTopic, setHomeworkTopic] = useState("");

  const toggleSidebar = () => {
    if (!sidebarOpen) {
      setSidebarOpen(true);
      setTimeout(() => setAnimateSidebar(true), 0);
    } else {
      setAnimateSidebar(false);
      setTimeout(() => setSidebarOpen(false), 300);
    }
  };

  const closeSidebar = () => {
    setAnimateSidebar(false);
    setTimeout(() => setSidebarOpen(false), 300);
  };

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => navigate("/"))
      .catch((error) => console.error("Logout failed:", error));
  };

  // Fetch user data
  useEffect(() => {
    const auth = getAuth();
    const fetchUserData = async (uid) => {
      try {
        const userDoc = await getDoc(doc(db, "students", uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        } else {
          console.error("No user data found in Firestore!");
        }
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserData(user.uid);
      } else {
        console.log("No user is signed in.");
      }
    });

    return () => unsubscribe();
  }, []);

  // Fetch pending homework for the user
  useEffect(() => {
    if (userData?.class) {
      const fetchHomework = async () => {
        const homeworkQuery = query(
          collection(db, "homework"),
          where("class", "==", userData.class)
        );
        const querySnapshot = await getDocs(homeworkQuery);
        const pendingHomework = querySnapshot.docs
          .map((doc) => doc.data())
          .find((hw) => !hw.completed); // Assume completed status in homework data

        setHomeworkTopic(pendingHomework?.topic || "");
      };
      fetchHomework();
    }
  }, [userData]);

  // Typewriter effect logic
  useEffect(() => {
    const messages = [
      `Hi 👋, ${userData?.name}`,
      `Good ${getGreetingTime()}`,
      homeworkTopic ? `Homework: ${homeworkTopic}` : "No Homework Assigned",
      "TAP Education",
    ];

    let currentMessageIndex = 0;

    const displayMessage = () => {
      if (currentMessageIndex < messages.length) {
        setDisplayText(messages[currentMessageIndex]);
        currentMessageIndex++;
        setTimeout(displayMessage, 5000); // Display each message for 5 seconds
      }
    };

    displayMessage(); // Start the typewriter effect
  }, [userData, homeworkTopic]);

  const getGreetingTime = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return "Morning";
    } else if (currentHour < 17) {
      return "Afternoon";
    } else {
      return "Evening";
    }
  };

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-green-200 to-blue-100 flex items-center justify-between px-4 py-3 shadow-md z-50 h-16">
        <button onClick={toggleSidebar} className="text-green-600 text-2xl">
          {sidebarOpen ? <IoMdClose /> : <FaBars />}
        </button>

        <div className="text-lg font-bold text-green-800 text-center">
          {displayText}
        </div>

        <div className="relative">
          <button
            className="flex items-center gap-2"
            onClick={() => setDropdownOpen((prev) => !prev)}
          >
            <FaUserCircle className="text-green-600 text-3xl rounded-full bg-green-200 p-1" />
            <FaChevronDown className="text-green-600" />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
              <div className="px-4 py-2 border-b">
                <p className="text-gray-700 font-semibold">
                  {userData?.name || "User"}
                </p>
                <p className="text-sm text-gray-500">
                  {userData?.email || "Email not available"}
                </p>
              </div>
              <Link
                to="/profile"
                className="block px-4 py-2 text-gray-700 hover:bg-green-50"
                onClick={() => setDropdownOpen(false)}
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-green-50"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Sidebar */}
      {sidebarOpen && (
        <Sidebar
          userData={userData}
          animateSidebar={animateSidebar}
          closeSidebar={closeSidebar}
          handleLogout={handleLogout}
        />
      )}

      {/* Add padding to avoid overlap */}
      <div className="pt-16">
        {/* Page content goes here */}
      </div>
    </>
  );
};

export default NewNavbar;
