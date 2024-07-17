import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { APIBASEURL } from '../../config';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './RegistrationForm.css'; // Import the CSS file

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
            <p className="lead">Choose the type of account, Which may proceed!</p>
          </div>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <div className="form-container slideInUp">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Role</Form.Label>
                <Form.Select value={role} onChange={handleRoleChange}>
                  <option value="employee">Employee</option>
                  <option value="recruiter">Recruiter</option>
                </Form.Select>
              </Form.Group>
              
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
              <Row>
                    <Col>
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
              </Col>
                    <Col>
              <Form.Group className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="Enter your phone number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              </Col>
                  </Row>
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

              {role === 'recruiter' && (
                <>
                  <Form.Group className="mb-3">
                    <Form.Label>Company Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your company name"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Bio</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      placeholder="Enter your bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </>
              )}

              {role === 'employee' && (
                <>
                  <Form.Group className="mb-3">
                    <Form.Label>Institution Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your institution name"
                      name="institutionName"
                      value={formData.institutionName}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Row>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>Start Year</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Enter your start year"
                          name="startYear"
                          value={formData.startYear}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>End Year</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Enter your end year"
                          name="endYear"
                          value={formData.endYear}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label>Skills</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your skills"
                      name="skills"
                      value={formData.skills}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Upload Resume (PDF)</Form.Label>
                        <Form.Control
                          type="file"
                          name="resume"
                          accept="application/pdf"
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Upload Profile Picture</Form.Label>
                        <Form.Control
                          type="file"
                          name="profilePic"
                          accept="image/*"
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </>
              )}

              <Button variant="primary" type="submit" className="w-100">
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
