import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import { navConfig } from '../../config/navConfig';

const Header = ({ panel }) => {
  const navLinks = navConfig[panel];

  useEffect(() => {
    const handleScroll = () => {
      const nav = document.querySelector('.custom-nav-container');
      if (window.scrollY > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const renderNavLink = (link, index) => {
    if (link.dropdown) {
      return (
        <NavDropdown title={link.title} id={`nav-dropdown-${index}`} key={index} menuVariant="dark">
          {link.items.map((item, subIndex) => (
            item.divider ? (
              <NavDropdown.Divider key={subIndex} />
            ) : (
              <NavDropdown.Item as={Link} to={item.path} key={subIndex}>
                {item.label}
              </NavDropdown.Item>
            )
          ))}
        </NavDropdown>
      );
    }

    return (
      <Nav.Link as={Link} to={link.path} key={index} className="nav-link-animated">
        {link.label}
      </Nav.Link>
    );
  };

  return (
    <Navbar expand="lg" className="custom-nav-container navbar-dark fixed-top  transition-all duration-300" >
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="logo-container">
          <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="CareerVista" className="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarSupportedContent" />
        <Navbar.Collapse id="navbarSupportedContent">
          <Nav className="ms-auto mb-2 mb-lg-0">
            {navLinks.map((link, index) => renderNavLink(link, index))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
