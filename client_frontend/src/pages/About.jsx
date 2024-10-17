import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import aboutImg from "../assets/shop2.png";
import Footer from "../components/Footer";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on component mount
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center mt-16 relative h-auto min-h-[70vh] pb-20 px-4 md:px-0">
        <h1 className="text-4xl md:text-5xl text-[#222224] text-center mb-10">
          ABOUT US
        </h1>
        <div className="flex flex-col md:flex-row justify-between items-center w-full md:w-[80%] lg:w-[60%] mx-auto mt-10 space-y-10 md:space-y-0 md:space-x-10">
          <img
            src={aboutImg}
            className="w-[70%] md:w-[40%] rounded-full md:ml-10"
            alt="About"
          />
          <div className="md:w-[60%]">
            <h1 className="text-lg md:text-2xl text-[#797979]">
              The retailer and distributor relationship is critical and
              invaluable - once you’ve jumped over the hurdles to engage in a
              working relationship. We believe there is a need and an
              opportunity to streamline the vetting, onboarding, and
              communication process.
            </h1>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
