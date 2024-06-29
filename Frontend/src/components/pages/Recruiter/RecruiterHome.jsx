import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button } from '@mui/material';
import { APIBASEURL } from '../../../config/index.js';

const RecruiterHome = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // const token = localStorage.getItem('token'); // Retrieve token from localStorage
      const response = await axios.post(`${APIBASEURL}/job`, formData, {
        // headers: { 'x-auth-token': `Bearer ${token}` } // Send token in Authorization header
      });
      alert('Job posted successfully:', response.data);
      
      // Optionally reset form
      setFormData({ title: '', description: '' });
    } catch (error) {
      console.error('Error posting job:', error);
    }
  };

  return (
    <Container>
      
      <Typography variant="h4" align="center" gutterBottom>
        Post a Job
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Job Title"
          variant="outlined"
          margin="normal"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          label="Job Description"
          variant="outlined"
          margin="normal"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <Button variant="contained" type="submit" color="primary" fullWidth sx={{ marginTop: 2 }}>
          Post Job
        </Button>
      </form>
    </Container>
  );
};

export default RecruiterHome;
