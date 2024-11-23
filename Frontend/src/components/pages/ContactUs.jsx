import React, { useState } from 'react';
import axios from 'axios';
import { APIBASEURL } from '../../config';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${APIBASEURL}/contact/contact`, formData);
      setSuccess('Message sent successfully!');
      setError(null);
    } catch (err) {
      setError('Error sending message.');
      setSuccess(null);
    }
  };

  return (
    <div className=" p-12">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Contact Us</h2>
        <p className="text-lg text-gray-600 mb-8">Have a question or want to get in touch? Send us a message below!</p>
      </div>

      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
            <p className="text-sm text-gray-500 mt-2">We'll never share your email with anyone else.</p>
          </div>

          <div className="mb-6">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Enter your message"
              rows="4"
              className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <button type="submit" className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            Submit
          </button>

          {success && <p className="mt-4 text-green-600">{success}</p>}
          {error && <p className="mt-4 text-red-600">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
