import React from "react";
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Typography } from '@mui/material';
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const Home = () => {
  return (
    <Container>
      <div className="hero-container fade-in">
        {/* Hero Carousel */}
        <Carousel id="heroCarousel" interval={3000}>
          {/* Slide 1 */}
          <Carousel.Item>
            <img
              src={`${process.env.PUBLIC_URL}/assets/resized_img1.jpg`}
              className="d-block w-100"
              alt="Slide 1"
            />
            <Carousel.Caption>
              <h5>Searching for a job?</h5>
              <Typography variant="body1">
                Find the <span className="highlight">best startup</span> job that fits you
              </Typography>
              <Button
                variant="custom"
                className="orange-button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasDescription"
                aria-controls="offcanvasDescription"
              >
                Learn More
              </Button>
            </Carousel.Caption>
          </Carousel.Item>
          {/* Slide 2 */}
          <Carousel.Item>
            <img
              src={`${process.env.PUBLIC_URL}/assets/resized_img2.jpg`}
              className="d-block w-100"
              alt="Slide 2"
            />
            <Carousel.Caption>
              <h5>Join Our Community</h5>
              <Typography variant="body1">
                Explore opportunities in <span className="highlight">tech startups</span>
              </Typography>
              <Button
                variant="custom"
                className="orange-button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasDescription"
                aria-controls="offcanvasDescription"
              >
                Learn More
              </Button>
            </Carousel.Caption>
          </Carousel.Item>
          {/* Slide 3 */}
          <Carousel.Item>
            <img
              src={`${process.env.PUBLIC_URL}/assets/resized_img3.jpg`}
              className="d-block w-100"
              alt="Slide 3"
            />
            <Carousel.Caption>
              <h5>Career Growth</h5>
              <Typography variant="body1">
                Find jobs that <span className="highlight">accelerate your career</span>
              </Typography>
              <Button
                variant="custom"
                className="orange-button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasDescription"
                aria-controls="offcanvasDescription"
              >
                Learn More
              </Button>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>

        {/* Offcanvas Description */}
        <div
          className="offcanvas offcanvas-start"
          tabIndex="-1"
          id="offcanvasDescription"
          aria-labelledby="offcanvasDescriptionLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasDescriptionLabel">
              Job Opportunities
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <Typography variant="body1">
              Discover a variety of job opportunities that match your skills and career goals. Explore startup jobs, tech positions, and more. Join our community and take the next step in your career!
            </Typography>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Home;
