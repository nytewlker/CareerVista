import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';

const ApplicationManagement = () => {
  const [applications, setApplications] = useState([]);

  // Fetch applications from the backend
  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/applications');
      setApplications(response.data); // Update the state with fetched applications
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };


  const deleteApplication = async (applicationId) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      console.log(`Attempting to delete application with ID: ${applicationId}`);
      try {
        await axios.delete(`http://localhost:5000/api/admin/applications/${applicationId}`);
        console.log(`Application with ID ${applicationId} deleted successfully.`);
        // Remove the deleted application from the state
        setApplications(applications.filter((application) => application._id !== applicationId));
      } catch (error) {
        console.error('Error deleting application', error);
      }
    } else {
      console.log(`Deletion of application with ID ${applicationId} was canceled.`);
    }
  };
  

  return (
    <div className='Applicationmanangement'>
      <h2>Application Management</h2>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Job Title</th>
            <th>Applicant Name</th>
            <th>Cover Letter</th>
            <th>Status</th>
            <th>Message</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((application) => (
            <tr key={application._id}>
              {/* Access the related job and employee data using optional chaining */}
              <td>{application.jobId?.title || 'N/A'}</td>
              <td>{application.employeeId?.name || 'N/A'}</td>
              <td>{application.coverLetter || 'No cover letter provided'}</td>
              <td>{application.status}</td>
              <td>{application.message || 'No message provided'}</td>
              <td>
                <Button variant="warning" onClick={() => deleteApplication(application._id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ApplicationManagement;
