import React from "react";
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  return (
    <div className="hero-container fadeIn">
      {/* Hero Carousel */}
      <Carousel id="heroCarousel" interval={3000}>
        {/* Slide 1 */}
        <Carousel.Item>
          <img
            src={`${process.env.PUBLIC_URL}/assets/resized_img3.jpg`}
            className="d-block w-100"
            alt="Slide 1"
          />
          <Carousel.Caption className="custom-carousel-caption text-center">
            <h5 className="fw-bold">Searching for a job?</h5>
            <p className="mb-3">
              Find the <span className="text-primary fw-semibold">best startup</span> job that fits you
            </p>
            <Button
              variant="warning"
              className="btn-custom"
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
            src={`${process.env.PUBLIC_URL}/assets/hh1.jpg`}
            className="d-block w-100"
            alt="Slide 2"
          />
          <Carousel.Caption className="custom-carousel-caption text-center">
            <h5 className="fw-bold">Join Our Community</h5>
            <p className="mb-3">
              Explore opportunities in <span className="text-primary fw-semibold">tech startups</span>
            </p>
            <Button
              variant="warning"
              className="btn-custom"
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
            src={`${process.env.PUBLIC_URL}/assets/h1.jpg`}
            className="d-block w-100"
            alt="Slide 3"
          />
          <Carousel.Caption className="custom-carousel-caption text-center">
            <h5 className="fw-bold">Career Growth</h5>
            <p className="mb-3">
              Find jobs that <span className="text-primary fw-semibold">accelerate your career</span>
            </p>
            <Button
              variant="warning"
              className="btn-custom"
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
          <p>
            Discover a variety of job opportunities that match your skills and career goals. Explore startup jobs, tech positions, and more. Join our community and take the next step in your career!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
