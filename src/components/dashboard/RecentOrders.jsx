import React, { useState } from "react";
import { AiOutlineEye, AiOutlineDelete } from "react-icons/ai";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { getOrders, updateOrderStatus, deleteOrder } from "../../https/index";
import { formatDateAndTime } from "../../utils";
import { ORDER_STATUS, translateOrderStatus } from "../../constants";
import OrderDetailsModal from "./OrderDetailsModal";

const RecentOrders = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);

  const queryClient = useQueryClient();

  const handleStatusChange = ({ orderId, orderStatus }) => {
    orderStatusUpdateMutation.mutate({ orderId, orderStatus });
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setIsDetailsModalOpen(true);
  };

  const handleDeleteClick = (order) => {
    setOrderToDelete(order);
  };

  const handleConfirmDelete = () => {
    if (orderToDelete) {
      deleteOrderMutation.mutate(orderToDelete._id);
    }
  };

  const handleCancelDelete = () => {
    setOrderToDelete(null);
  };

  const orderStatusUpdateMutation = useMutation({
    mutationFn: ({ orderId, orderStatus }) =>
      updateOrderStatus({ orderId, orderStatus }),
    onSuccess: (data) => {
      enqueueSnackbar("Order status updated successfully!", {
        variant: "success",
      });
      queryClient.invalidateQueries(["orders"]);
    },
    onError: () => {
      enqueueSnackbar("Failed to update order status!", { variant: "error" });
    },
  });

  const deleteOrderMutation = useMutation({
    mutationFn: (orderId) => deleteOrder(orderId),
    onSuccess: () => {
      enqueueSnackbar("Order deleted successfully!", { variant: "success" });
      queryClient.invalidateQueries(["orders"]);
      setOrderToDelete(null);
    },
    onError: () => {
      enqueueSnackbar("Failed to delete order!", { variant: "error" });
    },
  });

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
    <>
      <div className="container mx-auto 
        bg-white dark:bg-[#262626] 
        p-4 rounded-lg 
        shadow-md dark:shadow-sm">
        <h2 className="text-gray-900 dark:text-[#f5f5f5] text-xl font-semibold mb-4">
          Órdenes recientes
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-gray-900 dark:text-[#f5f5f5]">
            <thead className="bg-gray-200 dark:bg-[#333] text-gray-700 dark:text-[#ababab]">
              <tr>
                <th className="p-3">ID orden</th>
                <th className="p-3">Cliente</th>
                <th className="p-3">Estado</th>
                <th className="p-3">Fecha & Hora</th>
                <th className="p-3">Items</th>
                <th className="p-3">Mesa No</th>
                <th className="p-3">Total</th>
                <th className="p-3 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {resData?.data.data.map((order, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-300 dark:border-gray-600 
                    hover:bg-gray-100 dark:hover:bg-[#333]
                    transition-colors"
                >
                  <td className="p-4">
                    #{Math.floor(new Date(order.orderDate).getTime())}
                  </td>
                  <td className="p-4">{order.customerDetails.name}</td>
                  <td className="p-4">
                    <select
                      className={`
                        bg-gray-100 dark:bg-[#1a1a1a] 
                        border border-gray-300 dark:border-gray-500 
                        p-2 rounded-lg 
                        focus:outline-none focus:ring-2 focus:ring-yellow-400
                        transition-all
                        ${
                          order.orderStatus === ORDER_STATUS.READY_EN
                            ? "text-green-600 dark:text-green-500"
                            : "text-yellow-600 dark:text-yellow-500"
                        }`}
                      value={order.orderStatus}
                      onChange={(e) =>
                        handleStatusChange({
                          orderId: order._id,
                          orderStatus: e.target.value,
                        })
                      }
                    >
                      <option className="text-yellow-600 dark:text-yellow-500" value={ORDER_STATUS.IN_PROGRESS_EN}>
                        En Progreso
                      </option>
                      <option className="text-green-600 dark:text-green-500" value={ORDER_STATUS.READY_EN}>
                        Listo
                      </option>
                    </select>
                  </td>
                  <td className="p-4">{formatDateAndTime(order.orderDate)}</td>
                  <td className="p-4">{order.items.length} Items</td>
                  <td className="p-4">Mesa {order.table?.tableNo}</td>
                  <td className="p-4 font-semibold">${order.bills.totalWithTax}</td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleViewDetails(order)}
                        className="text-blue-500 dark:text-blue-400 
                          hover:text-blue-600 dark:hover:text-blue-500 
                          transition p-2 
                          hover:bg-blue-100 dark:hover:bg-blue-400/10 
                          rounded"
                        title="Ver detalles"
                      >
                        <AiOutlineEye size={20} />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(order)}
                        className="text-red-500 dark:text-red-400 
                          hover:text-red-600 dark:hover:text-red-500 
                          transition p-2 
                          hover:bg-red-100 dark:hover:bg-red-400/10 
                          rounded"
                        title="Eliminar orden"
                      >
                        <AiOutlineDelete size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de Detalles */}
      {isDetailsModalOpen && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setIsDetailsModalOpen(false)}
        />
      )}

      {/* Modal de Confirmación de Eliminación */}
      {orderToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-[#262626] rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
            <h3 className="text-xl font-bold text-gray-900 dark:text-[#f5f5f5] mb-4">
              ¿Eliminar Orden?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              ¿Estás seguro de que deseas eliminar la orden #
              {Math.floor(new Date(orderToDelete.orderDate).getTime())} de{" "}
              {orderToDelete.customerDetails.name}? Esta acción no se puede
              deshacer y la mesa quedará libre.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleCancelDelete}
                className="flex-1 
                  bg-gray-200 dark:bg-[#1a1a1a] 
                  hover:bg-gray-300 dark:hover:bg-[#333] 
                  text-gray-900 dark:text-[#f5f5f5] 
                  py-3 rounded-lg font-semibold 
                  transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmDelete}
                disabled={deleteOrderMutation.isPending}
                className="flex-1 
                  bg-red-600 hover:bg-red-700 
                  text-white 
                  py-3 rounded-lg font-semibold 
                  transition-colors
                  disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {deleteOrderMutation.isPending ? "Eliminando..." : "Eliminar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RecentOrders;