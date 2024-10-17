import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signupStart, signupSuccess, signupFailure } from "../redux/authSlice"; // Import Redux actions
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import logo from "../assets/commonvendorLogo.png";
import { postData } from "../global/server";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("retailer"); // Default userType is lowercase 'retailer'
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const url = userType === "retailer" ? "/retailer" : "/supplier"; // Define URL based on userType
    const signupData = { email, password };

    // Start signup process
    dispatch(signupStart());

    try {
      // Post the signup data
      const response = await postData(url, signupData, null, null);

      console.log(response.userData);

      // Dispatch success action
      dispatch(
        signupSuccess({
          token: response.token, // Assuming token is returned in response
          user: response.userData, // Assuming user data is returned in response
          userType, // Set lowercase userType in the Redux state
        })
      );

      // Redirect based on userType
      if (userType === "retailer") {
        navigate("/retailerform");
      } else {
        navigate("/supplierform");
      }
    } catch (error) {
      // Dispatch failure action with error message
      dispatch(signupFailure(error.message));
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on component mount
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center my-6">
        <img src={logo} className="w-40 lg:w-56 mx-auto" />
      </div>
      <div className="flex flex-col min-h-screen items-center px-4 lg:px-20 pb-10">
        <div className="text-center mb-5 w-full lg:w-[40%]">
          <h2 className="text-3xl lg:text-4xl font-semibold mb-3 text-[#EC994B]">
            Signup for Common Vendor
          </h2>
          <h1 className="text-base lg:text-lg mb-3">Register with us</h1>
        </div>

        <div className="bg-[#f7d5b5] bg-opacity-30 border backdrop-blur-lg p-8 rounded-lg shadow-lg w-full lg:w-[40%]">
          <form onSubmit={handleSignup}>
            {/* Email */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="email">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Email"
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="password">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Password"
              />
            </div>

            {/* User Type Dropdown */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="userType">
                Sign up as <span className="text-red-500">*</span>
              </label>
              <select
                id="userType"
                value={userType}
                onChange={(e) => setUserType(e.target.value.toLowerCase())} // Ensure lowercase value
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="retailer">Retailer</option>
                <option value="supplier">Supplier</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-[#EC994B] text-white py-2 px-4 rounded hover:bg-[#d88242] transition w-full"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;
