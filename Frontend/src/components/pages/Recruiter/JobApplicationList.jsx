import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, Typography, Paper, Button, TextField, Grid } from '@mui/material';
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
        setError('NO job applications');
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
      const response = await axios.post(`${APIBASEURL}/application/accept/${applicationId}`, {
        message,
      });
      console.log(response.data);
      setApplications(applications.map(app => app._id === applicationId ? { ...app, status: 'accepted' } : app));
      setMessage('');
      setSelectedApplication(null);
    } catch (error) {
      console.error('Error accepting application:', error);
    }
  };

  const handleReject = async (applicationId, employeeId) => {
    try {
      const response = await axios.post(`${APIBASEURL}/application/reject/${employeeId}/${applicationId}`);
      console.log(response.data);
      setApplications(applications.map(app => app._id === applicationId ? { ...app, status: 'rejected' } : app));
    } catch (error) {
      console.error('Error rejecting application:', error);
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
    <Paper elevation={3} className="jobApplicationsList">
      <Typography variant="h6" className="applicationsTitle" gutterBottom>
        Applications
      </Typography>
      <List>
        {applications.length > 0 ? (
          applications.map((applicant) => (
            <ListItem key={applicant._id} className="listItem">
              <ListItemText
                primary={`Cover letter: ${applicant.coverLetter}`}
                secondary={
                  <Grid container spacing={2} className="secondaryDetails">
                    <Grid item xs={12} sm={6}>
                      <Typography component="div">
                        <Link to={`${DICURL}/${applicant.employeeId.resume}`} className="link" target='_blank'>Resume</Link>
                      </Typography>
                      <Typography component="div" className="secondaryDetail">Name: {applicant.employeeId.name}</Typography>
                      <Typography component="div" className="secondaryDetail">Email: {applicant.employeeId.email}</Typography>
                      <Typography component="div" className="secondaryDetail">Phone: {applicant.employeeId.phone}</Typography>
                      <Typography component="div" className="secondaryDetail">Institution: {applicant.employeeId.institutionName}</Typography>
                    </Grid>
                    {selectedApplication === applicant._id && (
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Message to applicant"
                          variant="outlined"
                          fullWidth
                          value={message}
                          onChange={handleChangeMessage}
                          className="messageTextField"
                        />
                      </Grid>
                    )}
                  </Grid>
                }
              />
              {applicant.status === 'pending' && (
                <div className="buttonGroup">
                  <Button variant="contained" color="primary" onClick={() => handleAccept(applicant._id)}>
                    Accept
                  </Button>
                  <Button variant="contained" color="secondary" onClick={() => handleReject(applicant._id, applicant.employeeId._id)}>
                    Reject
                  </Button>
                </div>
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
