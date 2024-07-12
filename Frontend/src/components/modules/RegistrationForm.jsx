import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { TextField, Select, MenuItem, InputLabel, FormControl, Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { APIBASEURL } from '../../config';
import 'bootstrap/dist/css/bootstrap.min.css';
import './RegistrationForm.css'; // Import the CSS file

const RegistrationForm = () => {
  const [role, setRole] = useState('employee');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    companyName: '',
    bio: '',
    institutionName: '',
    startYear: '',
    endYear: '',
    skills: '',
    resume: null,
    profilePic: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataCopy = { ...formData };
    const formDataToSend = new FormData();
    for (const key in formDataCopy) {
      formDataToSend.append(key, formDataCopy[key]);
    }

    try {
      const response = await axios.post(`${APIBASEURL}/${role}/register`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',


        },
      });

      localStorage.setItem('user', JSON.stringify(response.data.user));

      if (role === 'recruiter') {
        navigate('/recruiterhome');
      } else if (role === 'employee') {
        navigate('/employeehome');
      }
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <Container fluid className="registration-container">
      <Box className="registration-box" >
        <Typography variant="h4" component="h1" gutterBottom className="title">
          Registration Form
        </Typography>
        <Form onSubmit={handleSubmit}>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Role</InputLabel>
            <Select value={role} onChange={handleRoleChange} label="Role">
              <MenuItem value="employee">Employee</MenuItem>
              <MenuItem value="recruiter">Recruiter</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            sx={{ mb: 3 }}
            InputProps={{ className: 'icon user-icon' }}
          />
          <Row className="mb-3">
          <Col>
          <TextField
            fullWidth
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            sx={{ mb: 3 }}
            InputProps={{ className: 'icon envelope-icon' }}
          />
          </Col>
          <Col>
          <TextField
            fullWidth
            label="Phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            sx={{ mb: 3 }}
            InputProps={{ className: 'icon phone-icon' }}
          />
          </Col>
          </Row>
          <TextField
            fullWidth
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            sx={{ mb: 3 }}
            InputProps={{ className: 'icon lock-icon' }}
          />
          {role === 'recruiter' && (
            <>
              <TextField
                fullWidth
                label="Company Name"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                required
                sx={{ mb: 3 }}
                InputProps={{ className: 'icon building-icon' }}
              />
              <TextField
                fullWidth
                label="Bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                multiline
                rows={4}
                required
                sx={{ mb: 3 }}
                InputProps={{ className: 'icon book-icon' }}
              />
            </>
          )}

          {role === 'employee' && (
            <>
              <TextField
                fullWidth
                label="Institution Name"
                name="institutionName"
                value={formData.institutionName}
                onChange={handleChange}
                required
                sx={{ mb: 3 }}
                InputProps={{ className: 'icon book-icon' }}
              />
              <Row className="mb-3">
                <Col>
                  <TextField
                    fullWidth
                    label="Start Year"
                    type="number"
                    name="startYear"
                    value={formData.startYear}
                    onChange={handleChange}
                    required
                    InputProps={{ className: 'icon calendar-icon' }}
                  />
                </Col>
                <Col>
                  <TextField
                    fullWidth
                    label="End Year"
                    type="number"
                    name="endYear"
                    value={formData.endYear}
                    onChange={handleChange}
                    required
                    InputProps={{ className: 'icon calendar-icon' }}
                  />
                </Col>
              </Row>
              <TextField
                fullWidth
                label="Skills"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                required
                sx={{ mb: 3 }}
                InputProps={{ className: 'icon wrench-icon' }}
              />
              <div className="mb-3">
                <label htmlFor="resume" className="form-label">
                  <span className="icon upload-icon"></span> Upload Resume (PDF):
                </label>
                <input
                  type="file"
                  id="resume"
                  name="resume"
                  accept="application/pdf"
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="profilePic" className="form-label">
                  <span className="icon upload-icon"></span> Upload Profile Picture:
                </label>
                <input
                  type="file"
                  id="profilePic"
                  name="profilePic"
                  accept="image/*"
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </div>
            </>
          )}

          <Button variant="contained" color="primary" type="submit" fullWidth>
            Register
          </Button>
        </Form>
      </Box>
    </Container>
  );
};

export default RegistrationForm;
