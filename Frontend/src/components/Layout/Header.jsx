import React from "react";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
// import './Navigation.css'; // Import your CSS file for navigation styling
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const Header = () => {
  const openNav = () => {
    // Implement your openNav function logic if needed
    // Example: To toggle a navigation drawer or overlay
  };

  return (
    <nav className="navbar navbar-expand-lg custom-nav-container">
      <Link to="/" className="navbar-brand">
        <img src={`${process.env.PUBLIC_URL}/assets/logo.png`} alt="CareerVista" />
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link to="/" className="nav-link" onClick={openNav}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/AboutUs" className="nav-link" onClick={openNav}>
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/ContactUs" className="nav-link" onClick={openNav}>
              ContactUs
            </Link>
          </li>
          <NavDropdown
            id="nav-dropdown-dark-example"
            title="Join US"
            menuVariant="dark"
          >
            <NavDropdown.Item as={Link} to="/RecruiterLoginForm">
              Login Recruiter
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/EmployeeLoginForm">
              Login Employee
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item as={Link} to="/RegistrationForm">
              Register Yourself
            </NavDropdown.Item>
          </NavDropdown>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
