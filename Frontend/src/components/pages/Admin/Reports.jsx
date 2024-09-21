import React from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios'; // For making API calls

const Reports = () => {

  // Function to handle downloading the report
  const downloadReport = (reportType, format) => {
  axios({
    url: `http://localhost:5000/api/admin/reports/download-${reportType}?format=${format}`, // Full backend endpoint
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
  }).catch((error) => {
    console.error('Error downloading report:', error);
    alert('Error downloading report');
  });
};

  return (
    <div className='reports'>
      <div className='mt-5'>
        <div className='text-center mb-5'>Reports</div>
        <Row className="g-4">
          {/* Job Posting Report */}
          <Col xs={12} md={6}>
            <Card>
              <Card.Body>
                <Card.Title>Job Posting Report</Card.Title>
                <Card.Text>Generate and view reports on job postings.</Card.Text>
                <Button variant="primary" onClick={() => downloadReport('job-posting', 'pdf')}>Download PDF</Button>{' '}
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
              </Card.Body>
            </Card>
          </Col>

          {/* Recruiter Report */}
          <Col xs={12} md={6}>
            <Card>
              <Card.Body>
                <Card.Title>Recruiter Report</Card.Title>
                <Card.Text>Generate and view reports on recruiters.</Card.Text>
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
                <Button variant="secondary" onClick={() => downloadReport('employee', 'xlsx')}>Download Excel</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Reports;
