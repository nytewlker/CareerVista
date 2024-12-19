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
    <section className="py-16 px-6 text-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold mb-4">Contact Us</h2>
          <p className="text-lg text-yellow-200">Have questions? We're here to help.</p>
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-6 text-yellow-100">
            <h3 className="text-2xl font-bold">Contact Info</h3>
            {[
              ["📍", "123 Career Street"],
              ["📞", "+1 234 567 8900"],
              ["✉️", "info@careervista.com"]
            ].map(([icon, text], index) => (
              <p key={index} className="flex items-center space-x-3">
                <span>{icon}</span>
                <span>{text}</span>
              </p>
            ))}
          </div>

          {/* Form */}
          <div className="md:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white/40 text-black p-8 rounded-lg shadow-lg space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {["name", "phone"].map((field) => (
                  <input
                    key={field}
                    type="text"
                    name={field}
                    value={formData[field]}
                    onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                ))}
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Email Address"
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Your Message"
                rows="5"
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <button
                type="submit"
                className="w-full py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-lg shadow-md transition duration-300"
              >
                Send Message
              </button>
              {feedback && (
                <p className={`text-center mt-4 ${feedback.type === "success" ? "text-green-500" : "text-red-500"}`}>
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
