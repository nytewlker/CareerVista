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
            className="d-block w-full object-cover h-[60vh] sm:h-[80vh] md:h-[85vh] lg:h-[90vh]"
            alt="Slide 1"
          />
          <Carousel.Caption className="custom-carousel-caption text-center text-white">
            <h5 className="text-3xl sm:text-4xl font-bold leading-tight">Searching for a job?</h5>
            <p className="text-lg sm:text-xl mb-3">
              Find the <span className="text-primary font-semibold">best startup</span> job that fits you
            </p>
            <Button
              variant="warning"
              className="btn-custom px-6 py-3 text-lg font-semibold rounded-md"
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
            className="d-block w-full object-cover h-[60vh] sm:h-[80vh] md:h-[85vh] lg:h-[90vh]"
            alt="Slide 2"
          />
          <Carousel.Caption className="custom-carousel-caption text-center text-white">
            <h5 className="text-3xl sm:text-4xl font-bold leading-tight">Join Our Community</h5>
            <p className="text-lg sm:text-xl mb-3">
              Explore opportunities in <span className="text-primary font-semibold">tech startups</span>
            </p>
            <Button
              variant="warning"
              className="btn-custom px-6 py-3 text-lg font-semibold rounded-md"
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
            className="d-block w-full object-cover h-[60vh] sm:h-[80vh] md:h-[85vh] lg:h-[90vh]"
            alt="Slide 3"
          />
          <Carousel.Caption className="custom-carousel-caption text-center text-white">
            <h5 className="text-3xl sm:text-4xl font-bold leading-tight">Career Growth</h5>
            <p className="text-lg sm:text-xl mb-3">
              Find jobs that <span className="text-primary font-semibold">accelerate your career</span>
            </p>
            <Button
              variant="warning"
              className="btn-custom px-6 py-3 text-lg font-semibold rounded-md"
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
          <h5 className="offcanvas-title text-xl font-semibold" id="offcanvasDescriptionLabel">
            Job Opportunities
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body text-lg">
          <p>
            Discover a variety of job opportunities that match your skills and career goals. Explore startup jobs, tech positions, and more. Join our community and take the next step in your career!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
