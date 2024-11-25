import React, { useState } from "react";
import axios from "axios";
import { APIBASEURL } from "../../../config";

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", message: "" });
  const [feedback, setFeedback] = useState(null);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${APIBASEURL}/contact/contact`, formData);
      setFeedback({ type: "success", message: "Message sent successfully!" });
      setFormData({ name: "", phone: "", email: "", message: "" });
    } catch (error) {
      setFeedback({ type: "error", message: "Error sending message." });
    }
  };

  return (
    <section className="py-16 text-white min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-5xl font-bold text-yellow-400 mb-6">Get in Touch</h2>
          <p className="text-xl text-gray-300">Ready to take the next step in your career? We're here to help!</p>
        </div>
        
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-12">
          {/* Contact Information */}
          <div className="lg:w-1/3 space-y-8">
            <div className="bg-black bg-opacity-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-2xl font-semibold text-yellow-400 mb-4">Contact Info</h3>
              <div className="space-y-4 text-gray-300">
                <p className="flex items-center gap-3">
                  <span >📍</span> 123 Career Street, Tech Valley
                </p>
                <p className="flex items-center gap-3">
                  <span >📞</span> +1 234 567 8900
                </p>
                <p className="flex items-center gap-3">
                  <span >✉️</span> info@careervista.com
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:w-2/3">
            <div className="bg-black bg-opacity-50 p-8 rounded-xl shadow-lg">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="w-full px-4 py-3 text-black  rounded-lg "
                    required
                  />
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className="w-full px-4 py-3 text-black rounded-lg"
                    required
                  />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="w-full px-4 py-3 text-black rounded-lg"
                  required
                />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  rows="5"
                  className="w-full px-4 py-3 text-black rounded-lg"
                  required
                ></textarea>
                <button
                  type="submit"
                  className="w-full py-4 bg-yellow-500 hover:bg-yellow-600 rounded-lg shadow-md text-lg font-semibold transition-colors"
                >
                  Send Message
                </button>
                {feedback && (
                  <p
                    className={`mt-4 text-center ${
                      feedback.type === "success" ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {feedback.message}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;