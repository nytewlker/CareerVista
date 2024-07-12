import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Box,
  Grid,
} from '@mui/material';
import { APIBASEURL } from '../../../config';
import './RecruiterHome.css';

const RecruiterHome = () => {
  const [jobs, setJobs] = useState([]);
  const [expandedJobId, setExpandedJobId] = useState(null);

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

  const handleExpandClick = (jobId) => {
    setExpandedJobId(expandedJobId === jobId ? null : jobId);
  };

  return (
    <Box className="recruiter-home-container">
      <Container>
        <Typography variant="h4" align="center" gutterBottom className="header">
          Job Listings
        </Typography>
        <Grid container spacing={3}>
          {jobs.map((job) => (
            <Grid item xs={12} sm={6} md={4} key={job._id}>
              <Card className="job-card">
                <CardContent>
                  <Typography variant="h5" className="job-title">
                    {job.title}
                  </Typography>
                  <Typography variant="body2" className="job-experience">
                    Experience: {job.experience}
                  </Typography>
                  {expandedJobId === job._id && (
                    <>
                      <Typography variant="body2" className="job-description">
                        {job.description}
                      </Typography>
                      <Typography variant="body2" className="job-company">
                        Company: {job.company}
                      </Typography>
                      <Typography variant="body2" className="job-location">
                        Location: {job.location}
                      </Typography>
                      <Typography variant="body2" className="job-jobType">
                        Job Type: {job.jobType}
                      </Typography>
                      <Typography variant="body2" className="job-salary">
                        Salary: {job.salary}
                      </Typography>
                    </>
                  )}
                  <Box className="card-actions">
                    <Button size="small" color="primary" onClick={() => handleExpandClick(job._id)}>
                      {expandedJobId === job._id ? 'Hide Details' : 'View Details'}
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default RecruiterHome;
