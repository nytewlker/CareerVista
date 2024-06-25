import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "animate.css/animate.min.css"; // Import Animate.css for animations
// import "./Home.css"; // Import custom CSS

const Home = () => {
  return (
    <div className="hero-container fade-in">
      {/* Hero Carousel */}
      <div
        id="heroCarousel"
        className="carousel slide"
        data-bs-ride="carousel"
        data-bs-interval="3000"
      >
        {/* Carousel Indicators */}
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#heroCarousel"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#heroCarousel"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#heroCarousel"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        {/* Carousel Items */}
        <div className="carousel-inner">
          {/* Slide 1 */}
          <div className="carousel-item active">
            <img
              src={`${process.env.PUBLIC_URL}/assets/resized_img1.jpg`}
              className="d-block w-100"
              alt="Slide 1"
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>Searching for a job?</h5>
              <p>
                Find the <span className="highlight">best startup</span> job
                that fits you
              </p>
              <button
                className="btn btn-custom"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasDescription"
                aria-controls="offcanvasDescription"
              >
                Learn More
              </button>
            </div>
          </div>
          {/* Slide 2 */}
          <div className="carousel-item">
            <img
              src={`${process.env.PUBLIC_URL}/assets/resized_img2.jpg`}
              className="d-block w-100"
              alt="Slide 2"
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>Join Our Community</h5>
              <p>
                Explore opportunities in{" "}
                <span className="highlight">tech startups</span>
              </p>
              <button
                className="btn btn-custom"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasDescription"
                aria-controls="offcanvasDescription"
              >
                Learn More
              </button>
            </div>
          </div>
          {/* Slide 3 */}
          <div className="carousel-item">
            <img
              src={`${process.env.PUBLIC_URL}/assets/resized_img3.jpg`}
              className="d-block w-100"
              alt="Slide 3"
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>Career Growth</h5>
              <p>
                Find jobs that{" "}
                <span className="highlight">accelerate your career</span>
              </p>
              <button
                className="btn btn-custom"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasDescription"
                aria-controls="offcanvasDescription"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
        {/* Carousel Controls */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#heroCarousel"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#heroCarousel"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

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
            Discover a variety of job opportunities that match your skills and
            career goals. Explore startup jobs, tech positions, and more. Join
            our community and take the next step in your career!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
