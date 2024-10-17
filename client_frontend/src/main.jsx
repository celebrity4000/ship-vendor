import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Contact from "./pages/Contact.jsx";
import About from "./pages/About.jsx";
import Marketplace from "./pages/Marketplace.jsx";
import VendorProfile from "./pages/VendorProfile.jsx";
import SupplierForm from "./pages/SupplierForm.jsx";
import RetailorForm from "./pages/RetailorForm.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import Applications from "./pages/Applications.jsx";
import SupplierProfile from "./pages/SupplierProfile.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/marketplace",
    element: <Marketplace />,
  },
  {
    path: "/marketplace/:id",
    element: <VendorProfile />,
  },
  {
    path: "/supplierform",
    element: <SupplierForm />,
  },
  {
    path: "/retailerform",
    element: <RetailorForm />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/applications",
    element: <Applications />,
  },
  {
    path: "/supplierProfile",
    element: <SupplierProfile />,
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
