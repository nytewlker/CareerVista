import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { APIBASEURL } from "../../../config";
import { Row, Col, Form, Button, Container } from "react-bootstrap";

const ApplyJob = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    coverLetter: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user._id) {
        alert("User is not logged in or employeeId is missing.");
        return;
      }

      await axios.post(`${APIBASEURL}/application/apply`, {
        jobId,
        employeeId: user._id,
        coverLetter: formData.coverLetter,
      });

      alert("Application submitted successfully!");
      navigate("/employeeHome");
    } catch (error) {
      console.error("Error applying for job:", error);
      alert("Failed to submit the application. Please try again.");
    }
  };

  return (
    <Container className="apply-job-container mt-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <h4 className="text-center mb-4 apply-job-header">Apply for Job</h4>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <div className="form-container p-4 border rounded shadow-sm">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Cover Letter</Form.Label>
                <Form.Control
                  name="coverLetter"
                  as="textarea"
                  placeholder="Type your cover letter"
                  value={formData.coverLetter}
                  onChange={handleChange}
                  rows={10}
                  required
                />
              </Form.Group>
              <Button type="submit" variant="primary" className="w-100">
                Submit Application
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ApplyJob;
