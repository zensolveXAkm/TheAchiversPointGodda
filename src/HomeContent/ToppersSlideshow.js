import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase"; // Make sure this path is correct
import "./ToppersSlideshow.css"; // Custom styles for slideshow

const ToppersSlideshow = () => {
  const [toppersList, setToppersList] = useState([]);

  useEffect(() => {
    const fetchToppers = async () => {
      try {
        const toppersSnapshot = await getDocs(collection(db, "toppers"));
        const toppersData = toppersSnapshot.docs.map(doc => doc.data());
        setToppersList(toppersData);
      } catch (error) {
        console.error("Error fetching toppers data:", error);
      }
    };

    fetchToppers();
  }, []);

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
    <div className="max-w-5xl mx-auto my-12 px-5">
      <h2 className="text-center text-4xl font-extrabold text-blue-600 mb-8">🏆 Our Proud Toppers 🏆</h2>
      <Slider {...settings}>
        {toppersList.map((topper, index) => (
          <div
            key={index}
            className="relative flex justify-center items-center h-[450px] md:h-[500px] rounded-lg overflow-hidden shadow-2xl transition-transform transform hover:scale-105"
          >
            <img
              src="/topperbg.png"
              alt={`${topper.name}'s Banner`}
              className="absolute inset-0 w-full h-full object-cover opacity-90 transition-opacity duration-500 hover:opacity-100"
            />
            <div className="relative flex flex-col items-center p-8 text-white rounded-lg shadow-lg">
              <img
                src={topper.imageUrl}
                alt={topper.name}
                className="w-32 h-32 rounded-full border-4 border-yellow-400 mb-4 shadow-lg"
              />
              <h3 className="text-3xl font-semibold text-yellow-400">{topper.name}</h3>
              <p className="text-xl text-gray-300">{topper.city}</p>
              <p className="mt-2 text-yellow-500 text-xl font-bold">Score: {topper.percentage}</p>
              <p className="mt-4 italic text-center px-4 text-blue-200 text-lg">"{topper.testimonial}"</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ToppersSlideshow;
