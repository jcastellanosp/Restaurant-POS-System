import React from "react";
import { IoMdClose } from "react-icons/io";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-[#1a1a1a] rounded-lg shadow-xl w-full max-w-lg mx-4">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-300 dark:border-[#333]">
          <h2 className="text-xl text-gray-900 dark:text-[#f5f5f5] font-semibold">
            {title}
          </h2>
          <button 
            className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors p-1" 
            onClick={onClose}
            aria-label="Cerrar modal"
          >
            <IoMdClose size={28} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;