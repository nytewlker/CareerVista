import React from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import "bootstrap/dist/css/bootstrap.min.css";
// import './Navigation.css'; // Import your CSS file for navigation styling

const Header = () => {
  const openNav = () => {
    // Implement your openNav function logic if needed
    // Example: To toggle a navigation drawer or overlay
  };

  return (
    <Navbar expand="lg" className="custom-nav-container">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src={`${process.env.PUBLIC_URL}/assets/logo.png`} alt="CareerVista" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarSupportedContent" />
        <Navbar.Collapse id="navbarSupportedContent">
          <Nav className="ms-auto mb-2 mb-lg-0">
            <Nav.Link as={Link} to="/" onClick={openNav}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/AboutUs" onClick={openNav}>
              About
            </Nav.Link>
            <Nav.Link as={Link} to="/ContactUs" onClick={openNav}>
              ContactUs
            </Nav.Link>
            <NavDropdown title="Join US" id="nav-dropdown-dark-example" menuVariant="dark">
              <NavDropdown.Item as={Link} to="/RegistrationForm">
                Register Yourself
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/LoginForm">
                Login Here
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/RegistrationForm">
                Admin Panel
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
