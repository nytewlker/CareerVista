import React from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios'; // For making API calls

const Reports = () => {

  // Function to handle downloading the report
  const downloadReport = (reportType, format) => {
    axios({
      url: `/api/reports/${reportType}?format=${format}`, // Backend endpoint
      method: 'GET',
      responseType: 'blob', // Important for downloading files
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${reportType}_report.${format}`); // File name with format
      document.body.appendChild(link);
      link.click();
      link.remove();
    });
  };

  return (
    <div className='reports mt-4'>
      <h2>Reports</h2>
      <Row className="g-4">
        {/* Job Posting Report */}
        <Col xs={12} md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Job Posting Report</Card.Title>
              <Card.Text>Generate and view reports on job postings.</Card.Text>
              <Button variant="primary" onClick={() => downloadReport('job-posting', 'pdf')}>Download PDF</Button>{' '}
              <Button variant="secondary" onClick={() => downloadReport('job-posting', 'xlsx')}>Download Excel</Button>
            </Card.Body>
          </Card>
        </Col>

        {/* Application Report */}
        <Col xs={12} md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Application Report</Card.Title>
              <Card.Text>Generate and view reports on job applications.</Card.Text>
              <Button variant="primary" onClick={() => downloadReport('application', 'pdf')}>Download PDF</Button>{' '}
              <Button variant="secondary" onClick={() => downloadReport('application', 'xlsx')}>Download Excel</Button>
            </Card.Body>
          </Card>
        </Col>

        {/* Recruiter Report */}
        <Col xs={12} md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Recruiter Report</Card.Title>
              <Card.Text>Generate and view reports on recruiters.</Card.Text>
              <Button variant="primary" onClick={() => downloadReport('recruiter', 'pdf')}>Download PDF</Button>{' '}
              <Button variant="secondary" onClick={() => downloadReport('recruiter', 'xlsx')}>Download Excel</Button>
            </Card.Body>
          </Card>
        </Col>

        {/* Employee Report */}
        <Col xs={12} md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Employee Report</Card.Title>
              <Card.Text>Generate and view reports on employees.</Card.Text>
              <Button variant="primary" onClick={() => downloadReport('employee', 'pdf')}>Download PDF</Button>{' '}
              <Button variant="secondary" onClick={() => downloadReport('employee', 'xlsx')}>Download Excel</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Reports;
