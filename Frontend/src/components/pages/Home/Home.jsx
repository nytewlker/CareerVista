import AboutUs from "./AboutUs";
import ContactUs from "./ContactUs";
import Hero from "./Hero";

const Home = () => {
  return (
    <div className="main  z-10">
      <Hero />
      <AboutUs id="about" />
      <ContactUs id="contact" />
    </div>
  );
};

export default Home;
