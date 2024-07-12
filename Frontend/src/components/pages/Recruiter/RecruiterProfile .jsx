import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { TextField, Box, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
// import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './RecruiterProfile.css';

const APIBASEURL = 'http://localhost:5000/api'; // Update with your actual API base URL

const RecruiterProfile = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    companyName: '',
    bio: '',
  });

  // const navigate = useNavigate();

  useEffect(() => {
    fetchRecruiterProfile();
  }, []);

  const fetchRecruiterProfile = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    try {
      const response = await axios.get(`${APIBASEURL}/recruiter/profile/${user._id}`);
      setFormData(response.data);
    } catch (error) {
      console.error('Error fetching recruiter profile:', error.message);
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
    try {
      const response = await axios.put(`${APIBASEURL}/recruiter/profile${user._id}`, formData, {
       
      });
      console.log('Recruiter profile updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating recruiter profile:', error.message);
    }
  };

  return (
    <Container fluid className="recruiter-profile-container">
      <Box className="recruiter-profile-box">
        <Typography variant="h4" component="h1" gutterBottom className="title">
          Recruiter Profile
        </Typography>
        <Form className="profile-details-form" onSubmit={handleSubmit}>
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
                InputLabelProps={{ style: { fontWeight: 'bold' } }}
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
                InputLabelProps={{ style: { fontWeight: 'bold' } }}
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
                InputLabelProps={{ style: { fontWeight: 'bold' } }}
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
                InputLabelProps={{ style: { fontWeight: 'bold' } }}
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
            InputLabelProps={{ style: { fontWeight: 'bold' } }}
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
