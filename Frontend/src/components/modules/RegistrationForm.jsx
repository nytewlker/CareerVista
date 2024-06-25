import React, { useState } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { APIBASEURL } from "../../config";

const RegistrationForm = () => {
  const [role, setRole] = useState("employee"); // default role

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    company: "test"
  });

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${APIBASEURL}/${role}/register`,
        formData
      );
      console.log("Registration successful:", response.data);
      // You can redirect or show a success message here
    } catch (error) {
      console.error("Registration error:", error);
      // Handle error state or show error message
    }
  };

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={6}>
          <h2 className="text-center mb-4">Registration</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Choose Role:</Form.Label>
              <Form.Control
                as="select"
                value={role}
                onChange={handleRoleChange}
                name="role"
              >
                <option value="employee">Employee</option>
                <option value="recruiter">Recruiter</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" block>
              Register
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default RegistrationForm;
