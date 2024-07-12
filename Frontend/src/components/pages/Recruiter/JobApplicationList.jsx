import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, Typography, Paper, Button, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import { APIBASEURL, DICURL } from '../../../config/index.js';

const JobApplicationsList = ({ jobId }) => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const [selectedApplication, setSelectedApplication] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`${APIBASEURL}/application/applications/${jobId}`);
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

  const handleOpenMessage = (applicationId) => {
    setSelectedApplication(applicationId);
  };

  const handleAccept = async (applicationId) => {
    if (!message) {
      alert('Please enter a message before accepting.');
      return;
    }

    try {
      const response = await axios.post(`${APIBASEURL}/application/accept`, {
        applicationId,
        message,
      });
      console.log(response.data);
      // Update application status locally
      setApplications(applications.map(app => app._id === applicationId ? { ...app, status: 'accepted' } : app));
      // Clear message and selected application after accepting
      setMessage('');
      setSelectedApplication(null);
    } catch (error) {
      console.error('Error accepting application:', error);
      // Handle error
    }
  };

  const handleReject = async (applicationId) => {
    try {
      const response = await axios.post(`${APIBASEURL}/application/reject`, {
        applicationId,
      });
      console.log(response.data);
      // Update application status locally
      setApplications(applications.map(app => app._id === applicationId ? { ...app, status: 'rejected' } : app));
    } catch (error) {
      console.error('Error rejecting application:', error);
      // Handle error
    }
  };

  const handleChangeMessage = (event) => {
    setMessage(event.target.value);
  };

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
                primary={`Cover letter: ${applicant.coverLetter}`}
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
              {selectedApplication === applicant._id && (
                <TextField
                  label="Message to applicant"
                  variant="outlined"
                  fullWidth
                  value={message}
                  onChange={handleChangeMessage}
                  sx={{ mb: 2 }}
                />
              )}
              {applicant.status === 'pending' && (
                <>
                  <Button variant="contained" color="primary" onClick={() => handleAccept(applicant._id)}>
                    Accept
                  </Button>
                  <Button variant="contained" color="secondary" onClick={() => handleReject(applicant._id)}>
                    Reject
                  </Button>
                </>
              )}
              {selectedApplication !== applicant._id && applicant.status === 'pending' && (
                <Button variant="contained" onClick={() => handleOpenMessage(applicant._id)}>
                  Add Message
                </Button>
              )}
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
