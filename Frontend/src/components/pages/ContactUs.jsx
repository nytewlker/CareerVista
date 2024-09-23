// ContactUs.jsx
import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
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
    <Container fluid className="contact-container">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <div className="contact-content text-center">
            <h2>Contact Us</h2>
            <p className="lead">
              Have a question or want to get in touch? Send us a message below!
            </p>
          </div>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <div className="form-container slideInUp">
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="formBasicName" className="mb-3">
                    <Form.Label>Your Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formBasicPhone" className="mb-3">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="phone"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <Form.Group controlId="formBasicEmail" className="mb-3">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <Form.Group controlId="formBasicMessage" className="mb-4">
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      name="message"
                      placeholder="Enter your message"
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Button variant="custom" type="submit" className="w-100">
                Submit
              </Button>
              {success && <p className="text-success mt-3">{success}</p>}
              {error && <p className="text-danger mt-3">{error}</p>}
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactUs;
