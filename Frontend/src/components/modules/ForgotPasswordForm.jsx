import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { APIBASEURL } from '../../config'; // Your API base URL
import { Link } from 'react-router-dom'; // Import Link for navigation

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('employee');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [resetLink, setResetLink] = useState(''); // State for the reset link

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Log the email and role before making the API call
    console.log('Submitting Forgot Password request:', { email, role });

    try {
      const response = await axios.post(`${APIBASEURL}/auth/forgot-password`, { email, role });
      
      // Log the response to see what is returned from the server
      console.log('Response:', response.data);
      
      setMessage(response.data.msg);
      setResetLink(`/reset-password/${role}/${response.data.token}`); // Set the reset link
      setError('');
    } catch (error) {
      // Log the error to debug if something goes wrong
      console.log('Error:', error.response?.data || error);
      
      setError(error.response?.data?.msg || 'An error occurred');
      setMessage('');
    }
  };

  return (
    <Container fluid className="forgot-password-container">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <div className="form-container">
            <h2>Forgot Password</h2>
            <Form onSubmit={handleSubmit}>
              {message && <div className="success-message">{message}</div>}
              {error && <div className="error-message">{error}</div>}
              
              <Form.Group className="mb-3">
                <Form.Label>Select Role</Form.Label>
                <Form.Select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="employee">Employee</option>
                  <option value="recruiter">Recruiter</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100">
                Send Reset Link
              </Button>
            </Form>

            {resetLink && (
              <p className="mt-3">
                <Link to={resetLink}>Click here to reset your password</Link>
              </p>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ForgotPassword;
