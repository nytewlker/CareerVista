import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import { Box, Typography, IconButton, TextField, Button } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';
import 'bootstrap/dist/css/bootstrap.min.css';


const Footer = () => {
  return (
    <Box className="footer bg-body-tertiary" sx={{ py: 3 }}>
      <Container>
        <Row>
          <Col md={4}>
            <Typography variant="h6" component="div">
              CareerVista
            </Typography>
            <Typography variant="body2" color="textSecondary">
              &copy; 2024 CareerVista. All rights reserved.
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Your trusted partner in finding your dream job. We connect job seekers with top employers across various industries.
            </Typography>
          </Col>
          <Col md={4}>
            <Typography variant="h6" component="div">
              Contact Us
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Email: support@careervista.com
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Phone: +1 234 567 890
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Address: 123 Career St, Job City, USA
            </Typography>
          </Col>
          <Col md={4}>
            <Typography variant="h6" component="div">
              Subscribe for Job Alerts
            </Typography>
            <form noValidate autoComplete="off">
              <TextField
                label="Email Address"
                variant="outlined"
                size="small"
                fullWidth
                sx={{ mb: 2 }}
              />
              <Button variant="contained" color="primary" fullWidth>
                Subscribe
              </Button>
            </form>
            <Typography variant="h6" component="div" sx={{ mt: 2 }}>
              Follow Us
            </Typography>
            <IconButton aria-label="facebook" href="https://www.facebook.com" target="_blank">
              <Facebook />
            </IconButton>
            <IconButton aria-label="twitter" href="https://www.twitter.com" target="_blank">
              <Twitter />
            </IconButton>
            <IconButton aria-label="instagram" href="https://www.instagram.com" target="_blank">
              <Instagram />
            </IconButton>
            <IconButton aria-label="linkedin" href="https://www.linkedin.com" target="_blank">
              <LinkedIn />
            </IconButton>
          </Col>
        </Row>
      </Container>
    </Box>
  );
};

export default Footer;
