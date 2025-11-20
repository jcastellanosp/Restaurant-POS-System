import React from "react";
import { FaSearch } from "react-icons/fa";
import OrderList from "./OrderList";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { getOrders } from "../../https/index";

const RecentOrders = () => {
  const { data: resData, isError } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      return await getOrders();
    },
    placeholderData: keepPreviousData,
  });

  if (isError) {
    enqueueSnackbar("Something went wrong!", { variant: "error" });
  }
  
  return (
    <div className="h-full flex flex-col">
      <div className="bg-[#1a1a1a] w-full h-full rounded-lg flex flex-col">
        <div className="flex justify-between items-center px-6 py-3">
          <h1 className="text-[#f5f5f5] text-lg font-semibold tracking-wide">
            Ordenes Recientes
          </h1>
          <a href="" className="text-[#025cca] text-sm font-semibold">
            Mirar Todo
          </a>
        </div>
        <div className="flex items-center gap-4 bg-[#1f1f1f] rounded-[15px] px-6 py-3 mx-6">
          <FaSearch className="text-[#f5f5f5]" />
          <input
            type="text"
            placeholder="Search recent orders"
            className="bg-[#1f1f1f] outline-none text-[#f5f5f5] w-full"
          />
        </div>

        {/* Lista de ordenes - Ocupa todo el espacio disponible */}
        <div className="mt-4 px-6 flex-1 overflow-y-auto scrollbar-hide pb-4">
          {resData?.data.data.length > 0 ? (
            resData.data.data.map((order) => {
              return <OrderList key={order._id} order={order} />;
            })
          ) : (
            <p className="text-gray-500 text-center mt-4">No orders available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecentOrders;