import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'; // React Icons
import axios from 'axios';
import { APIBASEURL } from '../../config';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${APIBASEURL}/subscribe/subscribe`, { email });
      setMessage('Subscription successful!');
      setEmail('');
    } catch (error) {
      setMessage('Subscription failed. Please try again.');
    }
  };

  return (
    <footer className="footer bg-gray text-light py-4">
      <Container>
        <Row>
          {/* About Section */}
          <Col xs={12} md={4} className="mb-3 mb-md-0">
            <h5>CareerVista</h5>
            <p>&copy; 2024 CareerVista. All rights reserved.</p>
            <p>Your trusted partner in finding your dream job. We connect job seekers with top employers across various industries.</p>
          </Col>

          {/* Contact Section */}
          <Col xs={12} md={4} className="mb-3 mb-md-0">
            <h5>Contact Us</h5>
            <p>Email: <a href="mailto:support@careervista.com" className="text-light">support@careervista.com</a></p>
            <p>Phone: +1 234 567 890</p>
            <p>Address: 123 Career St, Job City, USA</p>
          </Col>

          {/* Subscribe Section */}
          <Col xs={12} md={4}>
            <h5>Subscribe for Job Alerts</h5>
            <Form onSubmit={handleSubscribe}>
              <Form.Group className="mb-2">
                <Form.Control
                  className='bg-transparent'
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100">Subscribe</Button>
              {message && <small className="d-block mt-2 text-warning">{message}</small>}
            </Form>

            <h5 className="mt-4">Follow Us</h5>
            <div className="d-flex justify-content-start">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-light me-3">
                <FaFacebook size={24} />
              </a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-light me-3">
                <FaTwitter size={24} />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-light me-3">
                <FaInstagram size={24} />
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-light">
                <FaLinkedin size={24} />
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
