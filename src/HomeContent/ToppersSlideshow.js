import React from "react";
import Slider from "react-slick";
import "./ToppersSlideshow.css"; // Custom styles for slideshow

const toppersList = [
  {
    name: "Aryan Singh",
    city: "Delhi",
    percentage: "98%",
    image: "https://via.placeholder.com/300?text=Aryan+Singh",
    banner: "https://via.placeholder.com/1200x400?text=Aryan+Singh+Banner",
    testimonial: "The supportive teachers and study materials made a big difference in my success!",
  },
  {
    name: "Sanya Verma",
    city: "Mumbai",
    percentage: "96.5%",
    image: "https://via.placeholder.com/300?text=Sanya+Verma",
    banner: "https://via.placeholder.com/1200x400?text=Sanya+Verma+Banner",
    testimonial: "The structured courses and guidance helped me achieve my academic goals!",
  },
  {
    name: "Rahul Mishra",
    city: "Kolkata",
    percentage: "95%",
    image: "https://via.placeholder.com/300?text=Rahul+Mishra",
    banner: "https://via.placeholder.com/1200x400?text=Rahul+Mishra+Banner",
    testimonial: "I owe my success to the excellent faculty and personalized attention I received.",
  },
  {
    name: "Meera Nair",
    city: "Chennai",
    percentage: "94.8%",
    image: "https://via.placeholder.com/300?text=Meera+Nair",
    banner: "https://via.placeholder.com/1200x400?text=Meera+Nair+Banner",
    testimonial: "The regular tests and insightful feedback were game changers for me.",
  },
];

const ToppersSlideshow = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="max-w-4xl mx-auto my-8 p-5">
      <h2 className="text-center text-3xl font-bold text-blue-700 mb-5">🏆 Our Proud Toppers 🏆</h2>
      <Slider {...settings}>
        {toppersList.map((topper, index) => (
          <div
            key={index}
            className="relative flex justify-center items-center h-[400px] md:h-[450px] rounded-lg overflow-hidden shadow-xl"
          >
            <img
              src={topper.banner}
              alt={`${topper.name}'s Banner`}
              className="absolute inset-0 w-full h-full object-cover opacity-80"
            />
            <div className="relative flex flex-col items-center p-8 text-white bg-black bg-opacity-50 rounded-lg">
              <img
                src={topper.image}
                alt={topper.name}
                className="w-32 h-32 rounded-full border-4 border-yellow-400 mb-4"
              />
              <h3 className="text-2xl font-semibold">{topper.name}</h3>
              <p className="text-lg">{topper.city}</p>
              <p className="mt-2 text-yellow-300 text-lg">Score: {topper.percentage}</p>
              <p className="mt-4 italic text-center px-4 text-blue-200">"{topper.testimonial}"</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ToppersSlideshow;
