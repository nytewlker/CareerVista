import React, { useState } from "react";
import axios from "axios";
import {
  Container,  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,

} from "@mui/material";
import { Form, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
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
            <h2>Welcome Back !</h2>
            <p className="lead">
              Choose the typfe o account, Which may poceed!
            </p>
          </div>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <div className="form-conatianer slidInUp">
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={12}>
                  <FormControl fullWidth className="role-select">
                    <InputLabel>Role</InputLabel>
                    <Select value={role} onChange={handleRoleChange} label="Role">
                      <MenuItem value="employee">Employee</MenuItem>
                      <MenuItem value="recruiter">Recruiter</MenuItem>
                    </Select>
                  </FormControl>
                </Col>
              </Row>
              <Row>
              <Col md={12}>
             
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
                className="input-field" // Added className for styling consistency
                
              />
</Col>
</Row>
<Row>
                <Col md={12}>
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
                className="input-field" // Added className for styling consistency
                
              />
               </Col>
               </Row>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                className="submit-button" // Added className for styling consistency
              >
                Login
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
