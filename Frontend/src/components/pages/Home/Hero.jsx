import React from "react";
import Login from "../../modules/LoginForm";

const Hero = () => {
  return (
    <div className="py-16 flex flex-col-reverse md:flex-row items-center justify-between text-white min-h-screen px-8">
      {/* Left Content */}
      <div className="md:w-2/3 flex flex-col items-center md:items-start text-center md:text-left">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
          Welcome to <span className="text-yellow-400">CareerVista</span>
        </h1>
        <p className="text-lg md:text-xl text-yellow-200 mb-8">
          Empowering your career journey with tailored opportunities and seamless job applications.
        </p>
        <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-4 rounded-full text-lg font-semibold shadow-lg transition duration-300">
          Discover Opportunities
        </button>
      </div>

      {/* Right Login Form */}
      <div className="md:w-1/3">
        <Login />
      </div>
    </div>
  );
};

export default Hero;
