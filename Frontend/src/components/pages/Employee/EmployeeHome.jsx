import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaBriefcase, FaMoneyBillAlt } from 'react-icons/fa'; // Icons for job details
import { APIBASEURL } from '../../../config/index.js';
// import './EmployeeHome.css'; // Import your existing CSS file

const EmployeeHome = () => {
  const [jobs, setJobs] = useState([]);

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

  return (
    <Container fluid className="employee-home-container">
      <h2 className="text-center mb-4">Job Listings</h2>
      <Row className="justify-content-center">
        {jobs.map((job) => (
          <Col xs={12} sm={8} md={6} lg={4} key={job._id} className="mb-4">
            <Card className="job-card mx-auto" style={{ maxWidth: '100%' }}>
              <Card.Body>
                <Card.Title className="job-title">{job.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{job.company}</Card.Subtitle>
                <div className="job-details">
                  <div className="detail-row">
                    <FaBriefcase className="job-icon" /> {job.experience} Experience
                  </div>
                  <div className="detail-row">
                    <FaMoneyBillAlt className="job-icon" /> {job.salary}
                  </div>
                  <div className="detail-row">
                    <FaMapMarkerAlt className="job-icon" /> {job.location}
                  </div>
                </div>
                <Link to={`/apply/${job._id}`} className="btn btn-primary apply-button">
                  Apply
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default EmployeeHome;
