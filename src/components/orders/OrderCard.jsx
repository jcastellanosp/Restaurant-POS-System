import React from "react";
import { FaCheckDouble, FaLongArrowAltRight } from "react-icons/fa";
import { FaCircle } from "react-icons/fa";
import { formatDateAndTime, getAvatarName } from "../../utils";
import { ORDER_STATUS, translateOrderStatus } from "../../constants";

const OrderCard = ({ order }) => {
  return (
    <div
      className="
        rounded-lg p-4 mb-4
        bg-gray-200 text-gray-900
        dark:bg-[#262626] dark:text-[#f5f5f5]
        transition-colors duration-300
      "
    >
      <div className="flex items-center gap-5">
        {/* Avatar */}
        <div>
          <button
            className="
              p-3 text-xl font-bold rounded-lg
              bg-yellow-400 text-gray-900
              dark:bg-[#f6b100] dark:text-[#1a1a1a]
            "
          >
            {getAvatarName(order.customerDetails.name)}
          </button>
        </div>

        {/* Info principal */}
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col items-start gap-1">
            <h1 className="text-lg font-semibold tracking-wide">
              {order.customerDetails.name}
            </h1>

            <p className="text-gray-600 dark:text-[#ababab] text-sm">
              #{Math.floor(new Date(order.orderDate).getTime())} / Comer en el lugar
            </p>

            <p className="text-gray-600 dark:text-[#ababab] text-sm">
              Mesa
              <FaLongArrowAltRight className="ml-2 inline" />
              {order.table?.tableNo || "N/A"}
            </p>
          </div>

          {/* Estado */}
          <div className="flex flex-col items-end gap-2">
            {order.orderStatus === ORDER_STATUS.READY_EN ? (
              <>
                <p
                  className="
                    px-2 py-1 rounded-lg
                    text-green-700 bg-green-200
                    dark:text-green-500 dark:bg-[#2e4a40]
                  "
                >
                  <FaCheckDouble className="inline mr-2" />
                  {translateOrderStatus(order.orderStatus)}
                </p>

                <p className="text-gray-600 dark:text-[#ababab] text-sm">
                  <FaCircle className="inline mr-2 text-green-600" />
                  Listo para servir
                </p>
              </>
            ) : (
              <>
                <p
                  className="
                    px-2 py-1 rounded-lg
                    text-yellow-700 bg-yellow-200
                    dark:text-yellow-500 dark:bg-[#4a452e]
                  "
                >
                  <FaCircle className="inline mr-2" />
                  {translateOrderStatus(order.orderStatus)}
                </p>

                <p className="text-gray-600 dark:text-[#ababab] text-sm">
                  <FaCircle className="inline mr-2 text-yellow-600" />
                  Preparando tu orden
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Fecha y cantidad */}
      <div className="mt-4 flex justify-between items-center text-gray-600 dark:text-[#ababab] text-sm">
        <p>{formatDateAndTime(order.orderDate)}</p>
        <p>Artículos {order.items.length}</p>
      </div>

      <hr className="mt-4 border-gray-300 dark:border-[#343434]" />

      {/* Total */}
      <div className="flex items-center justify-between mt-4">
        <h1 className="text-lg font-semibold">Total</h1>
        <p className="text-lg font-semibold">
          ${order.bills.totalWithTax.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default OrderCard;
