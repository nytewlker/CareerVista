import React, { useState } from "react";
import axios from "axios";
import { Container, Grid, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Row, Col, Form } from "react-bootstrap";
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
          <Typography variant="h4" align="center" gutterBottom>Registration</Typography>
          <Form onSubmit={handleSubmit}>
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
              label="Name"
              variant="outlined"
              margin="normal"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />

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
              Register
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default RegistrationForm;
