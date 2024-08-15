import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Typography } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const AboutUs = () => {
  return (

    <div className="about-section fade-in">
      <Row className="justify-content-center">
        <Col md={8}>
          <div className="about-content text-center">
            <Typography variant="h2" className="animate__animated animate__fadeInUp">About Us</Typography>
            <Typography variant="body1" className="animate__animated animate__fadeInUp">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla convallis
              consequat lacus, eu fermentum nisi aliquam sit amet. Sed mollis ultricies
              nisi eget iaculis. Curabitur quis ligula ac magna accumsan lacinia vel a sem.
            </Typography>
          </div>
        </Col>
      </Row>
      <Row className="justify-content-center mt-5">
        <Col md={4} className="text-center animate__animated animate__fadeInLeft">
          <img
            src={`${process.env.PUBLIC_URL}/assets/owner.jpg`}
            alt="Team Member 1"
            className="img-fluid rounded-circle mb-4"
          />
          <Typography variant="h4">Anand Dubey</Typography>
          <Typography variant="h6">(ADDIE)</Typography>
          <Typography variant="body2">CEO & Founder</Typography>
        </Col>
        <Col md={4} className="text-center animate__animated animate__fadeInRight">
          <img
            src={`${process.env.PUBLIC_URL}/assets/owner.jpg`}
            alt="Team Member 2"
            className="img-fluid rounded-circle mb-4"
          />
          <Typography variant="h4">Anand Dubey</Typography>
          <Typography variant="h6">(ADDIE)</Typography>
          <Typography variant="body2">Chief Designer</Typography>
        </Col>
      </Row>
      <Row className="justify-content-center mt-5">
        <Col md={4} className="text-center animate__animated animate__fadeInLeft">
          <img
            src={`${process.env.PUBLIC_URL}/assets/owner.jpg`}
            alt="Team Member 3"
            className="img-fluid rounded-circle mb-4"
          />
          <Typography variant="h4">Anand Dubey</Typography>
          <Typography variant="h6">(ADDIE)</Typography>
          <Typography variant="body2">Project Manager</Typography>
        </Col>
        <Col md={4} className="text-center animate__animated animate__fadeInRight">
          <img
            src={`${process.env.PUBLIC_URL}/assets/owner.jpg`}
            alt="Team Member 4"
            className="img-fluid rounded-circle mb-4"
          />
          <Typography variant="h4">Anand Dubey</Typography>
          <Typography variant="h6">(ADDIE)</Typography>
          <Typography variant="body2">Lead Developer</Typography>
        </Col>
        <Col md={4} className="text-center animate__animated animate__fadeInRight">
          <img
            src={`${process.env.PUBLIC_URL}/assets/owner.jpg`}
            alt="Team Member 5"
            className="img-fluid rounded-circle mb-4"
          />
          <Typography variant="h4">Anand Dubey</Typography>
          <Typography variant="h6">(ADDIE)</Typography>
          <Typography variant="body2">Marketing Head</Typography>
        </Col>
      </Row>
    </div>

  );
};

export default AboutUs;
