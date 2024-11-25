import AboutUs from "./AboutUs";
import ContactUs from "./ContactUs";
import Hero from "./Hero";

const Home = () => {
  return (
    <>
      <Hero />
      <AboutUs id="about" />
      <ContactUs id="contact" />
    </>
  );
};

export default Home;
