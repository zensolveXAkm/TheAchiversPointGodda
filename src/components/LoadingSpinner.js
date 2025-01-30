import React from "react";
import HashLoader from "react-spinners/HashLoader";

const LoadingSpinner = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="relative">
        <HashLoader color="#4338CA" size={100} />
        <p className="absolute inset-x-0 top-[190px] text-base font-medium text-gray-800 text-center">
          TAP Education...
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
