import React from "react";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import { Typography, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  return (
    <div className="">
      {/* Hero Carousel */}
      <Carousel id="heroCarousel" interval={3000} indicators={false}>
        {/* Slide 1 */}
        <Carousel.Item>
          <img
            src={`${process.env.PUBLIC_URL}/assets/resized_img1.jpg`}
            className="d-block w-100  object-cover"
            alt="Slide 1"
            style={{ }}
          />
          <Carousel.Caption className="bg-black bg-opacity-50 rounded-lg p-4">
            <Typography variant="h5" className="text-white">
              Searching for a job?
            </Typography>
            <Typography variant="body1" className="text-gray-300 mt-2">
              Find the <span className="text-yellow-400">best startup</span> job
              that fits you.
            </Typography>
            <Button
              variant="warning"
              className="mt-3 px-4 py-2 font-bold shadow-md"
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
            className="d-block w-100 object-cover"
            alt="Slide 2"
            style={{ maxHeight: "600px" }}
          />
          <Carousel.Caption className="bg-black bg-opacity-50 rounded-lg p-4">
            <Typography variant="h5" className="text-white">
              Join Our Community
            </Typography>
            <Typography variant="body1" className="text-gray-300 mt-2">
              Explore opportunities in{" "}
              <span className="text-yellow-400">tech startups</span>.
            </Typography>
            <Button
              variant="warning"
              className="mt-3 px-4 py-2 font-bold shadow-md"
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
            className="d-block w-100 object-cover"
            alt="Slide 3"
            style={{ maxHeight: "600px" }}
          />
          <Carousel.Caption className="bg-black/50 rounded-lg p-4">
            <Typography variant="h5" className="text-white">
              Career Growth
            </Typography>
            <Typography variant="body1" className="text-gray-300 mt-2">
              Find jobs that{" "}
              <span className="text-yellow-400">accelerate your career</span>.
            </Typography>
            <Button
              variant="warning"
              className="mt-3 px-4 py-2 font-bold shadow-md"
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
          <Typography variant="h5" id="offcanvasDescriptionLabel">
            Job Opportunities
          </Typography>
          <IconButton
            type="button"
            className="text-gray-600"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          >
            <CloseIcon />
          </IconButton>
        </div>
        <div className="offcanvas-body">
          <Typography variant="body1" className="text-gray-800">
            Discover a variety of job opportunities that match your skills and
            career goals. Explore startup jobs, tech positions, and more. Join
            our community and take the next step in your career!
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default Home;
