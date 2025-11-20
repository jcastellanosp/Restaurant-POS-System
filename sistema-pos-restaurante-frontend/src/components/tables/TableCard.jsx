import React from "react";
import { getAvatarName, getBgColor } from "../../utils";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaLongArrowAltRight } from "react-icons/fa";
import { MdEdit, MdDelete } from "react-icons/md";
import { updateTable } from "../../redux/slices/customerSlice";

const TableCard = ({ id, name, status, initials, seats, mode, isAdmin, onAdminClick }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    // Si es modo admin (editar o eliminar), ejecutar la acción de admin
    if (isAdmin && (mode === "edit" || mode === "delete")) {
      onAdminClick();
      return;
    }

    // Comportamiento normal: solo permitir si está disponible
    if (status !== "Disponible") return;

    const table = { tableId: id, tableNo: name };
    dispatch(updateTable({ table }));
    navigate(`/menu`);
  };

  // Verificar si está disponible
  const isAvailable = status === "Disponible";

  // Determinar el cursor y estilo según el modo
  const getCursorClass = () => {
    if (mode === "edit") return "cursor-pointer";
    if (mode === "delete") return isAvailable ? "cursor-pointer" : "cursor-not-allowed";
    return isAvailable ? "cursor-pointer" : "cursor-not-allowed";
  };

  const getHoverClass = () => {
    if (mode === "edit") return "hover:bg-blue-900/20 hover:border-blue-500";
    if (mode === "delete" && isAvailable) return "hover:bg-red-900/20 hover:border-red-500";
    if (mode === "normal" && isAvailable) return "hover:bg-[#2c2c2c]";
    return "";
  };

  return (
    <div
      onClick={handleClick}
      className={`w-full bg-[#262626] p-4 rounded-lg transition-all border-2 border-transparent ${getCursorClass()} ${getHoverClass()} ${
        !isAvailable && mode === "normal" ? "opacity-80" : ""
      }`}
    >
      <div className="flex items-center justify-between px-1 mb-2">
        <h1 className="text-[#f5f5f5] text-xl font-semibold">
          Mesa
          <FaLongArrowAltRight className="text-[#ababab] ml-2 inline" /> {name}
        </h1>
        <p
          className={`px-2 py-1 rounded-lg text-sm ${
            isAvailable
              ? "bg-[#4a3d0a] text-yellow-400"
              : "text-green-400 bg-[#1a3d2e]"
          }`}
        >
          {status}
        </p>
      </div>

      {/* Icono de modo activo */}
      {isAdmin && mode !== "normal" && (
        <div className="flex justify-center mb-2">
          {mode === "edit" ? (
            <MdEdit className="text-blue-400" size={24} />
          ) : (
            <MdDelete
              className={isAvailable ? "text-red-400" : "text-gray-600"}
              size={24}
            />
          )}
        </div>
      )}

      <div className="flex items-center justify-center mt-5 mb-8">
        <h1
          className="text-white rounded-full p-5 text-xl"
          style={{ backgroundColor: initials ? getBgColor() : "#1f1f1f" }}
        >
          {getAvatarName(initials) || "N/A"}
        </h1>
      </div>
      <p className="text-[#ababab] text-xs">
        Sillas: <span className="text-[#f5f5f5]">{seats}</span>
      </p>
    </div>
  );
};

export default TableCard;