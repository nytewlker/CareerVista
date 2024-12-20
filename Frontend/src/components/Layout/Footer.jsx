import React, { useState } from 'react';
import axios from 'axios';
import { Typography, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/subscribe/subscribe', { email });
      setMessage('Subscription successful!');
      setIsError(false);
      setEmail('');
    } catch (error) {
      setMessage('Subscription failed. Please try again.');
      setIsError(true);
    }
  };

  return (
    <footer className="w-full text-white  bg-black/40 rounded-lg">
      <div className=" mx-4 rounded-xl">
        <div className="container mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold ">CareerVista</h3>
              <p className="text-gray-300 text-sm">
                Your trusted partner in finding your dream job. Connecting job seekers with top employers worldwide.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold ">Contact Us</h3>
              <div className="space-y-2 text-gray-300">
                <p className="flex items-center gap-2">
                  <span>📧</span> support@careervista.com
                </p>
                <p className="flex items-center gap-2">
                  <span>📱</span> +1 234 567 890
                </p>
                <p className="flex items-center gap-2">
                  <span>📍</span> 123 Career St, Job City
                </p>
              </div>
            </div>

            {/* Newsletter */}
            <div className="space-y-4 text-white">
              <h3 className="text-xl font-bold ">Subscribe</h3>
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 text-black rounded-lg bg-white/10 backdrop-blur-sm border border-white/20  placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors"
                >
                  Subscribe
                </button>
              </form>

              {/* Social Links */}
              <div className="pt-4">
                <h3 className="text-xl font-bold  mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  {[
                    { Icon: Facebook, color: "hover:text-blue-500 text-white" },
                    { Icon: Twitter, color: "hover:text-blue-400 text-white" },
                    { Icon: Instagram, color: "hover:text-pink-500 text-white" },
                    { Icon: LinkedIn, color: "hover:text-blue-700 text-white" }
                  ].map(({ Icon, color }, index) => (
                    <IconButton
                      key={index}
                      className={` ${color} transition-colors`}
                    >
                      <Icon />
                    </IconButton>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;