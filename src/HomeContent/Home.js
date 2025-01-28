import React from 'react';
import HeroSection from './Hero';
import Courses from './CoursesSection';
import ReviewsSection from './Review';
import AboutSection from './About';
import Footer from './Footer';
import Navbar from './Navbar';

const Home = () => {
  return (
    <div>
        <Navbar/>
      <HeroSection />
      <Courses />
      <ReviewsSection />
      <AboutSection />
      <Footer />
    </div>
  );
};

export default Home;
