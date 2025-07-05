// views/Landing.jsx
import React from "react";
import HeroSection from "./HeroSection"; // 👈 correct relative import
import AboutSection from "./About";
import ContactBanner from "./ContactBanner";
import Services from "./Services";
import FAQs from "./FAQs";
import Benefits from "./Benefits";

const Landing = () => {
  return (
    <section>
      <HeroSection />
      <AboutSection />
      <Services/>
      <Benefits/>
      <FAQs/>
      <ContactBanner />
      {/* You can now add AboutSection, Services, etc. here */}
    </section>
  );
};

export default Landing;
