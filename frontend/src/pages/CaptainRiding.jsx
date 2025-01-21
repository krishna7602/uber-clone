import React from "react";
import { Link } from "react-router-dom";

const CaptainRiding = () => {
  return (
    <div className="h-screen">
      {/* Header Section */}
      <div className="fixed p-6 top-0 flex items-center justify-between w-screen">
        <img
          className="w-12 sm:w-16 md:w-20"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Uber Logo"
        />
        <Link
          to="/captain/login"
          className="h-10 w-10 bg-white flex items-center justify-center rounded-full shadow-md"
        >
          <i className="text-lg font-semibold ri-logout-circle-line"></i>
        </Link>
      </div>

      {/* Image Section */}
      <div className="h-4/5">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="Background"
        />
      </div>

      {/* Footer Section */}
      <div className="h-1/5 p-6 flex flex-col gap-3 sm:flex-row items-center justify-between bg-yellow-300">
        <h4 className="text-lg sm:text-xl font-medium">4 KM</h4>
        <i className="ri-arrow-up-s-line text-3xl sm:text-4xl text-gray-800"></i>
        <Link to='/captain/home' className="w-full block text-center sm:w-auto mt-2 py-3 px-6 bg-black text-white rounded-lg hover:bg-gray-800 transition-all">
          Complete Ride
        </Link>
      </div>
    </div>
  );
};

export default CaptainRiding;
