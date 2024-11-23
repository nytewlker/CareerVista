import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Box, Typography, IconButton, TextField, Button } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'; // For making HTTP requests

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
    <Box className="footer">
      <Container fluid>
        <Row>
          <Col xs={12} md={4} className="text-center text-md-left mb-3 mb-md-0">
            <Typography variant="h6" component="div">
              CareerVista
            </Typography>
            <Typography variant="body2">
              &copy; 2024 CareerVista. All rights reserved.
            </Typography>
            <Typography variant="body2">
              Your trusted partner in finding your dream job. We connect job seekers with top employers across various industries.
            </Typography>
          </Col>
          <Col xs={12} md={4} className="text-center text-md-left mb-3 mb-md-0">
            <Typography variant="h6" component="div">
              Contact Us
            </Typography>
            <Typography variant="body2">
              Email: support@careervista.com
            </Typography>
            <Typography variant="body2">
              Phone: +1 234 567 890
            </Typography>
            <Typography variant="body2">
              Address: 123 Career St, Job City, USA 
            </Typography>
          </Col>
          <Col xs={12} md={4} className="text-center text-md-left">
            <Typography variant="h6" component="div">
              Subscribe for Job Alerts
            </Typography>
            <form noValidate autoComplete="off" onSubmit={handleSubscribe}>
              <TextField
                label="Email Address"
                variant="outlined"
                size="small"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Button variant="contained" color="primary" fullWidth type="submit">
                Subscribe
              </Button>
              {message && (
                <Typography variant="body2" sx={{ mt: 2 }}>
                  {message}
                </Typography>
              )}
            </form>
            <Typography variant="h6" component="div" sx={{ mt: 2 }}>
              Follow Us
            </Typography>
            <Box className="social-icons">
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
            </Box>
          </Col>
        </Row>
      </Container>
    </Box>
  );
};

export default Footer;
