import React, { useState, useEffect } from "react";
import OrderCard from "@/components/orders/OrderCard";
import BottomNav from "@/components/shared/BottomNav";
import BackButton from "@/components/shared/BackButton";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getOrders } from "../https/index";
import { enqueueSnackbar } from "notistack";

const Orders = () => {
  const [status, setStatus] = useState("all");

  useEffect(() => {
    document.title = "Pedidos - Sistema POS Restaurante";
  }, []);

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

  const filteredOrders = resData?.data.data.filter((order) => {
    if (status === "all") return true;
    if (status === "progress") return order.orderStatus === "In Progress";
    if (status === "ready") return order.orderStatus === "Ready";
    return true;
  });

  return (
    <section className="
      h-[calc(100vh-5rem)] overflow-hidden
      bg-gray-100 text-gray-900
      dark:bg-[#1f1f1f] dark:text-[#f5f5f5]
      transition-colors duration-300
    ">
      
      {/* HEADER */}
      <div className="flex items-center justify-between px-10 py-4">
        <div className="flex items-center gap-5">
          <BackButton />
          <h1 className="text-2xl font-bold tracking-wider">Pedidos</h1>
        </div>

        {/* BOTONES DE FILTRO */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setStatus("all")}
            className={`
              text-lg font-semibold px-5 py-2 rounded-lg
              text-gray-600 dark:text-[#ababab]
              ${status === "all" ? "bg-gray-300 dark:bg-[#383838] text-gray-900 dark:text-white" : ""}
            `}
          >
            Todas
          </button>

          <button
            onClick={() => setStatus("progress")}
            className={`
              text-lg font-semibold px-5 py-2 rounded-lg
              text-gray-600 dark:text-[#ababab]
              ${status === "progress" ? "bg-gray-300 dark:bg-[#383838] text-gray-900 dark:text-white" : ""}
            `}
          >
            En Progreso
          </button>

          <button
            onClick={() => setStatus("ready")}
            className={`
              text-lg font-semibold px-5 py-2 rounded-lg
              text-gray-600 dark:text-[#ababab]
              ${status === "ready" ? "bg-gray-300 dark:bg-[#383838] text-gray-900 dark:text-white" : ""}
            `}
          >
            Listas
          </button>
        </div>
      </div>

      {/* GRID DE PEDIDOS */}
      <div className="
        grid grid-cols-3 gap-3 px-16 py-4 pb-24 
        overflow-y-auto scrollbar-hide 
        h-[calc(100vh-10rem)]
      ">
        {filteredOrders && filteredOrders.length > 0 ? (
          filteredOrders.map((order) => {
            return <OrderCard key={order._id} order={order} />;
          })
        ) : (
          <p className="col-span-3 text-gray-500 dark:text-gray-400">
            No hay pedidos disponibles
          </p>
        )}
      </div>

      <BottomNav />
    </section>
  );
};

export default Orders;
