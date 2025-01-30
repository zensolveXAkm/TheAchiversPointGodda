import React from 'react';
import HeroSection from './Hero';
import Courses from './CoursesSection';
import ReviewsSection from './Review';
import AboutSection from './About';
import Footer from './Footer';
import Navbar from './Navbar';
import ToppersSlideshow from './ToppersSlideshow';
import CourseListPage from './CourseListPage';
import Slideshow from './SlideShow';
import ImageGrid from './Gallary';

const Home = () => {
  return (
    <div>
        <Navbar/>
      <HeroSection />
      <Slideshow/>
      <Courses />

      <ToppersSlideshow/>
      <CourseListPage/>
      <ReviewsSection />
      <AboutSection />
      <ImageGrid/>
      <Footer />
    </div>
  );
};

export default Home;
