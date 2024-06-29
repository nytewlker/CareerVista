import React from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import { navConfig } from "../../config/navConfig.js";

const Header = ({ panel }) => {
  const navLinks = navConfig[panel];

  return (
    <Navbar expand="lg" className="custom-nav-container">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src={`${process.env.PUBLIC_URL}/assets/logo.png`} alt="CareerVista" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarSupportedContent" />
        <Navbar.Collapse id="navbarSupportedContent">
          <Nav className="ms-auto mb-2 mb-lg-0">
            {navLinks.map((link, index) => {
              if (link.dropdown) {
                return (
                  <NavDropdown title={link.title} id={`nav-dropdown-${index}`} key={index} menuVariant="dark">
                    {link.items.map((item, subIndex) => (
                      item.divider ? <NavDropdown.Divider key={subIndex} /> :
                      <NavDropdown.Item as={Link} to={item.path} key={subIndex}>
                        {item.label}
                      </NavDropdown.Item>
                    ))}
                  </NavDropdown>
                );
              }
              return (
                <Nav.Link as={Link} to={link.path} key={index}>
                  {link.label}
                </Nav.Link>
              );
            })}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
