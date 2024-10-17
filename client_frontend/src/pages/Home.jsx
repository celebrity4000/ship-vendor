import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import logo from "../assets/logo.png";
import shop from "../assets/shop.png";
import herotwo from "../assets/shop2.png";
import signup from "../assets/signup.png";
import profile from "../assets/profile.png";
import uplod from "../assets/upload.png";
import link from "../assets/link.png";
import rightarrow from "../assets/rightarrow.png";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on component mount
  }, []);

  return (
    <div>
      <Navbar />
      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row min-h-[90vh] px-8 lg:px-20 py-10 lg:py-0">
        <div className="mt-10 lg:mt-20 lg:pl-10 w-full lg:w-1/2">
          <img src={logo} className="w-[70%] lg:w-[50%] mx-auto lg:mx-0" />
          <h1 className="text-[#222224] text-4xl lg:text-6xl w-[90%] lg:w-[65%] mx-auto lg:mx-0 text-center lg:text-left mt-5 lg:mt-0">
            The Common Vendor
          </h1>
          <h2 className="text-[#797979] text-lg lg:text-2xl w-[90%] lg:w-[70%] mx-auto lg:mx-0 mt-5 text-center lg:text-left">
            A one-stop-shop for connecting, onboarding, and interacting with
            vendors and retailers.
          </h2>
        </div>
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end mt-10 lg:mt-20">
          <img src={shop} className="w-[90%] lg:w-[70%] object-contain" />
        </div>
      </div>

      {/* Let's Get Started Section */}
      <div className="flex flex-col items-center mt-10 lg:mt-36">
        <h1 className="text-3xl lg:text-5xl text-[#222224] mb-6 lg:mb-12">
          LET’S GET STARTED
        </h1>
        <div className="flex flex-col lg:flex-row justify-center gap-8 lg:gap-16 my-10 lg:my-20">
          <Link
            to="/signup"
            className="bg-[#EC994B] px-8 lg:px-10 py-3 rounded-[30px] text-lg font-semibold text-white"
          >
            RETAILERS
          </Link>
          <Link
            to="/signup"
            className="text-[#EC994B] border-2 border-[#EC994B] px-8 lg:px-10 py-3 rounded-[30px] text-lg font-semibold"
          >
            SUPPLIERS
          </Link>
        </div>
      </div>

      {/* About Us Section */}
      <div className="flex flex-col lg:flex-row items-center lg:px-20 py-10 lg:py-0">
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
          <img src={herotwo} className="w-[80%] lg:w-[80%] ml-0 lg:ml-20" />
        </div>
        <div className="w-full lg:w-1/2 pt-10 lg:pt-20 flex flex-col gap-5 px-8 lg:px-0">
          <h1 className="text-[#222224] text-4xl lg:text-5xl text-center lg:text-left">
            ABOUT US
          </h1>
          <h1 className="text-[#797979] text-lg lg:text-2xl w-full lg:w-[85%] text-center lg:text-left mx-auto lg:mx-0">
            The retailer and distributor relationship is critical and invaluable
            - once you’ve jumped over the hurdles to engage in a working
            relationship. We believe there is a need and an opportunity to
            streamline the vetting, onboarding, and communication process.
          </h1>
          <div className="flex justify-center lg:justify-start">
            <Link
              to="/about"
              className="bg-[#EC994B] px-8 py-2 rounded-[30px] text-lg text-white w-[55%] lg:w-[40%] text-center"
            >
              LEARN MORE
            </Link>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="flex flex-col items-center mt-20 px-8 lg:px-0">
        <h1 className="text-3xl lg:text-5xl text-[#222224]">HOW IT WORKS</h1>
        <div className="flex flex-col lg:flex-row gap-10 my-10 lg:my-20 items-center">
          <div className="flex flex-col justify-center items-center">
            <img src={signup} className="w-20 lg:w-32 h-20 lg:h-32" />
            <h1 className="text-[#222224] text-lg">SIGN UP</h1>
          </div>
          <div className="flex items-center hidden lg:flex">
            <img src={rightarrow} className="w-12 lg:w-20 h-12 lg:h-20" />
          </div>
          <div className="flex flex-col justify-center items-center">
            <img src={profile} className="w-20 lg:w-32 h-20 lg:h-32" />
            <h1 className="text-[#222224] text-lg">CREATE PROFILE</h1>
          </div>
          <div className="flex items-center hidden lg:flex">
            <img src={rightarrow} className="w-12 lg:w-20 h-12 lg:h-20" />
          </div>
          <div className="flex flex-col justify-center items-center">
            <img src={uplod} className="w-20 lg:w-32 h-20 lg:h-32" />
            <h1 className="text-[#222224] text-lg">UPLOAD FORMS</h1>
          </div>
          <div className="flex items-center hidden lg:flex">
            <img src={rightarrow} className="w-12 lg:w-20 h-12 lg:h-20" />
          </div>
          <div className="flex flex-col justify-between items-center">
            <img src={link} className="w-20 lg:w-28 h-20 lg:h-28" />
            <h1 className="text-[#222224] text-lg">CONNECT</h1>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
