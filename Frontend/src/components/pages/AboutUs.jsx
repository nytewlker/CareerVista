import React from 'react';
import { Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const AboutUs = () => {
  return (
    <div className="about-section fade-in py-5">
      {/* About Us Heading */}
      <Row className="justify-content-center">
        <Col md={8}>
          <div className="about-content text-center">
            <h2 className="animate__animated animate__fadeInUp fw-bold">About Us</h2>
            <p className="animate__animated animate__fadeInUp mt-3">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla convallis
              consequat lacus, eu fermentum nisi aliquam sit amet. Sed mollis ultricies
              nisi eget iaculis. Curabitur quis ligula ac magna accumsan lacinia vel a sem.
            </p>
          </div>
        </Col>
      </Row>

      {/* Team Section */}
      <Row className="justify-content-center mt-5">
        <Col md={4} className="text-center animate__animated animate__fadeInLeft">
          <img
            src={`${process.env.PUBLIC_URL}/assets/owner.jpg`}
            alt="Team Member 1"
            className="img-fluid rounded-circle mb-4"
          />
          <h4 className="fw-bold">Anand Dubey</h4>
          <h6 className="text-muted">(ADDIE)</h6>
          <p className="text-secondary">Project Leader</p>
        </Col>
        <Col md={4} className="text-center animate__animated animate__fadeInRight">
          <img
            src={`${process.env.PUBLIC_URL}/assets/owner1.jpeg`}
            alt="Team Member 2"
            className="img-fluid rounded-circle mb-4"
          />
          <h4 className="fw-bold">Abhay Kotiya</h4>
          <h6 className="text-muted">(abhi)</h6>
          <p className="text-secondary">Frontend Designer</p>
        </Col>
      </Row>

      <Row className="justify-content-center mt-5">
        <Col md={4} className="text-center animate__animated animate__fadeInLeft">
          <img
            src={`${process.env.PUBLIC_URL}/assets/owner.jpg`}
            alt="Team Member 3"
            className="img-fluid rounded-circle mb-4"
          />
          <h4 className="fw-bold">Anand Dubey</h4>
          <h6 className="text-muted">(ADDIE)</h6>
          <p className="text-secondary">Project Manager</p>
        </Col>
        <Col md={4} className="text-center animate__animated animate__fadeInRight">
          <img
            src={`${process.env.PUBLIC_URL}/assets/owner.jpg`}
            alt="Team Member 4"
            className="img-fluid rounded-circle mb-4"
          />
          <h4 className="fw-bold">Anand Dubey</h4>
          <h6 className="text-muted">(ADDIE)</h6>
          <p className="text-secondary">Lead Developer</p>
        </Col>
        <Col md={4} className="text-center animate__animated animate__fadeInRight">
          <img
            src={`${process.env.PUBLIC_URL}/assets/owner.jpg`}
            alt="Team Member 5"
            className="img-fluid rounded-circle mb-4"
          />
          <h4 className="fw-bold">Anand Dubey</h4>
          <h6 className="text-muted">(ADDIE)</h6>
          <p className="text-secondary">Marketing Head</p>
        </Col>
      </Row>
    </div>
  );
};

export default AboutUs;
