import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

const Dashboard = () => {
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Total Jobs Posted</Card.Title>
              <Card.Text>123</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Total Applications</Card.Title>
              <Card.Text>456</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Accepted Applications</Card.Title>
              <Card.Text>78</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Rejected Applications</Card.Title>
              <Card.Text>32</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
