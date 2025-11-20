import React, { useState } from "react";
import BottomNav from "../components/shared/BottomNav";
import BackButton from "../components/shared/BackButton";
import TableCard from "../components/tables/TableCard";
import EditTableModal from "../components/tables/EditTableModal";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getTables, deleteTable } from "../https";
import { enqueueSnackbar } from "notistack";
import { useSelector } from "react-redux";
import { MdEdit, MdDelete } from "react-icons/md";

const Tables = () => {
  const [status, setStatus] = useState("all");
  const [mode, setMode] = useState("normal"); // 'normal', 'edit', 'delete'
  const [selectedTable, setSelectedTable] = useState(null);
  const [tableToDelete, setTableToDelete] = useState(null);

  const userData = useSelector((state) => state.user);
  const isAdmin = userData.role === "Administrador";
  const queryClient = useQueryClient();

  const { data: resData, isError } = useQuery({
    queryKey: ["tables"],
    queryFn: async () => {
      return await getTables();
    },
    placeholderData: keepPreviousData,
  });

  const deleteTableMutation = useMutation({
    mutationFn: (tableId) => deleteTable(tableId),
    onSuccess: () => {
      enqueueSnackbar("Mesa eliminada exitosamente!", { variant: "success" });
      queryClient.invalidateQueries(["tables"]);
      setTableToDelete(null);
      setMode("normal");
    },
    onError: (error) => {
      enqueueSnackbar(
        error.response?.data?.message || "No se puede eliminar la mesa",
        { variant: "error" }
      );
    },
  });

  if (isError) {
    enqueueSnackbar("Something went wrong!", { variant: "error" });
  }

  // Filtrar y ordenar mesas
  const filteredTables = resData?.data.data
    .filter((table) => {
      if (status === "all") return true;
      if (status === "progress") {
        return (
          table.status === "Reservado" ||
          table.status === "Ocupado" ||
          table.currentOrder
        );
      }
      return true;
    })
    .sort((a, b) => a.tableNo - b.tableNo); // Ordenar de menor a mayor

  const handleModeChange = (newMode) => {
    if (mode === newMode) {
      setMode("normal");
    } else {
      setMode(newMode);
    }
  };

  const handleTableClick = (table) => {
    if (mode === "edit") {
      setSelectedTable(table);
    } else if (mode === "delete") {
      if (table.status !== "Disponible" || table.currentOrder) {
        enqueueSnackbar(
          "Solo se pueden eliminar mesas disponibles sin órdenes activas",
          { variant: "error" }
        );
        return;
      }
      setTableToDelete(table);
    }
  };

  const handleConfirmDelete = () => {
    if (tableToDelete) {
      deleteTableMutation.mutate(tableToDelete._id);
    }
  };

  return (
    <section className="bg-[#1f1f1f]  h-[calc(100vh-5rem)] overflow-hidden">
      <div className="flex items-center justify-between px-10 py-4">
        <div className="flex items-center gap-4">
          <BackButton />
          <h1 className="text-[#f5f5f5] text-2xl font-bold tracking-wider">
            Mesas
          </h1>
        </div>

        <div className="text-[#f5f5f5] flex items-center gap-4">
          {/* Filtros */}
          <button
            onClick={() => setStatus("all")}
            className={`text-[#ababab] text-lg ${
              status === "all" && "bg-[#383838] rounded-lg px-5 py-2"
            }  rounded-lg px-5 py-2 font-semibold`}
          >
            Todas
          </button>
          <button
            onClick={() => setStatus("progress")}
            className={`text-[#ababab] text-lg ${
              status === "progress" && "bg-[#383838] rounded-lg px-5 py-2"
            }  rounded-lg px-5 py-2 font-semibold`}
          >
            Reservado
          </button>

          {/* Botones de Admin */}
            {isAdmin && (
              <>
                <div className="w-px h-8 bg-gray-600 mx-2"></div>
                <button
                  onClick={() => handleModeChange("edit")}
                  className={`flex items-center gap-2 text-lg rounded-lg px-5 py-2 font-semibold transition ${
                    mode === "edit"
                      ? "bg-blue-600 text-white"
                      : "bg-[#1a1a1a] text-[#ababab] hover:bg-[#262626]"
                  }`}
                >
                  <MdEdit size={20} />
                  Editar
                </button>
                <button
                  onClick={() => handleModeChange("delete")}
                  className={`flex items-center gap-2 text-lg rounded-lg px-5 py-2 font-semibold transition ${
                    mode === "delete"
                      ? "bg-red-600 text-white"
                      : "bg-[#1a1a1a] text-[#ababab] hover:bg-[#262626]"
                  }`}
                >
                  <MdDelete size={20} />
                  Eliminar
                </button>
              </>
            )}
        </div>
      </div>

      {/* Mensaje de modo activo */}
      {mode !== "normal" && (
        <div className="px-10 pb-2">
          <p className="text-yellow-400 text-sm">
            {mode === "edit"
              ? "🔧 Modo edición: Haz clic en una mesa para editarla"
              : "🗑️ Modo eliminación: Haz clic en una mesa disponible para eliminarla"}
          </p>
        </div>
      )}

      <div className="grid grid-cols-5 gap-3 px-16 py-4 pb-24 h-[calc(100vh-10rem)] overflow-y-scroll scrollbar-hide">
        {filteredTables && filteredTables.length > 0 ? (
          filteredTables.map((table) => {
            return (
              <TableCard
                key={table._id}
                id={table._id}
                name={table.tableNo}
                status={table.status}
                initials={table?.currentOrder?.customerDetails?.name}
                seats={table.seats}
                mode={mode}
                isAdmin={isAdmin}
                onAdminClick={() => handleTableClick(table)}
              />
            );
          })
        ) : (
          <p className="col-span-5 text-gray-500 text-center">
            No hay mesas en esta categoría
          </p>
        )}
      </div>

      <BottomNav />

      {/* Modal de Editar */}
      {selectedTable && (
        <EditTableModal
          table={selectedTable}
          onClose={() => setSelectedTable(null)}
        />
      )}

      {/* Modal de Confirmación de Eliminación */}
      {tableToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#262626] rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-[#f5f5f5] mb-4">
              ¿Eliminar Mesa?
            </h3>
            <p className="text-gray-300 mb-6">
              ¿Estás seguro de que deseas eliminar la Mesa {tableToDelete.tableNo}?
              Esta acción no se puede deshacer.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setTableToDelete(null)}
                className="flex-1 bg-[#1a1a1a] hover:bg-[#333] text-[#f5f5f5] py-3 rounded-lg font-semibold transition"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmDelete}
                disabled={deleteTableMutation.isPending}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
              >
                {deleteTableMutation.isPending ? "Eliminando..." : "Eliminar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Tables;