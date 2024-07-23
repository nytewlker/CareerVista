import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';

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
      const response = await axios.post('http://localhost:5000/api/admin/login', formData);
      console.log('Response from server:', response); // Log response from server
      alert('Login successful');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error during login:', error); // Log error
      alert('Error during login');
    }
  };

  return (
    <Container className="mt-5">
      <h2>Admin Login</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          Login
        </Button>
      </Form>
      <p className="mt-3">
        Don't have an account? <Link to="/adminregister">Register</Link>
      </p>
    </Container>
  );
}

export default AdminLogin;
