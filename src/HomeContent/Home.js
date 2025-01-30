import React from 'react';
import HeroSection from './Hero';
import Courses from './CoursesSection';
import ReviewsSection from './Review';
import AboutSection from './About';
import Footer from './Footer';
import Navbar from './Navbar';
import ToppersSlideshow from './ToppersSlideshow';
import CourseListPage from './CourseListPage';

const Home = () => {
  return (
    <div>
        <Navbar/>
      <HeroSection />
      <Courses />
      <ToppersSlideshow/>
      <CourseListPage/>
      <ReviewsSection />
      <AboutSection />
      <Footer />
    </div>
  );
};

export default Home;
