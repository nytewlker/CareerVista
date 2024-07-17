import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { APIBASEURL } from "../../../config/index.js";

const AddJobs = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    jobType: "",
    salary: "",
    experience: ""
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));

    try {
      const response = await axios.post(`${APIBASEURL}/job`, {
        ...formData,
        recruiterId: user._id,
        company: user.companyName
      });
      alert("Job posted successfully!", response.data);

      // Optionally reset form
      setFormData({ title: "", description: "", location: "", jobType: "", salary: "", experience: "" });
      navigate("/recruiterHome"); // Navigate to recruiter home after successful submission
    } catch (error) {
      console.error("Error posting job:", error);
    }
  };

  return (
    <Container className="add-jobs-container">
      <h4 className="text-center add-jobs-title">Post a Job</h4>
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col xs={12} sm={6}>
                <Form.Group controlId="jobTitle">
                  <Form.Label>Job Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col xs={12} sm={6}>
                <Form.Group controlId="jobLocation">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col xs={12}>
                <Form.Group controlId="jobDescription">
                  <Form.Label>Job Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col xs={12} sm={6}>
                <Form.Group controlId="jobType">
                  <Form.Label>Job Type</Form.Label>
                  <Form.Control
                    as="select"
                    name="jobType"
                    value={formData.jobType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Job Type</option>
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="contract">Contract</option>
                    <option value="internship">Internship</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col xs={12} sm={6}>
                <Form.Group controlId="jobSalary">
                  <Form.Label>Salary</Form.Label>
                  <Form.Control
                    type="text"
                    name="salary"
                    value={formData.salary}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col xs={12}>
                <Form.Group controlId="jobExperience">
                  <Form.Label>Required Experience</Form.Label>
                  <Form.Control
                    type="text"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Button variant="primary" type="submit" className="w-100 add-jobs-submit-button">
              Post Job
            </Button>
          </Form>
          </Col>
          </Row>
        </Container>
        );
};

        export default AddJobs;
