import React, { useState } from "react";
import axios from "axios";
import { Container, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Row, Col, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Use useNavigate from react-router-dom v6
import { APIBASEURL } from "../../config";

const LoginForm = () => {
  const [role, setRole] = useState("employee"); // default role

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const navigate = useNavigate(); // Use useNavigate hook

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

      // const userRole = response.data.role; // Corrected variable extraction

      // // Store role and user data in localStorage or state management (like Redux)
      // localStorage.setItem("userRole", userRole);

      // Redirect based on role
      if (role === "recruiter") {
        navigate("/RecruiterHome"); // Ensure this path matches your router configuration
      } else if (role === "employee") {
        navigate("/EmployeeHome"); // Ensure this path matches your router configuration
      } else {
        setError("Unknown role");
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={6}>
          <Typography variant="h4" align="center" gutterBottom>Login</Typography>
          <Form onSubmit={handleSubmit}>
            {error && <div className="alert alert-danger">{error}</div>}
            
            <FormControl fullWidth variant="outlined" sx={{ marginBottom: 2 }}>
              <InputLabel id="role-label">Choose Role</InputLabel>
              <Select
                labelId="role-label"
                id="role-select"
                value={role}
                onChange={handleRoleChange}
                label="Choose Role"
                name="role"
              >
                <MenuItem value="employee">Employee</MenuItem>
                <MenuItem value="recruiter">Recruiter</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Email address"
              variant="outlined"
              margin="normal"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              margin="normal"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <Button variant="contained" type="submit" color="primary" fullWidth sx={{ marginTop: 2 }}>
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
