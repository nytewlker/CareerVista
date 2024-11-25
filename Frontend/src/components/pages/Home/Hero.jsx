import React from "react";
import Login from "../../modules/LoginForm";

const Hero = () => {
  return (
    <div className="py-8 flex flex-col md:flex-row items-center justify-center min-h-screen">
      {/* Left Content */}
      <div className="md:w-2/3 flex flex-col items-center md:items-start md:text-left text-center">
        <h1 className="text-4xl  text-white md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
          Welcome to <span className="text-yellow-400">Creervista</span>
        </h1>
        <p className="text-base md:text-lg lg:text-xl text-gray-300 mb-8">
          Empowering your career journey with tailored opportunities and seamless job applications.
        </p>
        <button className="bg-yellow-500 hover:bg-yellow-600  px-8 py-4 rounded-full text-lg shadow-lg">
          Discover Your Next Opportunity
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
