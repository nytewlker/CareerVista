import React, { useState } from "react";
import axios from "axios";
import { Container, Typography, TextField, Button, MenuItem, Select, FormControl, InputLabel, Grid } from "@mui/material";
import { APIBASEURL } from "../../../config/index.js";
import "./AddJobs.css";

const AddJobs = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    jobType: "",
    salary: "",
    experience: ""
  });

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
      alert("Job posted successfully:", response.data);

      // Optionally reset form
      setFormData({ title: "", description: "", location: "", jobType: "", salary: "", experience: "" });
    } catch (error) {
      console.error("Error posting job:", error);
    }
  };

  return (
    <Container fluid className="container fade-in">
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        className="form-title slide-in"
      >
        Post a Job
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Job Title"
              variant="outlined"
              margin="normal"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="text-field slide-in"
              style={{ animationDelay: "0.3s" }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Location"
              variant="outlined"
              margin="normal"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="text-field slide-in"
              style={{ animationDelay: "0.6s" }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Job Description"
              variant="outlined"
              margin="normal"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="text-field slide-in"
              style={{ animationDelay: "0.9s" }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined" margin="normal" className="text-field slide-in" style={{ animationDelay: "1.2s" }}>
              <InputLabel>Job Type</InputLabel>
              <Select
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
                label="Job Type"
                required
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
              fullWidth
              label="Salary"
              variant="outlined"
              margin="normal"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              required
              className="text-field slide-in"
              style={{ animationDelay: "1.5s" }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Required Experience"
              variant="outlined"
              margin="normal"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              required
              className="text-field slide-in"
              style={{ animationDelay: "1.8s" }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              type="submit"
              color="primary"
              fullWidth
              className="submit-button slide-in"
              style={{ animationDelay: "2.1s" }}
            >
              Post Job
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default AddJobs;
