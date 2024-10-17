import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getData, putData } from "../global/server";
import { updateUser, logout } from "../redux/authSlice";
import bgImage from "../assets/formBg.png";
import logo from "../assets/commonvendorLogo.png";
import Modal from "../components/Modal"; // Import Modal component

const SupplierForm = () => {
  const userId = useSelector((state) => state.auth.user._id);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formRef = useRef();
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false); // State to show/hide modal

  const industries = [
    "Seafood",
    "Produce",
    "Paper Goods",
    "Pork",
    "Merch",
    "Dairy",
    "Cleaning Supplies",
    "Beef",
    "Chicken",
    "Beverages",
  ];

  useEffect(() => {
    const fetchSupplierData = async () => {
      try {
        const response = await getData(`/supplier/${userId}`, token);
        const form = formRef.current;
        if (form && response) {
          form.companyName.value = response.userData?.companyName || "";
          form.firstName.value = response.userData?.firstName || "";
          form.lastName.value = response.userData?.lastName || "";
          form.website.value = response.userData?.website || "";
          form.phoneNumber.value = response.userData?.phoneNumber || "";
          setSelectedIndustry(response.userData?.industry || "");
        }
      } catch (error) {
        console.log("Error fetching supplier data", error);
      }
    };

    if (userId) {
      fetchSupplierData();
    }
  }, [userId, token]);

  const handleIndustryChange = (event) => {
    setSelectedIndustry(event.target.value);
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(formRef.current);

    try {
      const response = await putData(
        `/supplier/${userId}`,
        formData,
        token,
        "media"
      );

      console.log("Supplier data updated successfully:", response);

      // Show modal on successful update
      setShowModal(true);
    } catch (error) {
      console.log("Error updating supplier data", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle closing of the modal
  const handleCloseModal = () => {
    setShowModal(false);
    dispatch(logout()); // Logout user
    navigate("/"); // Redirect to login page
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Navbar />
      <img src={logo} className="w-56 mx-auto" />
      <div className="flex flex-col min-h-screen relative h-[140vh] md:h-[150vh] md:pl-[10%] p-5">
        <div className="text-start">
          <h2 className="text-4xl font-semibold mb-3 text-[#EC994B]">
            Suppliers
          </h2>
          <h1 className="text-lg mb-3">
            Edit your business details and stay connected with retailers!
          </h1>
        </div>
        <div className="flex w-full justify-end">
          <img src={bgImage} className="w-[80%]" />
        </div>

        <div className="bg-[#f7d5b5] bg-opacity-30 border mt-5 backdrop-blur-lg p-8 rounded-lg shadow-lg w-[90%] md:w-[40%] absolute md:top-20 top-28">
          <form
            ref={formRef}
            onSubmit={handleEdit}
            encType="multipart/form-data"
          >
            {/* Company Name */}
            <div className="mb-4">
              <label
                className="block text-gray-700 mb-2 text-xl"
                htmlFor="companyName"
              >
                Company Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="companyName"
                id="companyName"
                required
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Company Name"
              />
            </div>

            {/* First Name & Last Name */}
            <div className="flex gap-4 mb-4">
              <div className="w-1/2">
                <label
                  className="block text-gray-700 mb-2 text-xl"
                  htmlFor="firstName"
                >
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="First Name"
                />
              </div>
              <div className="w-1/2">
                <label
                  className="block text-gray-700 mb-2 text-xl"
                  htmlFor="lastName"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Last Name"
                />
              </div>
            </div>

            {/* Website */}
            <div className="mb-4">
              <label
                className="block text-gray-700 mb-2 text-xl"
                htmlFor="website"
              >
                Website
              </label>
              <input
                type="url"
                name="website"
                id="website"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Website"
              />
            </div>

            {/* Phone Number with Country Code */}
            <div className="mb-4">
              <label
                className="block text-gray-700 mb-2 text-xl"
                htmlFor="phoneNumber"
              >
                Phone Number with Country Code{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phoneNumber"
                id="phoneNumber"
                required
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="+1 123-456-7890"
              />
            </div>

            {/* Industry (Radio Buttons) */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2 text-xl">
                Industry
              </label>
              <div className="grid grid-cols-2 gap-2">
                {industries.map((industry) => (
                  <div key={industry}>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="industry"
                        value={industry}
                        checked={selectedIndustry === industry}
                        onChange={handleIndustryChange}
                        className="mr-2"
                      />
                      {industry}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Profile Image Upload */}
            <div className="mb-4">
              <label
                className="block text-gray-700 mb-2 text-xl"
                htmlFor="file"
              >
                Upload Profile Image
              </label>
              <input
                type="file"
                name="file"
                id="file"
                accept="image/*"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            {/* Banner Images Upload */}
            <div className="mb-4">
              <label
                className="block text-gray-700 mb-2 text-xl"
                htmlFor="bannerImages"
              >
                Upload Banner Images (up to 5)
              </label>
              <input
                type="file"
                name="files"
                id="bannerImages"
                accept="image/*"
                multiple
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`py-2 px-4 rounded w-full ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#EC994B] hover:bg-[#d88242] transition"
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update Details"}
            </button>
          </form>
        </div>
      </div>
      {showModal && (
        <Modal
          message="Your details have been updated successfully. Please try to log in after 1 business day."
          onClose={handleCloseModal}
        />
      )}
      <Footer />
    </div>
  );
};

export default SupplierForm;
