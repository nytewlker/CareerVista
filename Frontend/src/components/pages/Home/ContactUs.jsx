import React, { useState } from "react";
import axios from "axios";
import { APIBASEURL } from "../../../config";

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", message: "" });
  const [feedback, setFeedback] = useState(null);

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
    <section className="min-h-screen py-16 flex flex-col items-center">
      <div className=" max-w-7xl mx-4 p-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-yellow-400 mb-6">Get in Touch</h2>
          <p className="text-xl text-gray-300">Ready to take the next step? We're here to help!</p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          <div className=" p-6 space-y-6">
            <h3 className="text-2xl font-bold ">Contact Info</h3>
            {[
              ["📍", "123 Career Street"],
              ["📞", "+1 234 567 8900"],
              ["✉️", "info@careervista.com"]
            ].map(([icon, text], index) => (
              <p key={index} className="flex items-center space-x-3 text-gray-300">
                <span>{icon}</span>
                <span>{text}</span>
              </p>
            ))}
          </div>

          <div className="md:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {["name", "phone"].map((field) => (
                  <input
                    key={field}
                    type="text"
                    name={field}
                    value={formData[field]}
                    onChange={(e) => setFormData({...formData, [field]: e.target.value})}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20  placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                ))}
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="Email Address"
                className="w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20  placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                placeholder="Your Message"
                rows="5"
                className="w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20  placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <button
                type="submit"
                className="w-full py-4 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-lg transition-colors duration-300"
              >
                Send Message
              </button>
              {feedback && (
                <p className={`text-center ${feedback.type === "success" ? "text-green-400" : "text-red-400"}`}>
                  {feedback.message}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;