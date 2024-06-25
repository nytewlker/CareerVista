import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, Button } from 'react-bootstrap';
// import './ContactUs.css';

const ContactUs = () => {
  return (
    <div className="contact-section fade-in">
      <Container className="py-5 form-container">
        <div className="contact-content text-center text-white mb-5">
          <h2>Contact Us</h2>
          <p className="lead">
            Have a question or want to get in touch? Send us a message below!
          </p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <Form>
            <Container>
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
            </Container>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default ContactUs;
