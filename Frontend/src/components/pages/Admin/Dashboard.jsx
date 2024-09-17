import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported


const AdminDashboard = () => {
  return (
    <Container className="dashboard">
      <h1 className="text-center mb-4">Welcome, Admin!</h1>
      <Row className="g-4">
        <Col md={6} lg={3}>
          <Card className="dashboard-card">
            <Card.Body>
              <Card.Title>Manage Recruiters</Card.Title>
              <Link to="/admin/recruiters" className="btn btn-primary">Go to Recruiters</Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={3}>
          <Card className="dashboard-card">
            <Card.Body>
              <Card.Title>Manage Employees</Card.Title>
              <Link to="/admin/employees" className="btn btn-primary">Go to Employees</Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={3}>
          <Card className="dashboard-card">
            <Card.Body>
              <Card.Title>Manage Job Postings</Card.Title>
              <Link to="/admin/jobs" className="btn btn-primary">Go to Job Postings</Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={3}>
          <Card className="dashboard-card">
            <Card.Body>
              <Card.Title>View System Reports</Card.Title>
              <Link to="/admin/reports" className="btn btn-primary">Go to Reports</Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
