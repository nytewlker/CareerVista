import React, { useState } from 'react';
import axios from 'axios';
import { Box, Typography, IconButton, TextField, Button } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/subscribe/subscribe', { email });
      setMessage('Subscription successful!');
      setEmail('');
    } catch (error) {
      setMessage('Subscription failed. Please try again.');
    }
  };

  return (
    <div className="bg-gray-300 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* CareerVista Section */}
          <div className="text-center sm:text-left">
            <Typography variant="h6" className="font-semibold mb-4">CareerVista</Typography>
            <Typography variant="body2" className="mb-2">© 2024 CareerVista. All rights reserved.</Typography>
            <Typography variant="body2" className="text-gray-400">
              Your trusted partner in finding your dream job. We connect job seekers with top employers across various industries.
            </Typography>
          </div>

          {/* Contact Us Section */}
          <div className="text-center sm:text-left">
            <Typography variant="h6" className="font-semibold mb-4">Contact Us</Typography>
            <Typography variant="body2" className="mb-2">Email: support@careervista.com</Typography>
            <Typography variant="body2" className="mb-2">Phone: +1 234 567 890</Typography>
            <Typography variant="body2" className="mb-2">Address: 123 Career St, Job City, USA</Typography>
          </div>

          {/* Subscribe and Social Media Section */}
          <div className="text-center sm:text-left">
            <Typography variant="h6" className="font-semibold mb-4">Subscribe for Job Alerts</Typography>
            <form onSubmit={handleSubscribe}>
              <TextField
                label="Email Address"
                variant="outlined"
                size="small"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mb-4"
              />
              <Button variant="contained" color="primary" fullWidth type="submit">Subscribe</Button>
              {message && <Typography variant="body2" className="mt-4 text-sm">{message}</Typography>}
            </form>
            <Typography variant="h6" className="font-semibold mt-6">Follow Us</Typography>
            <div className="flex justify-center space-x-4 mt-4">
              <IconButton aria-label="facebook" href="https://www.facebook.com" target="_blank">
                <Facebook />
              </IconButton>
              <IconButton aria-label="twitter" href="https://www.twitter.com" target="_blank">
                <Twitter />
              </IconButton>
              <IconButton aria-label="instagram" href="https://www.instagram.com" target="_blank">
                <Instagram />
              </IconButton>
              <IconButton aria-label="linkedin" href="https://www.linkedin.com" target="_blank">
                <LinkedIn />
              </IconButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
