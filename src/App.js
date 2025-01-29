// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import AdmissionPage from "./HomeContent/AdmissionPage";
import HomeworkPage from "./pages/HomeworkPage";
import LoginPage from "./HomeContent/LoginPage";
import Navbar from "./components/Navbar";
import QuizPage from "./pages/QuizPage";
import PrivateRoute from "./PrivateRoute";
import { AuthProvider } from "./AuthContext";
import ProfilePage from "./pages/Profile";
import QuizListPage from "./pages/QuizListPage";
import Notes from "./components/Notes";
import CommunityPage from "./pages/CommunityPage";
import Home from "./HomeContent/Home";
import AboutPage from "./HomeContent/AboutPage";
import Check from "./Check";
import Error10 from "./components/404";
import Contact from "./pages/Contact";
import SignupPage from "./pages/SignupPage";
import NewNavbar from "./components/Navbar3";
import CourseCarousel from "./components/CourseCarousel";
import VideoPage from "./pages/VideoPage";
import CourseListPage from "./components/CourseListPage";
import LocateUs from "./HomeContent/LocateUs";
import TermsAndConditionsPage from "./HomeContent/T&C";
import UploadToppersForm from "./components/topperUpload";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Check />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admission" element={<AdmissionPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/locate-us" element={<LocateUs />} />
          <Route path="terms" element={<TermsAndConditionsPage />} />
          <Route path="/topperupload" element={<UploadToppersForm/>}/>
          {/* Add other public routes here */}
          {/* Private Routes (with Navbar) */}

        <Route path="/clist" element={
          <PrivateRoute>
            <NewNavbar />
            <Navbar /> {/* Navbar will only be shown on private routes */}
            <CourseListPage />
          </PrivateRoute>} />
        <Route path="/video/:id" element={
          <PrivateRoute>
            <Navbar />
            <VideoPage />
            </PrivateRoute>} />



          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <NewNavbar />
                <Navbar /> {/* Navbar will only be shown on private routes */}
                <HomePage />
              </PrivateRoute>
            }
          />
 
          <Route
            path="/homework"
            element={
              <PrivateRoute>
                <NewNavbar />
                <Navbar /> {/* Navbar will only be shown on private routes */}
                <HomeworkPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/quiz/:topic"
            element={
              <PrivateRoute>
                <NewNavbar />
                <Navbar /> {/* Navbar will only be shown on private routes */}
                <QuizPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <NewNavbar />
                <Navbar /> {/* Navbar will only be shown on private routes */}
                <ProfilePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/quizlist"
            element={
              <PrivateRoute>
                <NewNavbar />
                <Navbar /> {/* Navbar will only be shown on private routes */}
                <QuizListPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/notes"
            element={
              <PrivateRoute>
                <NewNavbar />
                <Navbar /> {/* Navbar will only be shown on private routes */}
                <Notes />
              </PrivateRoute>
            }
          />
          <Route
            path="/course"
            element={
              <PrivateRoute>
                <NewNavbar />
                <Navbar /> {/* Navbar will only be shown on private routes */}
                <CourseCarousel />
              </PrivateRoute>
            }
          />
          <Route
            path="/community"
            element={
              <PrivateRoute>
                <NewNavbar />
                <Navbar /> {/* Navbar will only be shown on private routes */}
                <CommunityPage />
              </PrivateRoute>
            }
          />

          {/* Catch all route to redirect if no path matches */}
          <Route path="*" element={<Error10 />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
