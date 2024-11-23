import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
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
    <Container fluid className="py-16 bg-gray-100">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Create Account</h2>
            <p className="text-lg text-gray-500">Choose the type of account to proceed!</p>
          </div>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-4">
                <Form.Label className="text-lg font-medium text-gray-700">Role</Form.Label>
                <Form.Select
                  value={role}
                  onChange={handleRoleChange}
                  className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="employee">Employee</option>
                  <option value="recruiter">Recruiter</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="text-lg font-medium text-gray-700">Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </Form.Group>

              <Row>
                <Col>
                  <Form.Group className="mb-4">
                    <Form.Label className="text-lg font-medium text-gray-700">Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-4">
                    <Form.Label className="text-lg font-medium text-gray-700">Phone</Form.Label>
                    <Form.Control
                      type="tel"
                      placeholder="Enter your phone number"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-4">
                <Form.Label className="text-lg font-medium text-gray-700">Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </Form.Group>

              {role === 'recruiter' && (
                <>
                  <Form.Group className="mb-4">
                    <Form.Label className="text-lg font-medium text-gray-700">Company Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your company name"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      required
                      className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label className="text-lg font-medium text-gray-700">Bio</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      placeholder="Enter your bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      required
                      className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </Form.Group>
                </>
              )}

              {role === 'employee' && (
                <>
                  <Form.Group className="mb-4">
                    <Form.Label className="text-lg font-medium text-gray-700">Institution Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your institution name"
                      name="institutionName"
                      value={formData.institutionName}
                      onChange={handleChange}
                      required
                      className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </Form.Group>

                  <Row>
                    <Col>
                      <Form.Group className="mb-4">
                        <Form.Label className="text-lg font-medium text-gray-700">Start Year</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Enter your start year"
                          name="startYear"
                          value={formData.startYear}
                          onChange={handleChange}
                          required
                          className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="mb-4">
                        <Form.Label className="text-lg font-medium text-gray-700">End Year</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Enter your end year"
                          name="endYear"
                          value={formData.endYear}
                          onChange={handleChange}
                          required
                          className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-4">
                    <Form.Label className="text-lg font-medium text-gray-700">Skills</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your skills"
                      name="skills"
                      value={formData.skills}
                      onChange={handleChange}
                      required
                      className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </Form.Group>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-4">
                        <Form.Label className="text-lg font-medium text-gray-700">Upload Resume (PDF)</Form.Label>
                        <Form.Control
                          type="file"
                          name="resume"
                          accept="application/pdf"
                          onChange={handleChange}
                          required
                          className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-4">
                        <Form.Label className="text-lg font-medium text-gray-700">Upload Profile Picture</Form.Label>
                        <Form.Control
                          type="file"
                          name="profilePic"
                          onChange={handleChange}
                          accept="image/*"
                          required
                          className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </>
              )}

              <Button
                type="submit"
                className="mt-4 w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
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
