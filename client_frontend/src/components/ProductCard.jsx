import React from "react";
import { FaTag } from "react-icons/fa"; // For sale badge icon

const ProductCard = ({ product }) => {
  return (
    <div className="border p-4 rounded-lg relative shadow-lg">
      {/* Sale Badge */}
      {product.label && (
        <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs flex items-center">
          <FaTag className="mr-1" /> {product.label}
        </div>
      )}

      {/* Product Image */}
      <img
        src={product.image}
        alt={product.name}
        className="object-cover w-full h-48 mb-4 rounded-lg"
      />

      {/* Product Info */}
      <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
      <p className="text-gray-700">
        {product.currency} {parseFloat(product.price).toFixed(2)}
      </p>
    </div>
  );
};

export default ProductCard;
