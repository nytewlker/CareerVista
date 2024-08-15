import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { APIBASEURL } from '../../../config';
import 'bootstrap/dist/css/bootstrap.min.css';

function AdminLogin() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate(); // Initialize the navigate function

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData); // Log form data

    try {
      console.log('Sending request to server...');
      const response = await axios.post(`${APIBASEURL}/admin/login`, formData);
      console.log('Response from server:', response); // Log response from server
      navigate('/dashboard');
      alert('Login successful');
    } catch (error) {
      console.error('Error during login:', error); // Log error
      alert('Error during login');
    }
  };

  return (
    <Container fluid className="registration-container">
      <Row className='justify-content-center'>
        <Col md={8} lang={6}>
          <div className='registration-content text-center'>
            <h2>Admin Register</h2>
          </div>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <div className="form-container slideInUp">
            <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                </Form.Group>
        <Button variant="primary" type="submit" className="w-100">
          Login
        </Button>
        </Form>
          </div>
        </Col>
      </Row>
      <p className="justify-content text-center">
        Don't have an account? <Link to="/adminregister">Register</Link>
      </p>
    </Container>
  );
}

export default AdminLogin;
