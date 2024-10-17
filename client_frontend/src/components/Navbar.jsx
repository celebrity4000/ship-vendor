import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice"; // Import logout action from Redux
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi"; // Icons for menu and close

const Navbar = () => {
  const { isAuth, user, userType } = useSelector((state) => state.auth); // Access auth state
  const dispatch = useDispatch(); // Initialize dispatch for Redux actions
  const navigate = useNavigate(); // Initialize navigate for redirection

  const [showDropdown, setShowDropdown] = useState(false); // State to show/hide dropdown
  const [showMobileMenu, setShowMobileMenu] = useState(false); // State to show/hide mobile menu

  // Redirect to signup if user is not authenticated and tries to access Retailer/Supplier
  useEffect(() => {
    const protectedRoutes = ["/retailerform", "/supplierform"];
    const currentPath = window.location.pathname;

    if (!isAuth && protectedRoutes.includes(currentPath)) {
      navigate("/signup");
    }
  }, [isAuth, navigate]);

  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action
    navigate("/"); // Redirect to home after logout
  };

  return (
    <div className="sticky top-0 z-50 bg-white shadow-md">
      <div className="flex justify-between items-center px-6 lg:px-20 py-5">
        <Link to="/" className="w-40">
          {/* Logo or Branding here */}
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex gap-5">
          <Link to="/">
            <h1 className="text-lg">Home</h1>
          </Link>
          <Link to="/about">
            <h1 className="text-lg">About</h1>
          </Link>

          {/* Conditionally render based on userType */}
          {userType === "retailer" ? (
            <>
              <Link to="/retailerform">
                <h1 className="text-lg">Retailer</h1>
              </Link>
              <Link to="/marketplace">
                <h1 className="text-lg">Marketplace</h1>
              </Link>
            </>
          ) : userType === "supplier" ? (
            <>
              <Link to="/supplierform">
                <h1 className="text-lg">Supplier</h1>
              </Link>
              <Link to="/applications">
                <h1 className="text-lg">Applications</h1>
              </Link>
            </>
          ) : (
            <Link to="/marketplace">
              <h1 className="text-lg">Marketplace</h1>
            </Link>
          )}
          <Link to="/contact">
            <h1 className="text-lg">Contact</h1>
          </Link>
        </div>

        {/* Desktop User Options */}
        <div className="hidden lg:flex gap-5 relative">
          {isAuth ? (
            <div className="flex items-center gap-3">
              {/* Display user image and greeting with clickable dropdown */}
              <div
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                {user?.userImg && (
                  <img
                    src={user.userImg}
                    alt="User profile"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                )}
                <h1 className="text-lg">Hi, {user?.firstName}</h1>
              </div>

              {/* Dropdown box */}
              {showDropdown && (
                <div className="absolute top-12 right-0 bg-white border rounded shadow-md p-3 flex flex-col items-center">
                  {userType === "supplier" && (
                    <Link
                      to="/supplierProfile"
                      className="block text-gray-700 hover:text-gray-900 mb-2"
                      onClick={() => setShowDropdown(false)}
                    >
                      Profile
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="text-red-500 hover:text-red-700"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                to="/signup"
                className="bg-[#EC994B] px-8 py-2 rounded-3xl text-white font-medium"
              >
                Signup
              </Link>
              <Link
                to="/login"
                className="bg-[#EC994B] px-8 py-2 rounded-3xl text-white font-medium"
              >
                Login
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="lg:hidden flex items-center">
          <button
            className="text-3xl"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            {showMobileMenu ? <HiOutlineX /> : <HiOutlineMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-white z-40 flex flex-col items-start py-10 px-10 shadow-md transition-all duration-500 ease-in-out transform ${
          showMobileMenu ? "translate-y-0" : "-translate-y-full"
        }`}
        style={{
          height:
            isAuth && userType === "retailer"
              ? "60vh"
              : userType === "supplier"
              ? "66vh"
              : "50vh",
        }}
      >
        {/* Close button */}
        <button
          className="text-3xl absolute top-4 right-4"
          onClick={() => setShowMobileMenu(false)}
        >
          <HiOutlineX />
        </button>
        <Link
          to="/"
          onClick={() => setShowMobileMenu(false)}
          className="text-lg py-2"
        >
          Home
        </Link>
        <Link
          to="/about"
          onClick={() => setShowMobileMenu(false)}
          className="text-lg py-2"
        >
          About
        </Link>
        {userType === "retailer" ? (
          <>
            <Link
              to="/retailerform"
              onClick={() => setShowMobileMenu(false)}
              className="text-lg py-2"
            >
              Retailer
            </Link>
            <Link
              to="/marketplace"
              onClick={() => setShowMobileMenu(false)}
              className="text-lg py-2"
            >
              Marketplace
            </Link>
          </>
        ) : userType === "supplier" ? (
          <>
            <Link
              to="/supplierform"
              onClick={() => setShowMobileMenu(false)}
              className="text-lg py-2"
            >
              Supplier
            </Link>
            <Link
              to="/applications"
              onClick={() => setShowMobileMenu(false)}
              className="text-lg py-2"
            >
              Applications
            </Link>
            <Link
              to="/supplierProfile"
              onClick={() => setShowMobileMenu(false)}
              className="text-lg py-2"
            >
              Profile
            </Link>
          </>
        ) : (
          <Link
            to="/marketplace"
            onClick={() => setShowMobileMenu(false)}
            className="text-lg py-2"
          >
            Marketplace
          </Link>
        )}
        <Link
          to="/contact"
          onClick={() => setShowMobileMenu(false)}
          className="text-lg py-2"
        >
          Contact
        </Link>

        {/* Auth Options */}
        <div
          className={`flex flex-col items-start gap-4 mt-5 transform transition-all duration-500 ease-in-out ${
            showMobileMenu ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          {isAuth ? (
            <div className="flex flex-col items-start gap-4">
              <div className="flex flex-col items-start gap-3">
                {user?.userImg && (
                  <img
                    src={user.userImg}
                    alt="User profile"
                    className="w-20 h-20 rounded-full object-cover"
                  />
                )}
                <h1 className="text-lg">Hi, {user?.firstName}</h1>
              </div>
              <button
                onClick={() => {
                  handleLogout();
                  setShowMobileMenu(false);
                }}
                className="text-red-500 hover:text-red-700"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <Link
                to="/signup"
                onClick={() => setShowMobileMenu(false)}
                className="bg-[#EC994B] px-8 py-2 rounded-3xl text-white font-medium"
              >
                Signup
              </Link>
              <Link
                to="/login"
                onClick={() => setShowMobileMenu(false)}
                className="bg-[#EC994B] px-8 py-2 rounded-3xl text-white font-medium"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
