// UpdateJob.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography } from "@mui/material";
import { APIBASEURL } from "../../../config/index.js";

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
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Update Job
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          name="title"
          label="Job Title"
          value={job.title}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="description"
          label="Job Description"
          value={job.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="location"
          label="Location"
          value={job.location}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="jobType"
          label="Job Type"
          value={job.jobType}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="salary"
          label="Salary"
          value={job.salary}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="experience"
          label="Experience"
          value={job.experience}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3 }}
        >
          Update Job
        </Button>
      </form>
    </Container>
  );
};

export default UpdateJob;
