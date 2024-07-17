import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
} from "@mui/material";
import { APIBASEURL } from "../../../config/index.js";
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
    <Container maxWidth="md" className="updateJobContainer">
      {/* <Paper elevation={3} className="updateJobPaper"> */}
        <Typography variant="h4" align="center" gutterBottom>
          Update Job
        </Typography>
        <form onSubmit={handleSubmit} className="updateJobForm">
          <TextField
            name="title"
            label="Job Title"
            value={job.title}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            className="text-field slide-in"
          />
          <TextField
            name="description"
            label="Job Description"
            value={job.description}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline
            rows={4}
            required
            className="text-field slide-in"
          />
          <TextField
            name="location"
            label="Location"
            value={job.location}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            className="text-field slide-in"
          />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined" margin="normal">
                <InputLabel>Job Type</InputLabel>
                <Select
                  name="jobType"
                  value={job.jobType}
                  onChange={handleChange}
                  label="Job Type"
                  required
                  className="text-field slide-in"
                >
                  <MenuItem value="full-time">Full-time</MenuItem>
                  <MenuItem value="part-time">Part-time</MenuItem>
                  <MenuItem value="contract">Contract</MenuItem>
                  <MenuItem value="internship">Internship</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="salary"
                label="Salary"
                value={job.salary}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
                className="text-field slide-in"
              />
            </Grid>
          </Grid>
          <TextField
            name="experience"
            label="Experience"
            value={job.experience}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            className="text-field slide-in"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className="submitButton"
          >
            Update Job
          </Button>
        </form>
      {/* </Paper> */}
    </Container>
  );
};

export default UpdateJob;
