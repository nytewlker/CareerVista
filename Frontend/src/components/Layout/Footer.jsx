import React, { useState } from 'react';
import axios from 'axios';
import { Typography, IconButton, TextField } from '@mui/material';
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
    <footer className=" relative   w-full  flex items-center justify-between bg-opacity-50  backdrop-blur-sm py-8 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* CareerVista Section */}
          <div>
            <Typography className="text-xl font-bold">CareerVista</Typography>
            <Typography className="text-sm mt-2">
              © 2024 CareerVista. All rights reserved.
            </Typography>
            <Typography className="text-sm mt-1">
              Your trusted partner in finding your dream job. Connecting job seekers with top employers worldwide.
            </Typography>
          </div>

          {/* Contact Us Section */}
          <div>
            <Typography className="text-lg font-bold">Contact Us</Typography>
            <ul className="text-sm mt-2 space-y-1">
              <li className="flex items-center space-x-2">
                <span>📧</span> <span>support@careervista.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <span>📱</span> <span>+1 234 567 890</span>
              </li>
              <li className="flex items-center space-x-2">
                <span>📍</span> <span>123 Career St, Job City, USA</span>
              </li>
            </ul>
          </div>

          {/* Subscribe and Social Media Section */}
          <div>
            <Typography className="text-lg font-bold">Subscribe for Job Alerts</Typography>
            <form onSubmit={handleSubscribe} className="mt-3">
              <TextField
                label="Email Address"
                size="small"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded"
              />
               <button
                  type="submit"
                  className="w-full mt-1  bg-yellow-500 hover:bg-yellow-600 rounded shadow-md text-lg font-semibold transition-colors"
                >
                  Suscribe 
                </button>
              {message && (
                <Typography
                  className={`text-sm mt-2 ${isError ? 'text-red-500' : 'text-green-500'}`}
                >
                  {message}
                </Typography>
              )}
            </form>

            <Typography className="text-lg font-bold mt-6">Follow Us</Typography>
            <div className="flex space-x-3 mt-3">
              <IconButton
                size="small"
                href="https://www.facebook.com"
                target="_blank"
                className="text-gray-400 hover:text-blue-500"
                aria-label="Facebook"
              >
                <Facebook />
              </IconButton>
              <IconButton
                size="small"
                href="https://www.twitter.com"
                target="_blank"
                className="text-gray-400 hover:text-blue-400"
                aria-label="Twitter"
              >
                <Twitter />
              </IconButton>
              <IconButton
                size="small"
                href="https://www.instagram.com"
                target="_blank"
                className="text-gray-400 hover:text-pink-500"
                aria-label="Instagram"
              >
                <Instagram />
              </IconButton>
              <IconButton
                size="small"
                href="https://www.linkedin.com"
                target="_blank"
                className="text-gray-400 hover:text-blue-700"
                aria-label="LinkedIn"
              >
                <LinkedIn />
              </IconButton>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
