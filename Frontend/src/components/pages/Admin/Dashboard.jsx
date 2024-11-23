import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported

const AdminDashboard = () => {
  return (
    <Container className="dashboard ">
      <h1 className="text-center mt-4">Welcome, Admin!</h1>
      <Row className="g-4">
        <Col xs={12} md={6}>
          <Card >
            <Card.Body>
              <Card.Title>Manage Recruiters</Card.Title>
              <Link to="/admin/recruiters" className="btn btn-dark">Go to Recruiters</Link>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={6}>
          <Card >
            <Card.Body>
              <Card.Title>Manage Employees</Card.Title>
              <Link to="/admin/employees" className="btn btn-dark">Go to Employees</Link>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={6}>
          <Card >
            <Card.Body>
              <Card.Title>Manage Job Postings</Card.Title>
              <Link to="/admin/jobs" className="btn btn-dark">Go to Job Postings</Link>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={6}>
          <Card >
            <Card.Body>
              <Card.Title>View System Reports</Card.Title>
              <Link to="/admin/reports" className="btn btn-dark">Go to Reports</Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
