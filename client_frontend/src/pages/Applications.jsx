import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getData, putData } from "../global/server"; // Assuming these are your API request functions
import { useSelector } from "react-redux";

const Applications = () => {
  const [applications, setApplications] = useState([]); // State to store applications data
  const [filteredApplications, setFilteredApplications] = useState([]); // State for filtered applications based on tab
  const [activeTab, setActiveTab] = useState("pending"); // State for active tab
  const token = useSelector((state) => state.auth.token); // Get token from Redux state
  const supplierId = useSelector((state) => state.auth.user._id); // Get supplier ID from Redux state

  useEffect(() => {
    if (supplierId) {
      fetchApplications(); // Fetch applications when supplierId is available
    }
  }, [supplierId]);

  useEffect(() => {
    filterApplicationsByStatus(); // Filter applications whenever active tab or applications change
  }, [applications, activeTab]);

  // Fetch applications for the supplier
  const fetchApplications = async () => {
    try {
      // API call to get all applications for this supplier
      const response = await getData(
        `/application/supplier/${supplierId}`,
        token
      );
      if (response && Array.isArray(response)) {
        setApplications(response);
      } else {
        console.error("Unexpected response format:", response);
      }
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  // Filter applications based on status
  const filterApplicationsByStatus = () => {
    const filtered = applications.filter(
      (application) => application.status === activeTab
    );
    setFilteredApplications(filtered);
  };

  // Handle accept or reject application
  const handleApplicationStatusChange = async (applicationId, newStatus) => {
    try {
      // API call to update the status of the application
      const response = await putData(
        `/application/${applicationId}`,
        { status: newStatus },
        token
      );
      if (response) {
        fetchApplications(); // Refresh applications list after updating status
      } else {
        console.error("Error updating application status:", response);
      }
    } catch (error) {
      console.error("Error updating application status:", error);
    }
  };

  // Generate WhatsApp link based on phone number
  const generateWhatsAppLink = (phoneNumber) => {
    return `https://wa.me/${phoneNumber}`;
  };

  // Handle view document
  // const handleViewDocument = (documentUrl) => {
  //   if (documentUrl) {
  //     window.open(documentUrl, "_blank", "noopener,noreferrer");
  //   } else {
  //     alert("No document available to view.");
  //   }
  // };

  return (
    <div>
      <Navbar />
      <div className="px-4 md:px-20 py-10">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">Applications</h1>

          {/* Refresh Applications Button */}
          <button
            onClick={fetchApplications}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Refresh Applications
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="flex mb-6 space-x-4 overflow-x-auto">
          {["pending", "approved", "rejected"].map((status) => (
            <button
              key={status}
              className={`px-4 py-2 rounded whitespace-nowrap ${
                activeTab === status
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
              onClick={() => setActiveTab(status)}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        {/* Application Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Retailer Name</th>
                <th className="py-3 px-6 text-left">Company Name</th>
                <th className="py-3 px-6 text-left">Years in Business</th>
                <th className="py-3 px-6 text-left">Documents</th>
                <th className="py-3 px-6 text-center">Status</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {filteredApplications.length > 0 ? (
                filteredApplications.map((application) => (
                  <tr
                    key={application._id}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="py-3 px-6 text-left">
                      {application.retailer?.firstName}{" "}
                      {application.retailer?.lastName}
                    </td>
                    <td className="py-3 px-6 text-left">
                      {application.retailer?.companyName}
                    </td>
                    <td className="py-3 px-6 text-left">
                      {application.retailer?.yearsBusiness || "N/A"}
                    </td>
                    <td className="py-3 px-6 text-left">
                      {application.retailer?.businessFile ? (
                        <a
                          href={application.retailer?.businessFile}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline"
                        >
                          View Document
                        </a>
                      ) : (
                        "No Document"
                      )}
                    </td>
                    <td className="py-3 px-6 text-center">
                      <span
                        className={`py-1 px-3 rounded-full text-xs ${
                          application.status === "pending"
                            ? "bg-yellow-200 text-yellow-800"
                            : application.status === "approved"
                            ? "bg-green-200 text-green-800"
                            : "bg-red-200 text-red-800"
                        }`}
                      >
                        {application.status}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-center">
                      {application.status === "pending" ? (
                        <div className="flex item-center justify-center space-x-2">
                          <button
                            className="bg-green-500 text-white px-3 py-1 rounded"
                            onClick={() =>
                              handleApplicationStatusChange(
                                application._id,
                                "approved"
                              )
                            }
                          >
                            Accept
                          </button>
                          <button
                            className="bg-red-500 text-white px-3 py-1 rounded"
                            onClick={() =>
                              handleApplicationStatusChange(
                                application._id,
                                "rejected"
                              )
                            }
                          >
                            Reject
                          </button>
                        </div>
                      ) : application.status === "approved" ? (
                        <div className="flex flex-col items-center space-y-2">
                          <span className="text-gray-500">
                            Contact Details:
                          </span>
                          <span className="text-sm">
                            Email: {application.retailer?.email || "N/A"}
                          </span>
                          <span className="text-sm">
                            Phone: {application.retailer?.phoneNumber || "N/A"}
                          </span>
                          {application.retailer?.phoneNumber && (
                            <a
                              href={generateWhatsAppLink(
                                application.retailer?.phoneNumber
                              )}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-green-500 text-white px-4 py-1 rounded"
                            >
                              WhatsApp
                            </a>
                          )}
                        </div>
                      ) : (
                        <span className="text-gray-500">
                          No Actions Available
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-3 px-6 text-center">
                    No applications found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Applications;
