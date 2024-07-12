import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Typography, TextField, Button, Box } from "@mui/material";
import { APIBASEURL } from "../../../config";

const ApplyJob = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    resume: "",
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
        employeeId: user._id, // Assuming you store the employee ID in localStorage
        coverLetter: formData.coverLetter,
      });
      
      alert("Application submitted successfully!");
      navigate("/employeeHome");
    } catch (error) {
      console.error("Error applying for job:", error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Apply for Job
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <TextField
          name="coverLetter"
          label="Cover Letter"
          value={formData.coverLetter}
          onChange={handleChange}
          fullWidth
          required
          multiline
          rows={4}
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" color="primary">
          Submit Application
        </Button>
      </Box>
    </Container>
  );
};

export default ApplyJob;
