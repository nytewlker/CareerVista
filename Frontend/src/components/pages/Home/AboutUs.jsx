import React from "react";
import 'animate.css';

const teamMembers = [
  { 
    id: 1, 
    name: "Anand Dubey", 
    nickname: "(ADDIE)", 
    role: "Project Leader", 
    image: "/assets/owner.jpg",
  },
  { 
    id: 2, 
    name: "Abhay Kotiya", 
    nickname: "(ABHI)", 
    role: "Frontend Designer", 
    image: "/assets/owner1.jpeg",
  },
];

const AboutUs = () => {
  return (
    <section className="min-h-screen py-16 flex items-center">
      <div className=" max-w-7xl mx-4 p-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-yellow-400 mb-6">About Us</h2>
          <p className="text-xl text-gray-300">
            At <span className="text-yellow-400">CareerVista</span>, we're transforming career journeys
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          <div className="space-y-8">
            <h3 className="text-3xl font-bold ">Our Mission</h3>
            <p className="text-gray-300 text-lg">
              We leverage cutting-edge technology to connect talent with opportunity.
            </p>
            <ul className="space-y-4">
              {["Personalized Matching", "Skill Development", "Career Guidance"].map((item, index) => (
                <li key={index} className="flex items-center space-x-3 text-gray-300">
                  <span className="text-yellow-400 text-xl">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {teamMembers.map((member) => (
              <div key={member.id} className=" p-6 text-center transform hover:scale-105 transition-all">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-32 h-32 mx-auto rounded-full border-4 border-yellow-400"
                />
                <h4 className="text-xl font-bold  mt-4">{member.name}</h4>
                <p className="text-yellow-400">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;