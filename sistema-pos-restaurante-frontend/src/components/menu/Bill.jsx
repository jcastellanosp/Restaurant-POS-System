import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTotalPrice } from "../../redux/slices/cartSlice";
import { enqueueSnackbar } from "notistack";
import {  
  addOrder,
  updateTable,
} from "../../https/index";
import { useMutation } from "@tanstack/react-query";
import { removeAllItems } from "../../redux/slices/cartSlice";
import { removeCustomer } from "../../redux/slices/customerSlice";
import { ORDER_STATUS } from "../../constants";
import Invoice from "../invoice/Invoice";

const Bill = () => {
    const dispatch = useDispatch();

    const customerData = useSelector((state) => state.customer);
    const cartData = useSelector(state => state.cart);
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

  if (isProcessing) {
    return; // Evitar múltiples clicks
  }

  setIsProcessing(true);

  try {
    // ============================================
    // IF: Método de pago EFECTIVO (Cash)
    // ============================================
    if (paymentMethod === "Cash") {
      enqueueSnackbar("Procesando pago en efectivo...", {
        variant: "info",
      });

      // Simular delay del pago (1.5 segundos)
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Preparar datos de la orden
      const orderData = {
        customerDetails: {
          name: customerData.customerName,
          phone: customerData.customerPhone,
          guests: customerData.guests,
        },
        orderStatus: ORDER_STATUS.IN_PROGRESS_EN,
        bills: {
          total: total,
          tax: tax,
          totalWithTax: totalPriceWithTax,
        },
        items: cartData,
        table: customerData.table?.tableId,
        paymentMethod: "Cash",
        paymentStatus: "Paid",
      };

      console.log("Creando orden con pago en efectivo:", orderData);

      // Crear la orden
      orderMutation.mutate(orderData);
    } 
    // ============================================
    // ELSE: Método de pago OTRO (Online)
    // ============================================
    else {
      enqueueSnackbar("Procesando otro método de pago...", {
        variant: "info",
      });

      // Simular delay del pago (1.5 segundos)
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Preparar datos de la orden
      const orderData = {
        customerDetails: {
          name: customerData.customerName,
          phone: customerData.customerPhone,
          guests: customerData.guests,
        },
        orderStatus: ORDER_STATUS.IN_PROGRESS_EN,
        bills: {
          total: total,
          tax: tax,
          totalWithTax: totalPriceWithTax,
        },
        items: cartData,
        table: customerData.table?.tableId,
        paymentMethod: "Online",
        paymentStatus: "Paid",
      };

      console.log("Creando orden con otro método de pago:", orderData);

      // Crear la orden
      orderMutation.mutate(orderData);
    }

  } catch (error) {
    console.error("Error al procesar el pago:", error);
    enqueueSnackbar("Error al procesar el pago!", {
      variant: "error",
    });
    setIsProcessing(false);
  }
};

    const orderMutation = useMutation({
      mutationFn: (reqData) => addOrder(reqData),
      onSuccess: (resData) => {
        const { data } = resData.data;
        console.log("Orden creada:", data);

        // Guardar la orden localmente para mostrar la factura
        setOrderInfo(data);
        setShowInvoice(true);

        // Actualizar la mesa
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
      onError: (error) => {
        console.error("Error al crear orden:", error);
        enqueueSnackbar("Error al crear la orden", {
          variant: "error",
        });
        setIsProcessing(false);
      }
    });

    const tableUpdateMutation = useMutation({
      mutationFn: (reqData) => updateTable(reqData),
      onSuccess: (resData) => {
        console.log("Mesa actualizada:", resData);
        
        enqueueSnackbar("¡Mesa reservada exitosamente!", {
          variant: "success",
        });

        // Limpiar el carrito y datos del cliente
        dispatch(removeCustomer());
        dispatch(removeAllItems());
        
        setIsProcessing(false);
        setPaymentMethod(null);
      },
      onError: (error) => {
        console.error("Error al actualizar mesa:", error);
        enqueueSnackbar("Error al actualizar la mesa", {
          variant: "error",
        });
        setIsProcessing(false);
      },
    });

    return (
      <>
        <div className="flex items-center justify-between px-5 mt-2">
          <p className="text-xs text-[#ababab] font-medium mt-2">
            Items({cartData.length})
          </p>
          <h1 className="text-[#f5f5f5] text-md font-bold">
            ${total.toFixed(2)}
          </h1>
        </div>
        <div className="flex items-center justify-between px-5 mt-2">
          <p className="text-xs text-[#ababab] font-medium mt-2">
            Impuesto IVA(19%)
          </p>
          <h1 className="text-[#f5f5f5] text-md font-bold">
            ${tax.toFixed(2)}
          </h1>
        </div>
        <div className="flex items-center justify-between px-5 mt-2">
          <p className="text-xs text-[#ababab] font-medium mt-2">
            Total With tax(19%)
          </p>
          <h1 className="text-[#f5f5f5] text-md font-bold">
            ${totalPriceWithTax.toFixed(2)}
          </h1>
        </div>
        <div className="flex gap-5 items-center px-5 mt-2">
          <button
            onClick={() => setPaymentMethod("Cash")}
            disabled={isProcessing}
            className={`bg-[#1f1f1f] px-4 py-3 w-full rounded-lg text-[#ababab] font-semibold transition-colors ${
              paymentMethod === "Cash" ? "bg-[#383737]" : ""
            } ${isProcessing ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            Efectivo
          </button>

          <button
            onClick={() => setPaymentMethod("Online")}
            disabled={isProcessing}
            className={`bg-[#1f1f1f] px-4 py-3 w-full rounded-lg text-[#ababab] font-semibold transition-colors ${
              paymentMethod === "Online" ? "bg-[#383737]" : ""
            } ${isProcessing ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            Otro
          </button>
        </div>
        <div className="flex gap-5 items-center px-5 mt-2">
          <button 
            className="bg-[#035cca] px-4 py-3 w-full rounded-lg text-[#f5f5f5] font-semibold"
            disabled={isProcessing}
          >
            Imprimir Factura
          </button>

          <button
            onClick={handlePlaceOrder}
            disabled={isProcessing || !paymentMethod}
            className={`bg-[#f6b100] px-4 py-3 w-full rounded-lg text-[#1f1f1f] font-semibold transition-all ${
              isProcessing || !paymentMethod 
                ? "opacity-50 cursor-not-allowed" 
                : "hover:bg-[#f6c000]"
            }`}
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