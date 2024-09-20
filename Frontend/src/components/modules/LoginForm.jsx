import React, { useState } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { APIBASEURL } from "../../config";

const LoginForm = () => {
  const [role, setRole] = useState("employee");
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
        `${APIBASEURL}/${role}/login`,
        formData
      );
      console.log("Login successful:", response.data);

      localStorage.setItem("user", JSON.stringify(response.data.user));

      if (role === "recruiter") {
        navigate("/recruiterhome");
      } else if (role === "employee") {
        navigate("/employeehome");
      } else {
        setError("Unknown role");
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <Container fluid className="login-container">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <div className="login-content text-center">
            <h2>Welcome Back!</h2>
            <p className="lead">
              Choose the type of account you want to log in to.
            </p>
          </div>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <div className="form-container slideInUp">
            <Form onSubmit={handleSubmit}>
              {error && (
                <Row>
                  <Col>
                    <div className="error-message">{error}</div>
                  </Col>
                </Row>
              )}
              <Row>
                <Col md={12}>
                  <Form.Group className="mb-3">
                    <Form.Label>Role</Form.Label>
                    <Form.Select value={role} onChange={handleRoleChange}>
                      <option value="employee">Employee</option>
                      <option value="recruiter">Recruiter</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter your password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Button
                variant="primary"
                type="submit"
                className="w-100 submit-button"
              >
                Login
              </Button>

              {/* Forgot Password Link */}
              <Row className="mt-3">
                <Col className="text-center">
                  <Link to="/forgot-password" className="forgot-password-link">
                    Forgot Password?
                  </Link>
                </Col>
              </Row>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
