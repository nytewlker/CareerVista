import React from "react";

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
    <section className="py-16 px-6 min-h-screen  text-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold mb-4">About Us</h2>
          <p className="text-lg text-yellow-200">
            Transforming career journeys with <span className="text-yellow-400">CareerVista</span>.
          </p>
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* Mission */}
          <div className="space-y-6">
            <h3 className="text-3xl font-bold">Our Mission</h3>
            <p className="text-yellow-100">
              Leveraging cutting-edge technology to connect talent with opportunities.
            </p>
            <ul className="space-y-4">
              {["Personalized Matching", "Skill Development", "Career Guidance"].map((item, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <span className="text-yellow-400 text-xl">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Team */}
          <div className="grid grid-cols-2 gap-6">
            {teamMembers.map((member) => (
              <div key={member.id} className="bg-black/50 p-6 text-center rounded-lg shadow-md">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-24 h-24 mx-auto rounded-full border-4 border-yellow-400"
                />
                <h4 className="text-lg font-bold mt-4">{member.name}</h4>
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
