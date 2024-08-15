import React from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';

const ContactUs = () => {
  return (

    <Container fluid className="contact-container">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <div className="contact-content text-center">
            <h2>Contact Us</h2>
            <p className="lead">
              Have a question or want to get in touch? Send us a message below!
            </p>
          </div>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <div className="form-container slideInUp">
            <Form>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="formBasicName" className="mb-3">
                    <Form.Label>Your Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter your name" />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formBasicPhone" className="mb-3">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control type="text" placeholder="Enter your phone number" />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <Form.Group controlId="formBasicEmail" className="mb-3">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" placeholder="Enter your email" />
                    <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <Form.Group controlId="formBasicMessage" className="mb-4">
                    <Form.Label>Message</Form.Label>
                    <Form.Control as="textarea" rows={4} placeholder="Enter your message" />
                  </Form.Group>
                </Col>
              </Row>
              <Button variant="custom" type="submit" className="w-100">
                Submit
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>

  );
};

export default ContactUs;
