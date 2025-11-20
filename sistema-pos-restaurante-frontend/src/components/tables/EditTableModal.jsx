import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTable } from "../../https";
import { enqueueSnackbar } from "notistack";

const EditTableModal = ({ table, onClose }) => {
  const [seats, setSeats] = useState(table.seats);
  const [status, setStatus] = useState(table.status);
  const queryClient = useQueryClient();

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

    // Solo permitir cambiar estado si no hay orden activa
    if (table.currentOrder && status === "Disponible") {
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#262626] rounded-lg p-6 w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[#f5f5f5]">
            Editar Mesa {table.tableNo}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition"
          >
            <IoMdClose size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Número de sillas */}
          <div>
            <label className="block text-[#ababab] text-sm mb-2">
              Número de sillas
            </label>
            <input
              type="number"
              value={seats}
              onChange={(e) => setSeats(e.target.value)}
              min="1"
              className="w-full bg-[#1a1a1a] text-[#f5f5f5] border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-[#f6b100]"
              required
            />
          </div>

          {/* Estado */}
          <div>
            <label className="block text-[#ababab] text-sm mb-2">Estado</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full bg-[#1a1a1a] text-[#f5f5f5] border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-[#f6b100]"
              disabled={table.currentOrder !== null}
            >
              <option value="Disponible">Disponible</option>
              <option value="Reservado">Reservado</option>
              <option value="Ocupado">Ocupado</option>
            </select>
            {table.currentOrder && (
              <p className="text-yellow-500 text-xs mt-1">
                No se puede cambiar el estado mientras hay una orden activa
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-[#1a1a1a] hover:bg-[#333] text-[#f5f5f5] py-3 rounded-lg font-semibold transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={updateTableMutation.isPending}
              className="flex-1 bg-[#f6b100] hover:bg-[#d49a00] text-[#1a1a1a] py-3 rounded-lg font-semibold transition disabled:opacity-50"
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