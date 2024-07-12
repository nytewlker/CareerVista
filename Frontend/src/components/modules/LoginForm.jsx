import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Alert,
} from "@mui/material";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { APIBASEURL } from "../../config";
import "./LoginForm.css"; // Import the external CSS file for styling

const LoginForm = () => {
  const [role, setRole] = useState("employee"); // default role
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

      // Redirect based on role
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
      <Box className="login-box">
        <Typography variant="h4" align="center" gutterBottom className="title">
          Login
        </Typography>
        <Form onSubmit={handleSubmit}>
          {error && <Alert severity="error">{error}</Alert>}
          <FormControl fullWidth sx={{ mb: 3 }}>
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
            sx={{ mb: 3 }}
            InputProps={{ className: 'icon envelope-icon' }}
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
            sx={{ mb: 3 }}
            InputProps={{ className: 'icon lock-icon' }}
          />

          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
          >
            Login
          </Button>
        </Form>
      </Box>
    </Container>
  );
};

export default LoginForm;
