import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { TextField, Typography, Avatar } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import 'bootstrap/dist/css/bootstrap.min.css';
import { APIBASEURL, DICURL } from '../../../config/index.js';

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

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  const fetchEmployeeData = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    try {
      const response = await axios.get(`${APIBASEURL}/employee/profile/${user._id}`);
      setFormData(response.data);
    } catch (error) {
      console.error('Error fetching employee data:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));
    const form = new FormData();
    Object.keys(formData).forEach(key => {
      form.append(key, formData[key]);
    });
    try {
      const response = await axios.put(`${APIBASEURL}/employee/profile/${user._id}`, form, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log('Employee profile updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating employee profile:', error);
    }
  };

  return (
    <Container fluid className="employee-profile-container">
      <div className="profile-box">
        <Typography variant="h4" component="h1" gutterBottom className="title">
          Employee Profile
        </Typography>
        <Row className="profile-header">
          <Col md={3} className="profile-image-col">
            <Avatar
              src={`${DICURL}/${formData.profilePic}`}
              alt="Profile Pic"
              className="profile-picture"
              sx={{ width: 150, height: 150 }}
            />
          </Col>
          <Col md={9} className="profile-info-col">
            <Typography variant="h5" className="profile-name">
              {formData.name}
            </Typography>
            <Typography variant="body1" className="profile-email">
              {formData.email}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              className="update-profile-btn"
              onClick={handleSubmit}
              startIcon={<EditIcon />}
            >
              Update Profile
            </Button>
          </Col>
        </Row>
        <Form onSubmit={handleSubmit} className="profile-details-form">
          <Row className="mb-3">
            <Col md={6}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                onChange={handleChange}
                value={formData.name}
                sx={{ mb: 3 }}
                InputProps={{ style: { fontWeight: 'bold' } }}
              />
            </Col>
            <Col md={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                onChange={handleChange}
                value={formData.email}
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
                onChange={handleChange}
                value={formData.phone}
                sx={{ mb: 3 }}
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
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Profile Picture</Form.Label>
                <Form.Control
                  type="file"
                  name="profilePic"
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Resume</Form.Label>
                <Form.Control
                  type="file"
                  name="resume"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx"
                />
              </Form.Group>
            </Col>
          </Row>
          <Button
            variant="primary"
            className="update-profile-btn"
            type="submit"
            startIcon={<EditIcon />}
            w-100
          >
            Update Profile
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default EmployeeProfile;
