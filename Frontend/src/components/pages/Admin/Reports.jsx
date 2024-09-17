import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

const Reports = () => {
  return (
    <div className='reports'>
      <h2>Reports</h2>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Job Posting Report</Card.Title>
              <Card.Text>Generate and view reports on job postings.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Application Report</Card.Title>
              <Card.Text>Generate and view reports on job applications.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Reports;
