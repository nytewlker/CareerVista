import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
// import {
//   Container,
//   TextField,
//   Button,
//   Typography,
//   Grid,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Paper,
// } from "@mui/material";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { APIBASEURL } from "../../../config/index.js";

import 'bootstrap/dist/css/bootstrap.min.css';
// import "./UpdateJob.css"; // Import the external CSS file

const UpdateJob = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState({
    title: "",
    description: "",
    location: "",
    jobType: "",
    salary: "",
    experience: "",
  });

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`${APIBASEURL}/job/${jobId}`);
        setJob(response.data);
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    };

    fetchJob();
  }, [jobId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob({ ...job, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${APIBASEURL}/job/${jobId}`, job);
      navigate("/myjobs");
    } catch (error) {
      console.error("Error updating job:", error);
    }
  };

  return (
    <Container className="updateJobContainer">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <div className="add-job-containt text-center">
            <h2>Update Job </h2>
          </div>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <div className="form-container slideInUp">
            <Form onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Col xs={12} sm={6}>
                  <Form.Group controlId="jobTitle">
                    <Form.Label>Job Title</Form.Label>
                    <Form.Control
                      type="text"
                      name="title"
                      value={job.title}
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
                      value={job.location}
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
                      value={job.description}
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
                      value={job.jobType}
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
                      value={job.salary}
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
                      value={job.experience}
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
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default UpdateJob;
