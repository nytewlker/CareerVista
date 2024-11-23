import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { APIBASEURL } from '../../../config';
import 'bootstrap/dist/css/bootstrap.min.css';

function AdminRegister() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${APIBASEURL}/admin/register`, formData);
      navigate('/dashboard');
      alert('Registration successful');
    } catch (error) {
      alert('Error during registration');
    }
    navigate('/dashboard')
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
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

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
                Register
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
            <p className="justify-content text-center">
              Already have an account? <Link to="/adminlogin">Login</Link>
            </p>
          </Container>
          );
}

          export default AdminRegister;
