import { useRef, useEffect, MutableRefObject } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaUsers, FaTruck, FaBox, FaTags } from "react-icons/fa";
import logo from "../assets/logo.png"; // Import the logo

const SideNavbar = () => {
  const dropdownRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        // setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex h-full max-h-screen flex-col gap-2 relative bg-gray-100 dark:bg-gray-900 shadow-lg rounded-lg overflow-hidden">
      {/* Header with Logo and Dashboard Text */}
      <div className="flex h-[80px] items-center border-b border-gray-300 dark:border-gray-700 px-6 bg-white dark:bg-gray-800">
        {/* Logo and Dashboard Text */}
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Logo" className="h-12 w-auto" />
          <span className="text-lg text-gray-900 dark:text-white">
            CV Dashboard
          </span>
        </Link>
      </div>
      {/* Navigation */}
      <div className="flex-1 overflow-auto py-2 bg-white dark:bg-gray-800">
        <nav className="grid gap-1 px-4 text-md font-medium">
          {/* Retailers */}
          <NavLink
            to="/retailers"
            icon={<FaUsers className="h-4 w-4" />}
            isActive={location.pathname === "/retailers"}
          >
            Retailers
          </NavLink>

          {/* Suppliers */}
          <NavLink
            to="/suppliers"
            icon={<FaTruck className="h-4 w-4" />}
            isActive={location.pathname === "/suppliers"}
          >
            Suppliers
          </NavLink>

          {/* Products */}
          <NavLink
            to="/products"
            icon={<FaBox className="h-4 w-4" />}
            isActive={location.pathname === "/products"}
          >
            Products
          </NavLink>

          {/* Recent Deals */}
          <NavLink
            to="/recent-deals"
            icon={<FaTags className="h-4 w-4" />}
            isActive={location.pathname === "/recent-deals"}
          >
            Recent Deals
          </NavLink>
        </nav>
      </div>
    </div>
  );
};

// Reusable NavLink Component
const NavLink = ({
  to,
  icon,
  children,
  isActive,
}: {
  to: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  isActive: boolean;
}) => (
  <Link
    to={to}
    className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all 
    ${
      isActive
        ? "bg-primary text-white dark:bg-primary dark:text-white"
        : "text-gray-700 dark:text-gray-400 hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white"
    }`}
  >
    {icon}
    {children}
  </Link>
);

// Icons

// function BellIcon(props: any) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
//       <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
//     </svg>
//   );
// }

// function PackageIcon(props: any) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="m7.5 4.27 9 5.15" />
//       <path d="M21 8a2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
//       <path d="m3.3 7 8.7 5 8.7-5" />
//       <path d="M12 22V12" />
//     </svg>
//   );
// }

export default SideNavbar;
