import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap'; 
import { APIBASEURL } from '../../config'; // Your API base URL


const ResetPasswordForm = () => {
  const { token, role } = useParams(); // Get token and role from URL
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${APIBASEURL}/auth/reset-password/${role}/${token}`, { password });
      setMessage(response.data.msg);
      setError('');
    } catch (err) {
      setError(err.response?.data?.msg || 'An error occurred');
      setMessage('');
    }
  };

  return (
    <Container fluid className="reset-password-container">
      <Row className="justify-content-center">
        <Col md={6} lg={4}>
          <div className="form-container shadow-sm p-4 mt-5 bg-white rounded">
            <h2 className="text-center mb-4">Reset Password</h2>
            <Form onSubmit={handleSubmit}>
              {message && <Alert variant="success">{message}</Alert>}
              {error && <Alert variant="danger">{error}</Alert>}
              
              <Form.Group className="mb-3">
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
              
              <Button variant="primary" type="submit" className="w-100">
                Reset Password
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ResetPasswordForm;
