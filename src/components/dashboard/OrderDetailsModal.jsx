import React from "react";
import { IoMdClose } from "react-icons/io";
import { formatDateAndTime } from "../../utils";
import { ORDER_STATUS, translateOrderStatus } from "../../constants";

const OrderDetailsModal = ({ order, onClose }) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-[#262626] rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-300 dark:border-gray-600">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-[#f5f5f5]">
            Detalles de la Orden
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 dark:text-gray-400 
              hover:text-gray-900 dark:hover:text-white 
              transition"
          >
            <IoMdClose size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Order Info */}
          <div className="bg-gray-100 dark:bg-[#1a1a1a] p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-[#f5f5f5] mb-3">
              Información de la Orden
            </h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-gray-600 dark:text-gray-400">ID Orden:</span>
                <p className="text-gray-900 dark:text-[#f5f5f5] font-medium">
                  #{Math.floor(new Date(order.orderDate).getTime())}
                </p>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Estado:</span>
                <p
                  className={`font-medium ${
                    order.orderStatus === ORDER_STATUS.READY_EN
                      ? "text-green-600 dark:text-green-500"
                      : "text-yellow-600 dark:text-yellow-500"
                  }`}
                >
                  {translateOrderStatus(order.orderStatus)}
                </p>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Fecha y Hora:</span>
                <p className="text-gray-900 dark:text-[#f5f5f5]">
                  {formatDateAndTime(order.orderDate)}
                </p>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Mesa:</span>
                <p className="text-gray-900 dark:text-[#f5f5f5] font-medium">
                  Mesa {order.table?.tableNo || "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Customer Info */}
          <div className="bg-gray-100 dark:bg-[#1a1a1a] p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-[#f5f5f5] mb-3">
              Información del Cliente
            </h3>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-gray-600 dark:text-gray-400">Nombre:</span>
                <p className="text-gray-900 dark:text-[#f5f5f5]">
                  {order.customerDetails?.name || "N/A"}
                </p>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Teléfono:</span>
                <p className="text-gray-900 dark:text-[#f5f5f5]">
                  {order.customerDetails?.phone || "N/A"}
                </p>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Email:</span>
                <p className="text-gray-900 dark:text-[#f5f5f5]">
                  {order.customerDetails?.email || "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Items */}
          <div className="bg-gray-100 dark:bg-[#1a1a1a] p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-[#f5f5f5] mb-3">
              Items de la Orden
            </h3>
            <div className="space-y-2">
              {order.items?.map((item, index) => {
                const unitPrice = item.pricePerQuantity ?? item.price ?? 0;
                const quantity = item.quantity ?? 1;
                const lineTotal = item.price ?? unitPrice * quantity;

                return (
                  <div
                    key={index}
                    className="flex justify-between items-center py-2 
                      border-b border-gray-300 dark:border-gray-700 
                      last:border-0"
                  >
                    <div className="flex-1">
                      <p className="text-gray-900 dark:text-[#f5f5f5] font-medium">
                        {item.name || item.dishName}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Cantidad: {quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-900 dark:text-[#f5f5f5] font-medium">
                        ${lineTotal.toFixed(2)}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        ${unitPrice.toFixed(2)} c/u
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Billing */}
          <div className="bg-gray-100 dark:bg-[#1a1a1a] p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-[#f5f5f5] mb-3">
              Resumen de Pago
            </h3>
            <div className="space-y-2 text-sm">
              {(() => {
                // Normalizar valores y proveer fallback calculados si faltan
                const subtotal = typeof order.bills?.total === "number"
                  ? order.bills.total
                  : // calcular sumatoria como fallback
                    (order.items || []).reduce((sum, it) => {
                      const u = it.pricePerQuantity ?? it.price ?? 0;
                      const q = it.quantity ?? 1;
                      return sum + (it.price ?? u * q);
                    }, 0);

                const tax = typeof order.bills?.tax === "number"
                  ? order.bills.tax
                  : Math.round((subtotal * (order.bills?.taxPercent ?? 19)) / 100 * 100) / 100;

                const totalWithTax = typeof order.bills?.totalWithTax === "number"
                  ? order.bills.totalWithTax
                  : Math.round((subtotal + tax) * 100) / 100;

                return (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Subtotal:</span>
                      <span className="text-gray-900 dark:text-[#f5f5f5]">
                        ${subtotal.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Impuestos ({order.bills?.taxPercent ?? 19}%):
                      </span>
                      <span className="text-gray-900 dark:text-[#f5f5f5]">
                        ${tax.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-gray-300 dark:border-gray-700">
                      <span className="text-gray-900 dark:text-[#f5f5f5] font-bold">
                        Total:
                      </span>
                      <span className="text-gray-900 dark:text-[#f5f5f5] font-bold text-lg">
                        ${totalWithTax.toFixed(2)}
                      </span>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-300 dark:border-gray-600">
          <button
            onClick={onClose}
            className="w-full 
              bg-gray-200 dark:bg-[#1a1a1a] 
              hover:bg-gray-300 dark:hover:bg-[#333] 
              text-gray-900 dark:text-[#f5f5f5] 
              py-3 rounded-lg font-semibold 
              transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;