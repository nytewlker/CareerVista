import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom if needed
// import './Footer.css'; // Import your CSS file for footer styling

const Footer = () => {
  return (
    <footer className="footer_section fade-in">
      <div className="container">
        <div className="row">
          <div className="col-md-4 footer-col">
            <div className="footer_content">
              <h4>Reach at...</h4>
              <div className="contact_link_box">
                <a href="https://www.google.com/maps/place/Cafesa+-+Pure+Veg.+Multi+Cuisine+Cafe+and+Restaurant/@26.8967209,75.765484,17z/data=!3m1!4b1!4m6!3m5!1s0x396db56e55bfca81:0x7e26b606a96c7fb3!8m2!3d26.8967161!4d75.7680589!16s%2Fg%2F11st4cs55b?entry=ttu">
                  <i className="fa fa-map-marker" aria-hidden="true"></i>
                  <span>Location</span>
                </a>
                <a href="tel:+916204332516">
                  <i className="fa fa-phone" aria-hidden="true"></i>
                  <span>Call +91 6204332516</span>
                </a>
                <a href="mailto:anand.dwivwdi@gmail.com">
                  <i className="fa fa-envelope" aria-hidden="true"></i>
                  <span>anand.dwivwdi@gmail.com</span>
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-4 footer-col">
            <div className="footer_detail">
              <Link to="/" className="footer-logo">
                CareerVista || ADDIE
              </Link>
              <p>
              "Explore Your Career Horizon with Career Vista"
              </p>
              <div className="footer_social">
                <a href="https://www.facebook.com"><i className="fa fa-facebook" aria-hidden="true"></i></a>
                <a href="https://www.twitter.com"><i className="fa fa-twitter" aria-hidden="true"></i></a>
                <a href="https://www.linkedin.com"><i className="fa fa-linkedin" aria-hidden="true"></i></a>
                <a href="https://www.instagram.com"><i className="fa fa-instagram" aria-hidden="true"></i></a>
                <a href="https://www.pinterest.com"><i className="fa fa-pinterest" aria-hidden="true"></i></a>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-info">
          <p>&copy; <span id="displayYear">{new Date().getFullYear()}</span> All Rights Reserved By <Link to="#">ADDIE</Link></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
