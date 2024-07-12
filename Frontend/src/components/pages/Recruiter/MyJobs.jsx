import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Typography, Button, Box } from "@mui/material";
import { APIBASEURL } from "../../../config/index.js";
import JobApplicationsList from "./JobApplicationList.jsx";
import { useNavigate } from "react-router-dom";

const MyJobs = () => {
  const [postedJobs, setPostedJobs] = useState([]);
  const [user, setUser] = useState(null);
  const [expandedJobId, setExpandedJobId] = useState(null); // Track expanded job id
  const [expandedAppId, setExpandedAppId] = useState(null); // Track expanded job id
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
    // Example navigation using React Router
      navigate(`/updatejob/${jobId}`);
  };

  const handleDeleteJob = async (jobId) => {
    try {
      const response = await axios.delete(`${APIBASEURL}/job/${jobId}`);
      console.log("Job deleted:", response.data);
      // Update postedJobs after deletion
      setPostedJobs(postedJobs.filter((job) => job._id !== jobId));
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  const toggleJobApplications = (jobId) => {
    if (expandedJobId === jobId) {
      setExpandedJobId(null); // Hide job details if already expanded
    } else {
      setExpandedJobId(jobId); // Expand job details for the selected job
    }
  };

  const handleViewApplications = (jobId) => {
    // Navigate to view applications page or handle applications logic
    if (expandedAppId === jobId) {
      setExpandedAppId(null); // Hide job details if already expanded
    } else {
      setExpandedAppId(jobId); // Expand job details for the selected job
    }
  };

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Recruiter Dashboard
      </Typography>
      {postedJobs.length > 0 ? (
        postedJobs.map((job) => (
          <Box key={job._id} sx={{ mb: 3, p: 2, border: "1px solid #ccc" }}>
            <Typography variant="h5">{job.title}</Typography>
            <Typography>{job.description}</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleUpdateJob(job._id)}
              sx={{ mr: 2, mt: 2 }}
            >
              Update Job
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => handleDeleteJob(job._id)}
              sx={{ mr: 2, mt: 2 }}
            >
              Delete Job
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => toggleJobApplications(job._id)}
              sx={{ mt: 2 }}
            >
              {expandedJobId === job._id ? "Hide Details" : "View More"}
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleViewApplications(job._id)}
              sx={{ ml: 2, mt: 2 }}
            >
              View Applications
            </Button>
            {expandedJobId === job._id && (
              <Box mt={2}>
                {/* Render job details here */}
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
                {/* Display job applications */}
              </Box>
            )}

            {expandedAppId === job._id && (
              <Box mt={2}>
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
