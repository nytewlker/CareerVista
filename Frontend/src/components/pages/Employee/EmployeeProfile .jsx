import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { TextField, Box, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import 'bootstrap/dist/css/bootstrap.min.css';
import { APIBASEURL, DICURL } from '../../../config/index.js';
import './EmployeeProfile.css';

const EmployeeProfile = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    institutionName: '',
    startYear: '',
    endYear: '',
    skills: '',
    resume: null,
    profilePic: null,
  });

  const fetchEmployeeData = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    try {
      const response = await axios.get(`${APIBASEURL}/employee/profile/${user._id}`);
      setFormData(response.data);
    } catch (error) {
      console.error('Error fetching employee data:', error);
    }
  };

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const navigateToUpdateProfile = () => {
    // navigate('/updateEmployeeProfile');
  };

  
  return (
    <Container fluid className="employee-profile-container">
      <Box className="employee-profile-box">
        <Typography variant="h4" component="h1" gutterBottom className="title">
          Employee Profile
        </Typography>
        <Row className="profile-header">
          <Col md={3} className="profile-image-col">
            <img
              src={`${DICURL}/${formData.profilePic}`}
              alt="Profile Pic"
              className="profile-picture"
            />
          </Col>
          <Col md={9} className="profile-info-col">
            <Typography variant="h5" className="profile-name" >
              {formData.name}
            </Typography>
            <Typography variant="body1" className="profile-email">
              {formData.email}
            </Typography>
            <Button
              variant="primary"
              className="update-profile-btn"
              onClick={navigateToUpdateProfile}
              startIcon={<EditIcon />}
            >
              Update Profile
            </Button>
          </Col>
        </Row>
        <Form className="profile-details-form">
          <Row className="mb-3">
            <Col md={6}>
              <TextField
                fullWidth
                label="Phone"
                type="tel"
                name="phone"
                onChange={handleChange}
                value={formData.phone}
                sx={{ mb: 3 }}
                InputLabelProps={{ style: { fontWeight: 'bold' } }}
                InputProps={{ style: { fontWeight: 'bold' } }}
              />
            </Col>
            <Col md={6}>
              <TextField
                fullWidth
                label="Institution Name"
                name="institutionName"
                onChange={handleChange}
                value={formData.institutionName}
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
                label="Start Year"
                type="number"
                name="startYear"
                onChange={handleChange}
                value={formData.startYear}
                InputLabelProps={{ style: { fontWeight: 'bold' } }}
                InputProps={{ style: { fontWeight: 'bold' } }}
              />
            </Col>
            <Col md={6}>
              <TextField
                fullWidth
                label="End Year"
                type="number"
                name="endYear"
                onChange={handleChange}
                value={formData.endYear}
                InputLabelProps={{ style: { fontWeight: 'bold' } }}
                InputProps={{ style: { fontWeight: 'bold' } }}
              />
            </Col>
          </Row>
          <TextField
            fullWidth
            label="Skills"
            name="skills"
            onChange={handleChange}
            value={formData.skills}
            sx={{ mb: 3 }}
            InputLabelProps={{ style: { fontWeight: 'bold' } }}
            InputProps={{ style: { fontWeight: 'bold' } }}
          />
          <div className="mb-3 resume-section">
            <Typography variant="body1" className="resume-title">
              Resume:
            </Typography>
            <a
              className="view-resume"
              href={`${DICURL}/${formData.resume}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Resume
            </a>
          </div>
        </Form>
      </Box>
    </Container>
  );
};

export default EmployeeProfile;
