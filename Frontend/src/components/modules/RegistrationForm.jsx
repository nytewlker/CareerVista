import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { TextField, Select, MenuItem, InputLabel, FormControl, Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { APIBASEURL } from '../../config';

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
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <div className="registration-content text-center">
            <h2>Create Account</h2>
            <p className="lead">
              Choose the type of account, Which may poceed!
            </p>
          </div>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <div className="form-conatiainer slidInUp">
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={12}>
                  <FormControl fullWidth className="role-select">
                    <InputLabel>Role</InputLabel>
                    <Select value={role} onChange={handleRoleChange} label="Role">
                      <MenuItem value="employee">Employee</MenuItem>
                      <MenuItem value="recruiter">Recruiter</MenuItem>
                    </Select>
                  </FormControl>
                </Col>
              </Row>
              <Row>
              <Col md={12}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
              </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="input-field"
                  />
                </Col>
                <Col md={6}>
                  <TextField
                    fullWidth
                    label="Phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="input-field"
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
                className="input-field"
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
                    className="input-field"
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
                    className="input-field"
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
                    className="input-field"
                  />

                  <Row className="input-row">
                    <Col>
                      <TextField
                        fullWidth
                        label="Start Year"
                        type="number"
                        name="startYear"
                        value={formData.startYear}
                        onChange={handleChange}
                        required
                        className="input-field"
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
                        className="input-field"
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
                    className="input-field"
                  />
                <Row>
                  <Col md={6}>
                  <div className="file-upload">
                    <label className="file-label">
                      Upload Resume (PDF):
                      <input
                        type="file"
                        name="resume"
                        accept="application/pdf"
                        onChange={handleChange}
                        required
                        className="file-input"
                      />
                    </label>
                  </div>
                  </Col>
                  <Col md={6}>


                  <div className="file-upload">
                    <label className="file-label">
                      Upload Profile Picture:
                      <input
                        type="file"
                        name="profilePic"
                        accept="image/*"
                        onChange={handleChange}
                        required
                        className="file-input"
                      />
                    </label>
                  </div>
                  </Col>
                  </Row>

                </>
              )}

              <Button variant="contained" color="primary" type="submit" fullWidth className="submit-button">
                Register
              </Button>
            </Form>
          </div>
        </Col>
      </Row>

    </Container>
  );
};

export default RegistrationForm;
