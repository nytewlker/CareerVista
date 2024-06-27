import React from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
// import './ContactUs.css'; // Importing the CSS file

const ContactUs = () => {
  return (
    <div className="contact-section fade-in">
      <Container className="contact-container">
        <Row className="justify-content-center">
          <Col md={8}>
            <div className="contact-content text-center">
              <h2>Contact Us</h2>
              <p className="lead">
                Have a question or want to get in touch? Send us a message below!
              </p>
            </div>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md={8}>
            <div className="form-container bg-white rounded shadow">
              <Form>
                <Form.Group controlId="formBasicName" className="mb-3">
                  <Form.Label>Your Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter your name" />
                </Form.Group>

                <Form.Group controlId="formBasicEmail" className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicMessage" className="mb-4">
                  <Form.Label>Message</Form.Label>
                  <Form.Control as="textarea" rows={4} placeholder="Enter your message" />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  Submit
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ContactUs;
