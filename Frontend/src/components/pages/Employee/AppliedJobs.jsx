import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Typography, Box, CircularProgress } from "@mui/material";

const APIBASEURL = "http://localhost:5000/api"; // Adjust this to your API base URL

const AppliedJobs = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing stored user:", error);
      }
    }
  }, []);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        if (user && user._id) {
          const response = await axios.get(`${APIBASEURL}/application/applied/${user._id}`);
          setAppliedJobs(response.data);
        }
      } catch (error) {
        console.error("Error fetching applied jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppliedJobs();
  }, [user]);

  if (loading) {
    return (
      <Container>
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container className="applied-jobs-container">
      <Typography variant="h4" align="center" gutterBottom className="applied-jobs-header">
        Applied Jobs
      </Typography>
      {appliedJobs.length > 0 ? (
        appliedJobs
          .filter(job => job && job._id) // Filter out jobs that are null or undefined, and ensure _id exists
          .map((job) => (
            <Box key={job._id} className="applied-job-box">
              <Typography variant="h5" className="job-title">{job.title}</Typography>
              <Typography className="job-description">{job.description}</Typography>
              <Typography variant="body2" className="job-details">Company: {job.company}</Typography>
              <Typography variant="body2" className="job-details">Location: {job.location}</Typography>
              <Typography variant="body2" className="job-details">Job Type: {job.jobType}</Typography>
              <Typography variant="body2" className="job-details">Salary: {job.salary}</Typography>
              <Typography variant="body2" className="job-status">Status: {job.status}</Typography>
              {job.status === 'accepted' && (
                <Typography variant="body2" className="job-message">Message: {job.message}</Typography>
              )}
            </Box>
          ))
      ) : (
        <Typography variant="h6" align="center" className="no-jobs-message">
          No jobs applied yet.
        </Typography>
      )}
    </Container>
  );
};

export default AppliedJobs;
