import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Typography, Card, CardContent, Button } from '@mui/material';
import { APIBASEURL } from "../../../config/index.js";

const JobList = () => {
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
          <Link to={`/apply/${job._id}`}>
            <Button variant="contained" color="primary">
              Apply
            </Button>
          </Link>
        </Card>
      ))}
    </Container>
  );
};

export default JobList;
