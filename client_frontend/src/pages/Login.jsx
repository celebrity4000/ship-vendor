import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signupStart, signupSuccess, signupFailure } from "../redux/authSlice";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import logo from "../assets/commonvendorLogo.png";
import { postData } from "../global/server";
import Modal from "../components/Modal"; // Import the Modal component

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("retailer");
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false); // State to show/hide modal
  const [modalMessage, setModalMessage] = useState(""); // State for modal message

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const url = userType === "retailer" ? "/retailer/login" : "/supplier/login";
    const loginData = { email, password };

    // Start login process
    dispatch(signupStart());
    setError(null);

    try {
      // Post the login data
      const response = await postData(url, loginData, null, null);

      if (!response.token) {
        throw new Error("Login failed, please check your credentials.");
      }

      console.log(response);

      // Check the application status before dispatching success action
      const { applicationStatus } = response.userData;
      if (applicationStatus === "pending" || applicationStatus === "rejected") {
        const statusMessage =
          applicationStatus === "pending"
            ? "Your application is still pending. Please try again later."
            : "Your application was rejected. Please contact support for further assistance.";
        setModalMessage(statusMessage); // Set modal message
        setShowModal(true); // Show modal with message
        dispatch(signupFailure(statusMessage)); // Dispatch failure action
        return; // Do not proceed with login success
      }

      // Dispatch success action if application status is accepted
      dispatch(
        signupSuccess({
          token: response.token,
          user: response.userData,
          userType,
        })
      );

      // Redirect based on userType
      if (userType === "supplier") {
        navigate("/supplierProfile");
      } else {
        navigate("/marketplace");
      }
    } catch (error) {
      // Set the error message to display it on the UI
      setError("Email or password is incorrect. Please try again.");
      dispatch(signupFailure(error.message));
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
    setModalMessage(""); // Reset modal message
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center my-6">
        <img src={logo} className="w-40 lg:w-56 mx-auto" />
      </div>
      <div className="flex flex-col min-h-screen items-center px-4 lg:px-20 pb-10">
        <div className="text-center mb-5 w-full lg:w-[40%]">
          <h2 className="text-3xl lg:text-4xl font-semibold mb-3 text-[#EC994B]">
            Login to Common Vendor
          </h2>
          <h1 className="text-base lg:text-lg mb-3">Login with your account</h1>
        </div>

        <div className="bg-[#f7d5b5] bg-opacity-30 border backdrop-blur-lg p-8 rounded-lg shadow-lg w-full lg:w-[40%]">
          <form onSubmit={handleLogin}>
            {/* Display Error Message */}
            {error && <p className="text-red-500 mb-4">{error}</p>}

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
                Login as <span className="text-red-500">*</span>
              </label>
              <select
                id="userType"
                value={userType}
                onChange={(e) => setUserType(e.target.value.toLowerCase())}
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

      {/* Modal for Application Status Error */}
      {showModal && <Modal message={modalMessage} onClose={handleCloseModal} />}

      <Footer />
    </div>
  );
};

export default Login;
