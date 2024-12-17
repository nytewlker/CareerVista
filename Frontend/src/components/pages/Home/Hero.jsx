import React from "react";
import Login from "../../modules/LoginForm";

const Hero = () => {
  return (
    <div className="min-h-screen flex items-center justify-center py-16">
      <div className=" w-full max-w-7xl mx-4 p-8 grid md:grid-cols-2 gap-12">
        <div className="flex flex-col justify-center space-y-8">
          <h1 className="text-5xl md:text-6xl font-bold ">
            Welcome to <span className="text-yellow-400">CareerVista</span>
          </h1>
          <p className="text-xl text-gray-300">
            Empowering your career journey with tailored opportunities and seamless job applications.
          </p>
          <button className="w-fit px-8 py-4 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-xl transition-colors duration-300 transform hover:scale-105">
            Discover Opportunities
          </button>
        </div>
        <div className="flex items-center justify-center">
          <Login />
        </div>
      </div>
    </div>
  );
};

export default Hero;