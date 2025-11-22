import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTotalPrice } from "../../redux/slices/cartSlice";
import { enqueueSnackbar } from "notistack";
import { addOrder, updateTable } from "../../https/index";
import { useMutation } from "@tanstack/react-query";
import { removeAllItems } from "../../redux/slices/cartSlice";
import { removeCustomer } from "../../redux/slices/customerSlice";
import { ORDER_STATUS } from "../../constants";
import Invoice from "../invoice/Invoice";

const Bill = () => {
  const dispatch = useDispatch();

  const customerData = useSelector((state) => state.customer);
  const cartData = useSelector((state) => state.cart);
  const total = useSelector(getTotalPrice);

  const taxRate = 19;
  const tax = (total * taxRate) / 100;
  const totalPriceWithTax = total + tax;

  const [paymentMethod, setPaymentMethod] = useState();
  const [showInvoice, setShowInvoice] = useState(false);
  const [orderInfo, setOrderInfo] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePlaceOrder = async () => {
    if (!paymentMethod) {
      enqueueSnackbar("Por favor selecciona un método de pago!", {
        variant: "warning",
      });
      return;
    }

    if (isProcessing) return;

    setIsProcessing(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const orderData = {
        customerDetails: {
          name: customerData.customerName,
          phone: customerData.customerPhone,
          guests: customerData.guests,
        },
        orderStatus: ORDER_STATUS.IN_PROGRESS_EN,
        bills: {
          total,
          tax,
          totalWithTax: totalPriceWithTax,
        },
        items: cartData,
        table: customerData.table?.tableId,
        paymentMethod: paymentMethod === "Cash" ? "Cash" : "Online",
        paymentStatus: "Paid",
      };

      orderMutation.mutate(orderData);
    } catch (error) {
      enqueueSnackbar("Error al procesar el pago!", { variant: "error" });
      setIsProcessing(false);
    }
  };

  const orderMutation = useMutation({
    mutationFn: (reqData) => addOrder(reqData),
    onSuccess: (resData) => {
      const { data } = resData.data;
      setOrderInfo(data);
      setShowInvoice(true);

      const tableData = {
        status: "Reservado",
        orderId: data._id,
        tableId: data.table,
      };

      setTimeout(() => {
        tableUpdateMutation.mutate(tableData);
      }, 1500);

      enqueueSnackbar("¡Orden confirmada exitosamente!", {
        variant: "success",
      });
    },
    onError: () => {
      enqueueSnackbar("Error al crear la orden", { variant: "error" });
      setIsProcessing(false);
    },
  });

  const tableUpdateMutation = useMutation({
    mutationFn: (reqData) => updateTable(reqData),
    onSuccess: () => {
      dispatch(removeCustomer());
      dispatch(removeAllItems());
      setIsProcessing(false);
      setPaymentMethod(null);
    },
    onError: () => {
      enqueueSnackbar("Error al actualizar la mesa", { variant: "error" });
      setIsProcessing(false);
    },
  });

  return (
    <>
      {/* ITEMS */}
      <div className="flex items-center justify-between px-5 mt-2">
        <p className="text-xs text-neutral-600 dark:text-neutral-300 font-medium mt-2">
          Items ({cartData.length})
        </p>
        <h1 className="text-neutral-900 dark:text-neutral-100 text-md font-bold">
          ${total.toFixed(2)}
        </h1>
      </div>

      {/* TAX */}
      <div className="flex items-center justify-between px-5 mt-2">
        <p className="text-xs text-neutral-600 dark:text-neutral-300 font-medium mt-2">
          Impuesto IVA (19%)
        </p>
        <h1 className="text-neutral-900 dark:text-neutral-100 text-md font-bold">
          ${tax.toFixed(2)}
        </h1>
      </div>

      {/* TOTAL */}
      <div className="flex items-center justify-between px-5 mt-2">
        <p className="text-xs text-neutral-600 dark:text-neutral-300 font-medium mt-2">
          Total con IVA
        </p>
        <h1 className="text-neutral-900 dark:text-neutral-100 text-md font-bold">
          ${totalPriceWithTax.toFixed(2)}
        </h1>
      </div>

      {/* PAYMENT BUTTONS - Restaurados como antes */}
      <div className="flex gap-5 items-center px-5 mt-2">
        <button
          onClick={() => setPaymentMethod("Cash")}
          disabled={isProcessing}
          className={`
            px-4 py-3 w-full rounded-lg font-semibold transition-colors
            text-[#5a5a5a] dark:text-[#ababab]
            bg-[#f5f5f5] dark:bg-[#1f1f1f]
            hover:bg-[#e8e8e8] dark:hover:bg-[#2a2a2a]
            ${paymentMethod === "Cash" ? "bg-[#e2e2e2] dark:bg-[#383737]" : ""}
            ${isProcessing ? "opacity-50 cursor-not-allowed" : ""}
          `}
        >
          Efectivo
        </button>

        <button
          onClick={() => setPaymentMethod("Online")}
          disabled={isProcessing}
          className={`
            px-4 py-3 w-full rounded-lg font-semibold transition-colors
            text-[#5a5a5a] dark:text-[#ababab]
            bg-[#f5f5f5] dark:bg-[#1f1f1f]
            hover:bg-[#e8e8e8] dark:hover:bg-[#2a2a2a]
            ${paymentMethod === "Online" ? "bg-[#e2e2e2] dark:bg-[#383737]" : ""}
            ${isProcessing ? "opacity-50 cursor-not-allowed" : ""}
          `}
        >
          Otro
        </button>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex gap-5 items-center px-5 mt-2">
        <button
          className="w-full px-4 py-3 rounded-lg font-semibold 
            bg-blue-600 dark:bg-blue-500 
            text-white
            hover:bg-blue-700 dark:hover:bg-blue-600
            transition-colors"
        >
          Imprimir Factura
        </button>

        <button
          onClick={handlePlaceOrder}
          disabled={isProcessing || !paymentMethod}
          className={`w-full px-4 py-3 rounded-lg font-semibold 
            bg-yellow-500 text-neutral-900 
            dark:bg-yellow-400 dark:text-neutral-900
            hover:bg-yellow-600 dark:hover:bg-yellow-500
            transition-all
            ${isProcessing || !paymentMethod ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {isProcessing ? "Procesando..." : "Confirmar Pago"}
        </button>
      </div>

      {showInvoice && (
        <Invoice orderInfo={orderInfo} setShowInvoice={setShowInvoice} />
      )}
    </>
  );
};

export default Bill;