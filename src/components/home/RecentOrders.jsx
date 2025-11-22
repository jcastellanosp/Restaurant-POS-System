import React from "react";
import { FaSearch } from "react-icons/fa";
import OrderList from "./OrderList";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { getOrders } from "../../https/index";

const RecentOrders = () => {
  const { data: resData, isError } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => await getOrders(),
    placeholderData: keepPreviousData,
  });

  if (isError) {
    enqueueSnackbar("Something went wrong!", { variant: "error" });
  }

  return (
    <div className="h-full flex flex-col">
      <div className="bg-white dark:bg-[#1a1a1a] w-full h-full rounded-lg flex flex-col shadow">
        
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-3">
          <h1 className="text-black dark:text-white text-lg font-semibold tracking-wide">
            Órdenes Recientes
          </h1>

          <a
            href="#"
            className="text-blue-600 dark:text-blue-400 text-sm font-semibold"
          >
            Mirar Todo
          </a>
        </div>

        {/* Search bar */}
        <div className="flex items-center gap-4 
          bg-gray-100 dark:bg-[#1f1f1f] 
          rounded-[15px] px-6 py-3 mx-6 shadow-sm"
        >
          <FaSearch className="text-gray-700 dark:text-gray-300" />
          <input
            type="text"
            placeholder="Buscar órdenes recientes"
            className="bg-transparent outline-none w-full 
              text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          />
        </div>

        {/* Order list */}
        <div className="mt-4 px-6 flex-1 overflow-y-auto scrollbar-hide pb-4">
          {resData?.data.data.length > 0 ? (
            resData.data.data.map((order) => (
              <OrderList key={order._id} order={order} />
            ))
          ) : (
            <p className="text-gray-600 dark:text-gray-400 text-center mt-4">
              No hay órdenes disponibles
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecentOrders;
