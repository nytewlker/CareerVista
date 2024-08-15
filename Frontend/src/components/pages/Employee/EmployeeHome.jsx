import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Collapse } from 'react-bootstrap';
import { APIBASEURL } from '../../../config/index.js';
import { Link } from 'react-router-dom';

const EmployeeHome = () => {
  const [jobs, setJobs] = useState([]);
  const [expandedJobId, setExpandedJobId] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`${APIBASEURL}/job`);
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  const handleExpandClick = (jobId) => {
    setExpandedJobId(expandedJobId === jobId ? null : jobId);
  };

  return (
    <Container fluid className="employee-home-container">
      <Row className="justify-content-center">
        <Col md={10}>
          <h2 className="text-center mb-4">Job Listings</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        {jobs.map((job) => (
          <Col xs={12} sm={10} md={12} key={job._id} className="mb-4 mx-auto">
            <Card className="job-card">
              <Card.Body>
                <Row className="align-items-center">
                  <Col>
                    <Card.Title>{job.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Experience: {job.experience}</Card.Subtitle>
                    <Collapse in={expandedJobId === job._id}>
                      <div className="job-details">
                        <Card.Text>{job.description}</Card.Text>
                        <Card.Text>Company: {job.company}</Card.Text>
                        <Card.Text>Location: {job.location}</Card.Text>
                        <Card.Text>Job Type: {job.jobType}</Card.Text>
                        <Card.Text>Salary: {job.salary}</Card.Text>
                      </div>
                    </Collapse>
                  </Col>
                  <Col xs="auto">
                    <Button
                      variant="link"
                      onClick={() => handleExpandClick(job._id)}
                      className="view-details-button"
                    >
                      {expandedJobId === job._id ? 'Hide Details' : 'View Details'}
                    </Button>
                    <Link to={`/apply/${job._id}`} className="btn btn-primary apply-button">
                      Apply
                    </Link>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default EmployeeHome;
