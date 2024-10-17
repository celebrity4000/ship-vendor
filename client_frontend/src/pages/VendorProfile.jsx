import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; // For routing and accessing params
import Navbar from "../components/Navbar";
import { FaStar } from "react-icons/fa";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import { getData, postData } from "../global/server"; // Assuming postData is for making POST requests
import { useSelector } from "react-redux";

const VendorProfile = () => {
  const { id } = useParams(); // Get the vendor ID from URL parameters
  const token = useSelector((state) => state.auth.token); // Get token from Redux state
  const retailerId = useSelector((state) => state.auth.user?._id); // Safely access retailer ID
  const isAuth = useSelector((state) => state.auth.isAuth); // Check if user is authenticated
  const [vendorData, setVendorData] = useState(null); // State to store vendor data
  const [applicationStatus, setApplicationStatus] = useState(null); // State to store application status
  const [showMoreImages, setShowMoreImages] = useState(false); // For modal visibility

  const navigate = useNavigate(); // For navigation

  // Redirect to login page if user is not logged in
  useEffect(() => {
    if (!isAuth) {
      navigate("/login"); // Redirect to login page if not authenticated
    }
  }, [isAuth, navigate]);

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on component mount

    if (isAuth && id) {
      // Fetch vendor data and check application status based on the ID only if authenticated
      getVendorData();
      if (retailerId) checkApplicationStatus();
    }
  }, [id, retailerId, isAuth]);

  // Fetch vendor data by supplier ID
  const getVendorData = async () => {
    try {
      const response = await getData(`/supplier/${id}`, token);
      setVendorData(response?.userData || {});
    } catch (err) {
      console.error("Error fetching vendor data:", err);
    }
  };

  // Check if there is a recent application between the retailer and the supplier
  const checkApplicationStatus = async () => {
    try {
      const response = await getData(
        `/application/recent?retailerId=${retailerId}&supplierId=${id}`,
        token
      );
      if (response && response.status) {
        setApplicationStatus(response.status); // Set the status to 'pending', 'approved', or 'rejected'
      }
    } catch (err) {
      console.error("Error checking application status:", err);
    }
  };

  // Handle connect with vendor button click
  const handleConnectWithVendor = async () => {
    try {
      const applicationData = {
        retailer: retailerId,
        supplier: id,
        status: "pending",
      };
      const response = await postData("/application", applicationData, token);
      if (response) {
        setApplicationStatus(response.status); // Update the button text with the new application status
      }
    } catch (err) {
      console.error("Error creating application:", err);
    }
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <svg
          key={i}
          className={`w-4 h-4 ${
            i < fullStars ? "text-yellow-400" : "text-gray-300"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 .587l3.668 7.568L24 9.423l-6 5.847L19.336 24 12 20.201 4.664 24l1.336-8.73L0 9.423l8.332-1.268L12 .587z" />
        </svg>
      );
    }
    return stars;
  };

  return (
    <div>
      <Navbar />

      {vendorData ? (
        <div className="px-5 lg:px-20 py-10">
          {/* Vendor Image Section */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 h-auto">
            {/* Left column - large image */}
            <div className="col-span-2 lg:col-span-1">
              <img
                src={vendorData.bannerImg[0] || "default-image.jpg"} // Use default image if no banner image
                className="object-cover w-full h-60 lg:h-[255px] rounded-lg"
                alt="Main Vendor Shop"
              />
            </div>

            {/* Right column - smaller images */}
            {vendorData.bannerImg.slice(1, 3).map((img, index) => (
              <div key={index} className="relative">
                <img
                  src={img}
                  className="object-cover w-full h-60 lg:h-[255px] rounded-lg"
                  alt={`Vendor Shop Image ${index + 1}`}
                />
                {/* Display "Click here for more images" on the 3rd image if more than 3 images exist */}
                {index === 1 && vendorData.bannerImg.length > 3 && (
                  <div
                    className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center cursor-pointer"
                    onClick={() => setShowMoreImages(true)}
                  >
                    <p className="text-white text-lg font-semibold">
                      Click here for more images
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Vendor Info Section */}
          <div className="mt-10 flex flex-col lg:flex-row items-start justify-between">
            <div className="text-left mb-8 lg:mb-0">
              {/* Vendor Image and Name */}
              <h1 className="text-2xl font-semibold mb-2">
                {vendorData.companyName}
              </h1>
              <div className="flex items-center mb-4 mt-5">
                <img
                  src={vendorData.userImg}
                  alt="Vendor"
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <h1 className="text-xl font-semibold mb-2">
                  {vendorData?.firstName + " " + vendorData?.lastName}
                </h1>
              </div>
              <div className="flex flex-col space-y-2">
                {/* Ratings */}
                <div className="flex items-center space-x-1">
                  <FaStar className="text-yellow-400" />
                  <span>{vendorData.rating?.rate || 0}</span>
                  <span className="text-gray-500">
                    ({vendorData.rating?.ratedBy || 0} ratings)
                  </span>
                </div>
                {/* Industry */}
                <div className="flex items-center space-x-1 text-gray-500">
                  <span className="text-lg">{vendorData.industry}</span>
                </div>
              </div>
            </div>

            {/* Call to Action Buttons */}
            <div className="flex space-x-4">
              <div className="flex items-center space-x-1 cursor-pointer">
                <FaStar size={24} className="text-yellow-400" />
                <span className="text-gray-500">Tap to Rate</span>
              </div>

              {/* Disable the button and show status if there is a recent application */}
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
                onClick={handleConnectWithVendor}
                disabled={applicationStatus !== null}
              >
                {applicationStatus
                  ? `Application Status: ${applicationStatus}`
                  : "Connect with Vendor"}
              </button>
            </div>
          </div>

          {/* Products Section */}
          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-4">Products</h2>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {vendorData.products.length > 0 ? (
                vendorData.products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))
              ) : (
                <p>No products available for this vendor.</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="px-5 lg:px-20 py-10">Loading vendor data...</div>
      )}

      {/* Modal for showing more images */}
      {showMoreImages && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg max-w-2xl w-full relative">
            <button
              className="absolute top-2 right-2 text-2xl font-bold text-gray-800"
              onClick={() => setShowMoreImages(false)}
            >
              &times;
            </button>
            <h3 className="text-lg font-bold mb-4">All Images</h3>
            <div className="grid grid-cols-3 gap-2">
              {vendorData.bannerImg.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`full-${index}`}
                  className="w-full h-auto object-cover"
                />
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="h-[20vh]"></div>
      <Footer />
    </div>
  );
};

export default VendorProfile;
