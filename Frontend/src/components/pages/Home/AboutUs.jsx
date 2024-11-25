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
    <section className="py-16 flex flex-col md:flex-row items-center justify-center min-h-screen text-white">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="animate__animated animate__fadeInDown text-center mb-16">
          <h2 className="text-6xl font-bold text-yellow-400 mb-6">About Us</h2>
          <p className="text-xl text-gray-300">
            At <span className="text-yellow-500 font-semibold">CareerVista</span>, we're passionate about transforming careers and creating opportunities.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="animate__animated animate__fadeInLeft space-y-6">
            <h3 className="text-4xl font-semibold mb-6">Revolutionizing Career Opportunities</h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              We leverage cutting-edge technology and industry expertise to connect talented individuals with their dream careers. Our platform provides:
            </p>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center">
                <span className="text-yellow-400 mr-2">✓</span> Personalized job matching
              </li>
              <li className="flex items-center">
                <span className="text-yellow-400 mr-2">✓</span> Skill development resources
              </li>
              <li className="flex items-center">
                <span className="text-yellow-400 mr-2">✓</span> Career guidance
              </li>
            </ul>
            <button className="mt-6 bg-yellow-400 hover:bg-yellow-500  font-bold py-3 px-8 rounded-full transition-all duration-300">
              Get Started
            </button>
          </div>

          <div className="animate__animated animate__fadeInRight grid grid-cols-2 gap-8">
            {teamMembers.map((member) => (
              <div 
                key={member.id} 
                className="bg-black bg-opacity-50 rounded-xl p-6 shadow-xl hover:transform hover:scale-105 transition-all duration-300"
              >
                <img 
                  src={member.image} 
                  alt={`${member.name}'s profile`} 
                  className="w-32 h-32 mx-auto rounded-full shadow-lg border-4 border-yellow-400"
                />
                <h4 className="text-2xl font-semibold mt-4">{member.name}</h4>
                <p className="text-gray-300">{member.nickname}</p>
                <p className="text-yellow-400 font-medium">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;