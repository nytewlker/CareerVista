import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { APIBASEURL, DICURL } from "../../../config";

const EmployeeProfile = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    institutionName: "",
    startYear: "",
    endYear: "",
    skills: "",
    resume: null,
    profilePic: null,
  });

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  const fetchEmployeeData = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    try {
      const response = await axios.get(`${APIBASEURL}/employee/profile/${user._id}`);
      setFormData(response.data);
    } catch (error) {
      console.error("Error fetching employee data:", error);
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
    const user = JSON.parse(localStorage.getItem("user"));
    const form = new FormData();
    Object.keys(formData).forEach((key) => {
      form.append(key, formData[key]);
    });

    try {
      await axios.put(`${APIBASEURL}/employee/profile/${user._id}`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("Employee profile updated successfully!");
    } catch (error) {
      console.error("Error updating employee profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  return (
    <Container className="employee-profile-container py-4">
      <h2 className="text-center mb-4">Employee Profile</h2>
      <Row className="mb-4 align-items-center">
        <Col md={3} className="text-center">
          <img
            src={`${DICURL}/${formData.profilePic}`}
            alt="Profile Pic"
            className="rounded-circle img-fluid"
            style={{ width: "150px", height: "150px", objectFit: "cover" }}
          />
        </Col>
        <Col md={9}>
          <h4>{formData.name}</h4>
          <p>{formData.email}</p>
          <Button variant="primary" onClick={handleSubmit}>
            Update Profile
          </Button>
        </Col>
      </Row>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="phone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="institutionName">
              <Form.Label>Institution Name</Form.Label>
              <Form.Control
                type="text"
                name="institutionName"
                value={formData.institutionName}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="startYear">
              <Form.Label>Start Year</Form.Label>
              <Form.Control
                type="number"
                name="startYear"
                value={formData.startYear}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="endYear">
              <Form.Label>End Year</Form.Label>
              <Form.Control
                type="number"
                name="endYear"
                value={formData.endYear}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="skills" className="mb-3">
          <Form.Label>Skills</Form.Label>
          <Form.Control
            type="text"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="profilePic">
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
            <Form.Group controlId="resume">
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
        <div className="mb-3">
          <strong>Resume:</strong>{" "}
          <a
            href={`${DICURL}/${formData.resume}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Resume
          </a>
        </div>
        <Button variant="primary" type="submit" className="w-100">
          Save Changes
        </Button>
      </Form>
    </Container>
  );
};

export default EmployeeProfile;
