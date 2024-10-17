// Modal.js
import React from "react";

const Modal = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center w-[90%] max-w-md">
        <p className="text-lg font-semibold mb-4">{message}</p>
        <button
          className="bg-[#EC994B] text-white py-2 px-4 rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
