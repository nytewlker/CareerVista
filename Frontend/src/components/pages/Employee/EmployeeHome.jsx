import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Card, CardContent, Button } from '@mui/material';
import { APIBASEURL } from "../../../config/index.js"

const EmployeeHome = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`${APIBASEURL}/job`);
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  const handleApply = async (jobId) => {
    try {
      await axios.put(`${APIBASEURL}/job/apply/${jobId}`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      alert('Applied successfully');
    } catch (error) {
      console.error('Error applying for job:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Job Listings
      </Typography>
      {jobs.map((job) => (
        <Card key={job._id} sx={{ marginBottom: 2 }}>
          <CardContent>
            <Typography variant="h5">{job.title}</Typography>
            <Typography variant="body2">{job.description}</Typography>
            {/* <Typography variant="body2">Company: {job.company.name}</Typography> */}
          </CardContent>
          <Button variant="contained" color="primary" onClick={() => handleApply(job._id)}>
            Apply
          </Button>
        </Card>
      ))}
    </Container>
  );
};

export default EmployeeHome;
