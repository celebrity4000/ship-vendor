import React from "react";
import { Link } from "react-router-dom";

// Function to display stars based on rating
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

const MarketplaceCard = ({ item }) => {
  return (
    <div className="flex flex-col lg:flex-row gap-5 mb-10 p-5 border-b border-gray-200">
      <div className="lg:w-1/3 w-full h-40 lg:h-auto">
        {/* Check if bannerImg exists and map over it */}
        {item?.bannerImg?.[0] && (
          <img
            src={item.bannerImg[0]}
            alt="banner-0"
            className="w-full h-full object-cover rounded-lg"
          />
        )}
      </div>
      <div className="flex flex-col lg:w-2/3 w-full">
        <h1 className="text-2xl font-semibold mb-2">{item.companyName}</h1>
        <div className="flex gap-2 mb-2">
          <span className="text-xs border border-gray-400 rounded px-2 py-1">
            {item.industry}
          </span>
        </div>
        <div className="flex items-center space-x-2 mb-3">
          <div className="bg-green-500 text-white text-sm px-2 py-1 rounded">
            {item?.rating?.rate}
          </div>
          <div className="flex items-center">
            {renderStars(item?.rating?.rate)}
          </div>
          <div className="text-gray-500 ml-2">
            ({item?.rating?.ratedBy} ratings)
          </div>
        </div>
        <div className="mt-auto">
          <Link
            to={`${item._id}`}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
          >
            Show Vendor
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceCard;
