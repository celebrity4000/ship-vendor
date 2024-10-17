import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { IoMdClose } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import Footer from "../components/Footer";
import MarketplaceCard from "../components/MarketPlaceCard";
import { getData } from "../global/server";

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]); // State to hold supplier data

  // Fetch supplier data from the API
  useEffect(() => {
    getSuppliers();
  }, []);

  const getSuppliers = async () => {
    try {
      const response = await getData("/supplier", null);
      console.log(response);

      // Filter suppliers with approved applicationStatus and a non-empty companyName
      const filteredResponse = response?.suppliers?.filter(
        (supplier) =>
          supplier.applicationStatus === "accepted" && // Check for approved status
          supplier.companyName &&
          supplier.companyName.trim() !== ""
      );

      setSuppliers(filteredResponse || []);
    } catch (err) {
      console.error("Error fetching suppliers:", err);
    }
  };

  // Get all unique categories (industries) from the supplier data
  const allCategories = [
    ...new Set(suppliers.map((item) => item.industry).filter(Boolean)),
  ];

  // Function to handle sorting
  const handleSort = (data) => {
    if (sortOption === "rating") {
      return data.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
    }
    return data;
  };

  // Function to handle search and filtering by category (industry)
  const handleSearch = () => {
    return suppliers.filter((item) => {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        item.companyName?.toLowerCase().includes(query) ||
        item.industry?.toLowerCase().includes(query);

      const matchesCategories =
        selectedCategories.length === 0 ||
        selectedCategories.includes(item.industry);

      return matchesSearch && matchesCategories;
    });
  };

  // Function to handle category selection
  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSortOption("");
    setSelectedCategories([]);
  };

  const filteredData = handleSearch();
  const sortedData = handleSort(filteredData);

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on component mount
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex flex-col lg:flex-row px-5 lg:px-20 mt-10">
        {/* Sidebar - Categories */}
        <div className="lg:w-1/6 w-full lg:block mb-8 lg:mb-0">
          <div className="border p-3 rounded-lg">
            <h3 className="font-semibold text-lg mb-3">Select Industries</h3>
            <ul className="space-y-2">
              {allCategories.map((category, index) => (
                <li key={index}>
                  <span
                    className={`block text-sm border px-2 py-1 rounded cursor-pointer w-full ${
                      selectedCategories.includes(category)
                        ? "bg-[#EC994B] text-white"
                        : ""
                    }`}
                    onClick={() => handleCategoryChange(category)}
                  >
                    {category}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Main Content - Products */}
        <div className="lg:w-5/6 w-full md:ml-10">
          {/* Search and Sort Section */}
          <div className="flex flex-col lg:flex-row justify-between mb-5 space-y-4 lg:space-y-0 lg:space-x-4">
            {/* Search Bar */}
            <div className="flex w-full lg:w-[60%] relative border rounded-lg">
              <input
                type="text"
                className="px-4 py-2 w-full rounded-l-lg"
                placeholder="Search by company name or industry"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <IoMdClose
                  size={20}
                  className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                  onClick={clearFilters}
                />
              )}
              <button className="absolute right-2 my-1 p-2 bg-[#fd610c] rounded-md">
                <IoSearch color="white" />
              </button>
            </div>

            {/* Sort Dropdown */}
            <select
              className="border px-4 py-2 rounded-lg w-full lg:w-auto"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="">Sort by</option>
              <option value="rating">Rating</option>
            </select>
          </div>

          {/* Marketplace Items */}
          <div className="flex flex-col gap-6 md:grid">
            {sortedData.length > 0 ? (
              sortedData.map((item, index) => (
                <MarketplaceCard
                  key={index}
                  item={item}
                  supplier={suppliers.find((sup) => sup._id === item._id)}
                />
              ))
            ) : (
              <div>No results found for the selected categories.</div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Marketplace;
