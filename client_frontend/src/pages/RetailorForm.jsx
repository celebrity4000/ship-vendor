import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getData, putData } from "../global/server";
import { updateUser, logout } from "../redux/authSlice";
import bgImage from "../assets/formBg.png";
import logo from "../assets/commonvendorLogo.png";
import { storage } from "../../configuration";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Modal from "../components/Modal"; // Import Modal component

const RetailerForm = () => {
  const userId = useSelector((state) => state.auth.user._id);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formRef = useRef();

  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false); // State to show/hide modal

  useEffect(() => {
    const fetchRetailerData = async () => {
      try {
        const response = await getData(`/retailer/${userId}`, token);
        const form = formRef.current;
        if (form && response) {
          form.companyName.value = response.userData?.companyName || "";
          form.firstName.value = response.userData?.firstName || "";
          form.lastName.value = response.userData?.lastName || "";
          form.phoneNumber.value = response.userData?.phoneNumber || "";
          form.yearsBusiness.value = response.userData?.yearsBusiness || "";
          form.taxId.value = response.userData?.taxId || "";
        }
      } catch (error) {
        console.log("Error fetching retailer data", error);
      }
    };

    if (userId) {
      fetchRetailerData();
    }
  }, [userId, token]);

  const uploadBusinessFile = async (file) => {
    if (!file) {
      setError("No PDF file selected.");
      return null;
    }

    const storageRef = ref(storage, `businessFiles/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          setUploading(true);
          setError("");
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadStatus(`Upload is ${progress.toFixed(0)}% done`);
        },
        (error) => {
          console.error("Upload failed:", error);
          setUploading(false);
          setError("Upload failed. Please try again.");
          reject(error);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            console.log("Uploaded file available at:", downloadURL);
            setUploading(false);
            setUploadStatus("Upload successful!");
            resolve(downloadURL);
          } catch (error) {
            setUploading(false);
            setError("Failed to retrieve download URL.");
            reject(error);
          }
        }
      );
    });
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    const formData = new FormData(formRef.current);
    const businessFile = formData.get("businessFile");

    try {
      let businessFileUrl = "";
      if (businessFile && businessFile instanceof File) {
        businessFileUrl = await uploadBusinessFile(businessFile);
        console.log("Business File URL:", businessFileUrl);
      }

      if (businessFileUrl) {
        formData.append("businessFile", businessFileUrl);
      }

      const imageFile = formData.get("file");
      if (!imageFile) {
        formData.delete("file");
      }

      const response = await putData(
        `/retailer/${userId}`,
        formData,
        token,
        "media"
      );

      console.log("Retailer data updated successfully:", response);

      dispatch(
        updateUser({
          token,
          user: response.userData,
          userType: "retailer",
        })
      );

      // Show modal on successful update
      setShowModal(true);
    } catch (error) {
      console.log("Error updating retailer data", error);
      setError("Error updating retailer data. Please try again.");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    dispatch(logout());
    navigate("/");
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
            Retailers
          </h2>
          <h1 className="text-lg mb-3">
            Edit your business details and stay connected with suppliers!
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

            {/* Years in Business */}
            <div className="mb-4">
              <label
                className="block text-gray-700 mb-2 text-xl"
                htmlFor="yearsBusiness"
              >
                Years in Business <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="yearsBusiness"
                id="yearsBusiness"
                required
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Years in Business"
              />
            </div>

            {/* Tax ID */}
            <div className="mb-4">
              <label
                className="block text-gray-700 mb-2 text-xl"
                htmlFor="taxId"
              >
                Tax ID
              </label>
              <input
                type="text"
                name="taxId"
                id="taxId"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Tax ID"
              />
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

            {/* Business Reference Upload */}
            <div className="mb-4">
              <label
                className="block text-gray-700 mb-2 text-xl"
                htmlFor="businessFile"
              >
                Upload Business Reference (PDF)
              </label>
              <input
                type="file"
                name="businessFile"
                id="businessFile"
                accept=".pdf"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            {uploading && (
              <p className="text-blue-500 mb-4">Uploading... Please wait.</p>
            )}
            {uploadStatus && (
              <p className="text-green-500 mb-4">{uploadStatus}</p>
            )}
            {error && <p className="text-red-500 mb-4">{error}</p>}

            <button
              type="submit"
              className="bg-[#EC994B] text-white py-2 px-4 rounded hover:bg-[#d88242] transition w-full"
              disabled={uploading}
            >
              Update Details
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

export default RetailerForm;
