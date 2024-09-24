import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaMapMarkerAlt, FaBriefcase, FaMoneyBillAlt, FaUserTie } from 'react-icons/fa'; // Importing icons
import { APIBASEURL } from '../../../config'; // Update this with your correct API base URL

const RecruiterHome = () => {
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
    <Container fluid className="recruiter-home-container">
      <h2 className="text-center mb-4">Job Listings</h2>
      <Row className="justify-content-center">
        {jobs.map((job) => (
          <Col xs={12} sm={10} md={6} lg={4} key={job._id} className="mb-4">
            <Card className="job-card">
              <Card.Body>
                <Card.Title className="job-title">{job.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{job.company}</Card.Subtitle>
                <div className="job-details">
                  <div className="detail-row">
                    <FaBriefcase className="job-icon" /> {job.experience} Experience
                  </div>
                  <div className="detail-row">
                    <FaMapMarkerAlt className="job-icon" /> {job.location}
                  </div>
                  <div className="detail-row">
                    <FaUserTie className="job-icon" /> Job Type: {job.jobType}
                  </div>
                  <div className="detail-row">
                    <FaMoneyBillAlt className="job-icon" /> {job.salary}
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default RecruiterHome;
