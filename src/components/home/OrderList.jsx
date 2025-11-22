import React from "react";
import { FaCheckDouble, FaLongArrowAltRight, FaCircle } from "react-icons/fa";
import { getAvatarName } from "../../utils/index";
import { ORDER_STATUS, translateOrderStatus } from "../../constants";

const OrderList = ({ key, order }) => {
  return (
    <div className="flex items-center gap-5 mb-3">
      {/* Avatar */}
      <button
        className="bg-yellow-500 text-white p-3 text-xl font-bold rounded-lg"
      >
        {getAvatarName(order.customerDetails.name)}
      </button>

      <div className="flex items-center justify-between w-full">
        {/* Name + Items */}
        <div className="flex flex-col items-start gap-1">
          <h1 className="text-black dark:text-white text-lg font-semibold tracking-wide">
            {order.customerDetails.name}
          </h1>

          <p className="text-gray-600 dark:text-gray-300 text-sm">
            {order.items.length} Artículos
          </p>
        </div>

        {/* Table number */}
        <div>
          <h1 className="text-yellow-500 border border-yellow-500 rounded-lg p-1 font-semibold flex items-center gap-2">
            Mesa
            <FaLongArrowAltRight className="text-gray-500 dark:text-gray-300" />
            {order.table?.tableNo}
          </h1>
        </div>

        {/* Status */}
        <div className="flex flex-col items-end gap-2">

          {order.orderStatus === ORDER_STATUS.READY_EN ? (
            <p className="text-green-600 bg-green-100 dark:bg-green-800 px-2 py-1 rounded-lg flex items-center gap-2">
              <FaCheckDouble /> {translateOrderStatus(order.orderStatus)}
            </p>
          ) : (
            <p className="text-yellow-600 bg-yellow-100 dark:bg-yellow-800 px-2 py-1 rounded-lg flex items-center gap-2">
              <FaCircle /> {translateOrderStatus(order.orderStatus)}
            </p>
          )}

        </div>
      </div>
    </div>
  );
};

export default OrderList;
