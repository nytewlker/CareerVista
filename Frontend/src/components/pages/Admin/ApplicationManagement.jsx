import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { getAllApplications, updateApplication } from './services/applicationServies';

const ApplicationManagement = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    const result = await getAllApplications();
    setApplications(result.data);
  };

  const handleUpdateStatus = async (id, status) => {
    await updateApplication(id, { status });
    loadApplications();
  };

  return (
    <div>
      <h2>Manage Applications</h2>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Job Title</th>
            <th>Applicant</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((application) => (
            <tr key={application._id}>
              <td>{application.jobTitle}</td>
              <td>{application.applicant}</td>
              <td>{application.status}</td>
              <td>
                <Button variant="success" onClick={() => handleUpdateStatus(application._id, 'Accepted')}>Accept</Button>
                <Button variant="danger" onClick={() => handleUpdateStatus(application._id, 'Rejected')}>Reject</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ApplicationManagement;
