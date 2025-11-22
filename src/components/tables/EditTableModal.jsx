import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTable } from "../../https";
import { enqueueSnackbar } from "notistack";

const EditTableModal = ({ table, onClose }) => {
  const [seats, setSeats] = useState(table.seats);
  const [status, setStatus] = useState(table.status);
  const queryClient = useQueryClient();

  // Verificar si hay orden activa
  const hasActiveOrder = table.currentOrder != null;

  const updateTableMutation = useMutation({
    mutationFn: (data) => updateTable(data),
    onSuccess: () => {
      enqueueSnackbar("Mesa actualizada exitosamente!", { variant: "success" });
      queryClient.invalidateQueries(["tables"]);
      onClose();
    },
    onError: (error) => {
      enqueueSnackbar(error.response?.data?.message || "Error al actualizar mesa", {
        variant: "error",
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (seats < 1) {
      enqueueSnackbar("El número de sillas debe ser mayor a 0", {
        variant: "error",
      });
      return;
    }

    if (hasActiveOrder && status === "Disponible") {
      enqueueSnackbar("No se puede marcar como disponible una mesa con orden activa", {
        variant: "error",
      });
      return;
    }

    updateTableMutation.mutate({
      tableId: table._id,
      seats: Number(seats),
      status: status,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-[#262626] rounded-lg p-6 w-full max-w-md mx-4 shadow-xl">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-[#f5f5f5]">
            Editar Mesa {table.tableNo}
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Número de sillas */}
          <div>
            <label className="block text-gray-700 dark:text-[#ababab] text-sm font-medium mb-3">
              Número de sillas
            </label>
            <input
              type="number"
              value={seats}
              onChange={(e) => setSeats(e.target.value)}
              min="1"
              className="w-full 
                bg-gray-100 dark:bg-[#1f1f1f] 
                text-gray-900 dark:text-white 
                border-2 border-gray-300 dark:border-transparent
                rounded-lg px-5 py-4 
                focus:outline-none focus:ring-2 focus:ring-yellow-400
                transition-all
                text-base"
              required
            />
          </div>

          {/* Estado */}
          <div>
            <label className="block text-gray-700 dark:text-[#ababab] text-sm font-medium mb-3">
              Estado
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full 
                bg-gray-100 dark:bg-[#1f1f1f] 
                text-gray-900 dark:text-white 
                border-2 border-gray-300 dark:border-transparent
                rounded-lg px-5 py-4 
                focus:outline-none focus:ring-2 focus:ring-yellow-400
                transition-all
                text-base
                disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={hasActiveOrder}
            >
              <option value="Disponible">Disponible</option>
              <option value="Reservado">Reservado</option>
              <option value="Ocupado">Ocupado</option>
            </select>

            {hasActiveOrder && (
              <p className="text-yellow-600 dark:text-yellow-500 text-xs mt-2 flex items-center gap-1">
                ⚠️ No se puede cambiar el estado mientras hay una orden activa
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
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
              type="submit"
              disabled={updateTableMutation.isPending}
              className="flex-1 
                bg-yellow-500 dark:bg-yellow-400 
                hover:bg-yellow-600 dark:hover:bg-yellow-500
                text-gray-900 
                py-3 rounded-lg font-semibold 
                transition-all
                disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {updateTableMutation.isPending ? "Guardando..." : "Guardar"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default EditTableModal;