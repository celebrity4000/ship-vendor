import React from "react";
import { LuFacebook } from "react-icons/lu";
import { FaInstagram } from "react-icons/fa6";
import { MdMailOutline } from "react-icons/md";
import { LuTwitter } from "react-icons/lu";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-[#222224] flex flex-col items-center p-5 md:p-10">
      <div className="flex flex-col md:flex-row justify-between w-full max-w-6xl">
        {/* Logo and Social Icons */}
        <div className="mb-10 md:mb-0">
          <h1 className="text-[#EC994B] text-2xl font-semibold mb-5">
            COMMON VENDOR
          </h1>
          {/* Uncomment to add social icons
          <div className="flex gap-5 mb-5">
            <div className="bg-white h-10 w-10 rounded-full flex justify-center items-center">
              <LuFacebook size={25} />
            </div>
            <div className="bg-white h-10 w-10 rounded-full flex justify-center items-center">
              <FaInstagram size={25} />
            </div>
          </div>
          <div className="flex gap-5">
            <div className="bg-white h-10 w-10 rounded-full flex justify-center items-center">
              <MdMailOutline size={25} />
            </div>
            <div className="bg-white h-10 w-10 rounded-full flex justify-center items-center">
              <LuTwitter size={25} />
            </div>
          </div> 
          */}
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-2 gap-5 md:gap-10 md:flex md:flex-row">
          <div className="flex flex-col gap-2 mb-5 md:mb-0">
            <h1 className="text-white font-medium">Our Product</h1>
            <h1 className="text-white/[0.7]">Support</h1>
            {/* Uncomment if needed
            <h1 className="text-white/[0.7]">Guide</h1> 
            */}
          </div>
          <div className="flex flex-col gap-2 mb-5 md:mb-0">
            <h1 className="text-white font-medium">Terms & policies</h1>
            <h1 className="text-white/[0.7]">Terms of Service</h1>
            <h1 className="text-white/[0.7]">Privacy Policy</h1>
          </div>
          <div className="flex flex-col gap-2 mb-5 md:mb-0">
            <h1 className="text-white font-medium">Company</h1>
            <Link to="/">
              <h1 className="text-white/[0.7]">Home</h1>
            </Link>
            <Link to="/about">
              <h1 className="text-white/[0.7]">About Us</h1>
            </Link>
            <Link to="/contact">
              <h1 className="text-white/[0.7]">Contact Us</h1>
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-white font-medium">Contact</h1>
            <h1 className="text-white/[0.7]">tcv@shifthospitality.com</h1>
          </div>
        </div>
      </div>
      <h1 className="text-white/[0.7] py-5 text-center">
        ©Shiftvendor - All Rights Reserved
      </h1>
    </div>
  );
};

export default Footer;
