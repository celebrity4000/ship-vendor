import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on component mount
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center mt-16 px-4 lg:px-0">
        <h1 className="text-3xl lg:text-5xl text-[#222224] text-center">
          CONTACT US
        </h1>
        <div className="flex flex-col lg:flex-row w-full lg:w-[90%] bg-[#EC994B] rounded-xl mb-20 items-center lg:items-start justify-between px-4 lg:px-20 py-8 lg:py-0 mt-10 space-y-8 lg:space-y-0">
          {/* Left div - Form */}
          <div className="w-full lg:w-1/2 px-0 lg:px-20 pb-0 lg:pb-20 mt-0 lg:mt-20">
            <div className="bg-[#e0e0e08e] p-6 lg:p-8 rounded-lg shadow-lg">
              <form>
                <div className="flex flex-col lg:flex-row gap-4 mb-4">
                  {/* First Name Input */}
                  <div className="w-full lg:w-1/2">
                    <label
                      className="block text-gray-700 mb-2"
                      htmlFor="firstName"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      placeholder="First Name"
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  {/* Last Name Input */}
                  <div className="w-full lg:w-1/2">
                    <label
                      className="block text-gray-700 mb-2"
                      htmlFor="lastName"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      placeholder="Last Name"
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="phone">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    placeholder="Phone Number"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="message">
                    Message
                  </label>
                  <textarea
                    id="message"
                    placeholder="Message"
                    className="w-full p-2 border border-gray-300 rounded h-32"
                  ></textarea>
                </div>
                <button className="bg-[#EC994B] text-white py-2 px-4 rounded hover:bg-[#d88242] transition">
                  Submit
                </button>
              </form>
            </div>
          </div>

          {/* Right div - Contact Info */}
          <div className="w-full lg:w-1/2 flex flex-col gap-4 text-white px-4 lg:px-0">
            <h1 className="text-3xl lg:text-5xl leading-tight text-center lg:text-left">
              Let's talk about something great together
            </h1>
            <div className="flex gap-4 items-center text-lg lg:text-xl">
              <MdEmail /> <h1>contact@shiftvendor.com</h1>
            </div>
            <div className="flex gap-2 items-center text-lg lg:text-xl">
              <FaPhoneAlt /> <h1>+1 1010101010</h1>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
