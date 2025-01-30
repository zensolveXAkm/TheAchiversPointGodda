import React from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const images = [
  { path: "assets/img (1).jpeg", title: "Welcome to Our Platform" },
  { path: "assets/img (2).jpeg", title: "Explore Amazing Courses" },
  { path: "assets/img (3).jpeg", title: "Explore Amazing Courses" },
  { path: "assets/img (4).jpeg", title: "Explore Amazing Courses" },
  { path: "assets/img (2).jpeg", title: "Explore Amazing Courses" },

];

const Slideshow = () => {
  const navigate = useNavigate();

  const handleSlideClick = () => {
    navigate("/admission");
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    adaptiveHeight: true,
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl sm:text-4xl font-bold text-center text-blue-600 mb-6 sm:mb-8">
        Our Courses
      </h2>
      <Slider {...settings}>
        {images.map((img, index) => (
          <div
            key={index}
            className="relative cursor-pointer"
            onClick={handleSlideClick}
          >
            {/* Image */}
            <img
              src={img.path}
              alt={`Slide ${index + 1}`}
              className="w-full h-[250px] sm:h-[350px] md:h-[650px] object-cover rounded-lg"
            />
            {/* Overlay Text */}
            <div className="absolute inset-0 flex items-center justify-center ">
            
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Slideshow;
