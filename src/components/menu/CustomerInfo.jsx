import React, { useState } from "react";
import { useSelector } from "react-redux";
import { formatDate, getAvatarName } from "../../utils";

const CustomerInfo = () => {
  const [dateTime] = useState(new Date());
  const customerData = useSelector((state) => state.customer);

  return (
    <div className="flex items-center justify-between px-4 py-3">
      {/* Textos del cliente */}
      <div className="flex flex-col items-start">
        <h1 className="text-md font-semibold tracking-wide text-gray-900 dark:text-gray-100">
          {customerData.customerName || "Customer Name"}
        </h1>

        <p className="text-xs font-medium mt-1 text-gray-600 dark:text-gray-400">
          #{customerData.orderId || "N/A"} / Cena en
        </p>

        <p className="text-xs font-medium mt-2 text-gray-600 dark:text-gray-400">
          {formatDate(dateTime)}
        </p>
      </div>

      {/* Avatar dinámico según modo claro/oscuro */}
      <button
        className="
          p-3 text-xl font-bold rounded-lg 
          bg-yellow-400 text-gray-900 
          dark:bg-yellow-500 dark:text-gray-900
          shadow-md
        "
      >
        {getAvatarName(customerData.customerName) || "CN"}
      </button>
    </div>
  );
};

export default CustomerInfo;
