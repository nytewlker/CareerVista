import React from 'react';
import 'animate.css'; // For fade-in animations

const AboutUs = () => {
  return (
    <div className="about-section fade-in py-12 bg-gray-50">
      {/* About Us Heading */}
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-800 animate__animated animate__fadeInUp">
          About Us
        </h2>
        <p className="mt-4 text-lg text-gray-600 animate__animated animate__fadeInUp">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla convallis
          consequat lacus, eu fermentum nisi aliquam sit amet. Sed mollis ultricies
          nisi eget iaculis. Curabitur quis ligula ac magna accumsan lacinia vel a sem.
        </p>
      </div>

      {/* Team Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {/* Team Member 1 */}
        <div className="text-center animate__animated animate__fadeInLeft">
          <img
            src={`${process.env.PUBLIC_URL}/assets/owner.jpg`}
            alt="Anand Dubey"
            className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
          />
          <h4 className="text-xl font-semibold text-gray-800">Anand Dubey</h4>
          <h6 className="text-md text-gray-500">(ADDIE)</h6>
          <p className="text-gray-600">Project Leader</p>
        </div>
        {/* Team Member 2 */}
        <div className="text-center animate__animated animate__fadeInRight">
          <img
            src={`${process.env.PUBLIC_URL}/assets/owner1.jpeg`}
            alt="Abhay Kotiya"
            className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
          />
          <h4 className="text-xl font-semibold text-gray-800">Abhay Kotiya</h4>
          <h6 className="text-md text-gray-500">(abhi)</h6>
          <p className="text-gray-600">Frontend Designer</p>
        </div>
        {/* Team Member 3 */}
        <div className="text-center animate__animated animate__fadeInLeft">
          <img
            src={`${process.env.PUBLIC_URL}/assets/owner.jpg`}
            alt="Anand Dubey"
            className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
          />
          <h4 className="text-xl font-semibold text-gray-800">Anand Dubey</h4>
          <h6 className="text-md text-gray-500">(ADDIE)</h6>
          <p className="text-gray-600">Project Manager</p>
        </div>
        {/* Team Member 4 */}
        <div className="text-center animate__animated animate__fadeInRight">
          <img
            src={`${process.env.PUBLIC_URL}/assets/owner.jpg`}
            alt="Anand Dubey"
            className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
          />
          <h4 className="text-xl font-semibold text-gray-800">Anand Dubey</h4>
          <h6 className="text-md text-gray-500">(ADDIE)</h6>
          <p className="text-gray-600">Lead Developer</p>
        </div>
        {/* Team Member 5 */}
        <div className="text-center animate__animated animate__fadeInRight">
          <img
            src={`${process.env.PUBLIC_URL}/assets/owner.jpg`}
            alt="Anand Dubey"
            className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
          />
          <h4 className="text-xl font-semibold text-gray-800">Anand Dubey</h4>
          <h6 className="text-md text-gray-500">(ADDIE)</h6>
          <p className="text-gray-600">Marketing Head</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
