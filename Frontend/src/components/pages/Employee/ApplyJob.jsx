import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Typography, TextField, Button, Box } from "@mui/material";
import { APIBASEURL } from "../../../config";

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
      <Typography variant="h4" align="center" gutterBottom className="apply-job-header">
        Apply for Job
      </Typography>
      <Box component="form" onSubmit={handleSubmit} className="apply-job-form">
        <TextField
          name="coverLetter"
          label="Cover Letter"
          value={formData.coverLetter}
          onChange={handleChange}
          fullWidth
          required
          multiline
          rows={15} // Adjusted number of rows for better form height
          variant="outlined" // Added variant for outlined style
          className="apply-job-textfield"
        />
        <Button type="submit" variant="contained" color="primary" className="apply-job-submit-button">
          Submit Application
        </Button>
      </Box>
    </Container>
  );
};

export default ApplyJob;
