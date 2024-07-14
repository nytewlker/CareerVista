import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Typography, Button, Box } from "@mui/material";
import { APIBASEURL } from "../../../config/index.js";
import JobApplicationsList from "./JobApplicationList.jsx";
import { useNavigate } from "react-router-dom";
// import "./MyJobs.css"; // Import CSS file for styling

const MyJobs = () => {
  const [postedJobs, setPostedJobs] = useState([]);
  const [user, setUser] = useState(null);
  const [expandedJobId, setExpandedJobId] = useState(null);
  const [expandedAppId, setExpandedAppId] = useState(null);
  const navigate = useNavigate();

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
    const fetchPostedJobs = async () => {
      try {
        if (user && user._id) {
          const response = await axios.get(`${APIBASEURL}/job/${user._id}`);
          setPostedJobs(response.data);
        }
      } catch (error) {
        console.error("Error fetching posted jobs:", error);
      }
    };

    fetchPostedJobs();
  }, [user]);

  const handleUpdateJob = (jobId) => {
    console.log(`Navigating to update job with ID: ${jobId}`);
    navigate(`/updatejob/${jobId}`);
  };

  const handleDeleteJob = async (jobId) => {
    try {
      const response = await axios.delete(`${APIBASEURL}/job/${jobId}`);
      console.log("Job deleted:", response.data);
      setPostedJobs(postedJobs.filter((job) => job._id !== jobId));
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  const toggleJobApplications = (jobId) => {
    if (expandedJobId === jobId) {
      setExpandedJobId(null);
    } else {
      setExpandedJobId(jobId);
    }
  };

  const handleViewApplications = (jobId) => {
    if (expandedAppId === jobId) {
      setExpandedAppId(null);
    } else {
      setExpandedAppId(jobId);
    }
  };

  return (
    <Container className="my-jobs-container">
      <Typography variant="h4" align="center" gutterBottom>
        Recruiter Dashboard
      </Typography>
      {postedJobs.length > 0 ? (
        postedJobs.map((job) => (
          <Box key={job._id} className="job-item">
            <Typography variant="h5">{job.title}</Typography>
            <Typography>{job.description}</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleUpdateJob(job._id)}
              className="action-button"
            >
              Update Job
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => handleDeleteJob(job._id)}
              className="action-button"
            >
              Delete Job
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => toggleJobApplications(job._id)}
              className="action-button"
            >
              {expandedJobId === job._id ? "Hide Details" : "View More"}
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleViewApplications(job._id)}
              className="action-button"
            >
              View Applications
            </Button>
            {expandedJobId === job._id && (
              <Box className="job-details">
                <Typography variant="body2" className="job-experience">
                  Experience: {job.experience}
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
              </Box>
            )}

            {expandedAppId === job._id && (
              <Box className="job-applications">
                <JobApplicationsList jobId={job._id} />
              </Box>
            )}
          </Box>
        ))
      ) : (
        <Typography variant="h6" align="center">
          No jobs posted yet.
        </Typography>
      )}
    </Container>
  );
};

export default MyJobs;
