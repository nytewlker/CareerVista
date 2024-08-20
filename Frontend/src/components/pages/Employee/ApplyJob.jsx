import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Typography, TextField, Button, Box } from "@mui/material";
import { APIBASEURL } from "../../../config";
import { Row, Col, Form } from 'react-bootstrap';

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
      console.log("User:", user); // Debugging: Log user object to console
      if (!user || !user._id) {
        alert("User is not logged in or employeeId is missing.");
        return;
      }

      const response = await axios.post(`${APIBASEURL}/application/apply`, {
        jobId,
        employeeId: user._id,
        coverLetter: formData.coverLetter,
      });
      console.log("Application Response:", response.data); // Debugging: Log API response to console

      alert("Application submitted successfully!");
      navigate("/employeeHome");
    } catch (error) {
      console.error("Error applying for job:", error);
      alert("Failed to submit the application. Please try again.");
    }
  };

  return (
    <Container className="apply-job-container">
      <Row className='justify-content-center'>
        <Col md={8} lg={6}>
          <Typography variant="h4" align="center" gutterBottom className="apply-job-header">
            Apply for Job
          </Typography>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <div className="form-container slideInUp">
            <Form onSubmit={handleSubmit}>

              <Row>
                <Col md={12}>
                  <Form.Group className="mb-3">
                    
                    <Form.Control
                      name="coverLetter"
                      as="textarea" // Change to textarea to support multiple lines
                      placeholder="Type your cover letter"
                      value={formData.coverLetter}
                      onChange={handleChange}
                      rows={15} // Adjust the number of rows for the desired height
                      className="apply-job-textfield"
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              {/* // <TextField
        //   name="coverLetter"
        //   label="Cover Letter"
          
        //   fullWidth
        //   required
        //   multiline
        //   rows={15} // Adjusted number of rows for better form height
        //   variant="outlined" // Added variant for outlined style
        //   className="apply-job-textfield"
        // /> */}
              <Button type="submit" variant="contained" color="primary" className="apply-job-submit-button">
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
