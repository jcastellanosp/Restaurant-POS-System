import React from "react";
import { FaCheckDouble, FaLongArrowAltRight } from "react-icons/fa";
import { FaCircle } from "react-icons/fa";
import { formatDateAndTime, getAvatarName } from "../../utils";
import { ORDER_STATUS, translateOrderStatus } from "../../constants";

const OrderCard = ({ order }) => {
  return (
    <div className="bg-[#262626] rounded-lg p-4 mb-4">
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-5">
          <button className="bg-[#f6b100] p-3 text-xl font-bold rounded-lg text-[#1a1a1a]">
            {getAvatarName(order.customerDetails.name)}
          </button>
        </div>
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col items-start gap-1">
            <h1 className="text-[#f5f5f5] text-lg font-semibold tracking-wide">
              {order.customerDetails.name}
            </h1>
            <p className="text-[#ababab] text-sm">
              #{Math.floor(new Date(order.orderDate).getTime())} / Comer en el
              lugar
            </p>
            <p className="text-[#ababab] text-sm">
              Mesa
              <FaLongArrowAltRight className="text-[#ababab] ml-2 inline" />
              {order.table?.tableNo || "N/A"}
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            {order.orderStatus === ORDER_STATUS.READY_EN ? (
              <>
                <p className="text-green-600 bg-[#2e4a40] px-2 py-1 rounded-lg">
                  <FaCheckDouble className="inline mr-2" />{" "}
                  {translateOrderStatus(order.orderStatus)}
                </p>
                <p className="text-[#ababab] text-sm">
                  <FaCircle className="inline mr-2 text-green-600" /> Listo para
                  servir
                </p>
              </>
            ) : (
              <>
                <p className="text-yellow-600 bg-[#4a452e] px-2 py-1 rounded-lg">
                  <FaCircle className="inline mr-2" />{" "}
                  {translateOrderStatus(order.orderStatus)}
                </p>
                <p className="text-[#ababab] text-sm">
                  <FaCircle className="inline mr-2 text-yellow-600" /> Preparando
                  tu orden
                </p>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-between items-center text-[#ababab] text-sm">
        <p>{formatDateAndTime(order.orderDate)}</p>
        <p>Artículos {order.items.length}</p>
      </div>
      <hr className="mt-4 border-[#343434]" />
      <div className="flex items-center justify-between mt-4">
        <h1 className="text-[#f5f5f5] text-lg font-semibold"> Total </h1>
        <p className="text-[#f5f5f5] text-lg font-semibold">
          ${order.bills.totalWithTax.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default OrderCard;