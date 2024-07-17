import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { TextField, Typography, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import 'bootstrap/dist/css/bootstrap.min.css';
import { APIBASEURL } from '../../../config/index';

const RecruiterProfile = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    companyName: '',
    bio: '',
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRecruiterProfile();
  }, []);

  const fetchRecruiterProfile = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      setError('User not logged in');
      return;
    }

    try {
      const response = await axios.get(`${APIBASEURL}/recruiter/profile/${user._id}`);
      setFormData(response.data);
    } catch (error) {
      console.error('Error fetching recruiter profile:', error.message);
      setError('Failed to fetch profile data');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      setError('User not logged in');
      return;
    }

    try {
      const response = await axios.put(`${APIBASEURL}/recruiter/profile/${user._id}`, formData);
      console.log('Recruiter profile updated successfully:', response.data);
      setError(null); // Clear error on success
    } catch (error) {
      console.error('Error updating recruiter profile:', error.message);
      setError('Failed to update profile');
    }
  };

  return (
    <Container fluid className="recruiter-profile-container">
      <Box className="recruiter-profile-box">
        <Typography variant="h4" component="h1" gutterBottom className="title">
          Recruiter Profile
        </Typography>
        {error && <p className="error-message">{error}</p>}
        <Form onSubmit={handleSubmit} className="profile-details-form">
          <Row className="mb-3">
            <Col md={6}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                sx={{ mb: 3 }}
                InputProps={{ style: { fontWeight: 'bold' } }}
              />
            </Col>
            <Col md={6}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                sx={{ mb: 3 }}
                InputProps={{ style: { fontWeight: 'bold' } }}
              />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={6}>
              <TextField
                fullWidth
                label="Phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                sx={{ mb: 3 }}
                InputProps={{ style: { fontWeight: 'bold' } }}
              />
            </Col>
            <Col md={6}>
              <TextField
                fullWidth
                label="Company Name"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                required
                sx={{ mb: 3 }}
                InputProps={{ style: { fontWeight: 'bold' } }}
              />
            </Col>
          </Row>
          <TextField
            fullWidth
            label="Bio"
            multiline
            rows={4}
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            required
            sx={{ mb: 3 }}
            InputProps={{ style: { fontWeight: 'bold' } }}
          />
          <Button
            variant="primary"
            className="update-profile-btn"
            type="submit"
            startIcon={<EditIcon />}
          >
            Update Profile
          </Button>
        </Form>
      </Box>
    </Container>
  );
};

export default RecruiterProfile;
