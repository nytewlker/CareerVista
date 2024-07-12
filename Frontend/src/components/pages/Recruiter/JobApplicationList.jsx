import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, Typography, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { APIBASEURL, DICURL } from '../../../config/index.js';
// const DICURL ='http://localhost:5000';
const JobApplicationsList = ({ jobId }) => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        console.log('Fetching applications for jobId:', jobId);
        const response = await axios.get(`${APIBASEURL}/application/applications/${jobId}`);
        console.log('Response data:', response.data);
        setApplications(response.data);
      } catch (error) {
        console.error('Error fetching job applications:', error);
        setError('Error fetching job applications');
      } finally {
        setLoading(false);
      }
    };

    if (jobId) {
      fetchApplications();
    }
  }, [jobId]);

  if (loading) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  if (error) {
    return <Typography variant="h6">{error}</Typography>;
  }

  return (
    <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Applications
      </Typography>
      <List>
        {applications.length > 0 ? (
          applications.map((applicant) => (
            <ListItem key={applicant._id}>
              <ListItemText
                primary={`coverlatter: ${applicant.coverLetter}`}
                secondary={
                  <>
                    <Typography component="span">
                      Resume: <Link to={`${DICURL}/${applicant.employeeId.resume}`} target='_blank'>Download</Link>
                    </Typography><br />
                    <Typography component="span">Name: {applicant.employeeId.name}</Typography><br />
                    <Typography component="span">Email: {applicant.employeeId.email}</Typography><br />
                    <Typography component="span">Phone: {applicant.employeeId.phone}</Typography><br />
                    <Typography component="span">Institution: {applicant.employeeId.institutionName}</Typography>
                  </>
                }
              />
            </ListItem>
          ))
        ) : (
          <Typography variant="body1">No applications found.</Typography>
        )}
      </List>
    </Paper>
  );
};

export default JobApplicationsList;
