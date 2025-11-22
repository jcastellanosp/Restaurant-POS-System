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
    if (isAdmin && (mode === "edit" || mode === "delete")) {
      onAdminClick();
      return;
    }

    if (status !== "Disponible") return;

    const table = { tableId: id, tableNo: name };
    dispatch(updateTable({ table }));
    navigate(`/menu`);
  };

  const isAvailable = status === "Disponible";

  const getCursorClass = () => {
    if (mode === "edit") return "cursor-pointer";
    if (mode === "delete") return isAvailable ? "cursor-pointer" : "cursor-not-allowed";
    return isAvailable ? "cursor-pointer" : "cursor-not-allowed";
  };

  const getHoverClass = () => {
    if (mode === "edit") return "hover:bg-blue-900/20 hover:border-blue-500";
    if (mode === "delete" && isAvailable) return "hover:bg-red-900/20 hover:border-red-500";
    if (mode === "normal" && isAvailable) return "hover:bg-gray-300 dark:hover:bg-[#2c2c2c]";
    return "";
  };

  return (
    <div
      onClick={handleClick}
      className={`w-full 
        bg-gray-200 dark:bg-[#262626] 
        p-4 rounded-lg transition-all border-2 border-transparent
        ${getCursorClass()} 
        ${getHoverClass()}
        ${!isAvailable && mode === "normal" ? "opacity-80" : ""}
      `}
    >
      <div className="flex items-center justify-between px-1 mb-2">
        <h1 className="text-gray-900 dark:text-[#f5f5f5] text-xl font-semibold">
          Mesa
          <FaLongArrowAltRight className="text-gray-500 dark:text-[#ababab] ml-2 inline" /> {name}
        </h1>

        {/* ESTADO */}
        <p
          className={`px-2 py-1 rounded-lg text-sm ${
            isAvailable
              ? "bg-yellow-200 text-yellow-700 dark:bg-[#4a3d0a] dark:text-yellow-400"
              : "bg-green-200 text-green-700 dark:bg-[#1a3d2e] dark:text-green-400"
          }`}
        >
          {status}
        </p>
      </div>

      {/* ICONOS MODO ADMIN */}
      {isAdmin && mode !== "normal" && (
        <div className="flex justify-center mb-2">
          {mode === "edit" ? (
            <MdEdit className="text-blue-500 dark:text-blue-400" size={24} />
          ) : (
            <MdDelete
              className={isAvailable ? "text-red-500 dark:text-red-400" : "text-gray-500 dark:text-gray-600"}
              size={24}
            />
          )}
        </div>
      )}

      {/* AVATAR */}
      <div className="flex items-center justify-center mt-5 mb-8">
        <h1
          className={`text-xl rounded-full p-5 
                      text-gray-900 dark:text-white
                      ${initials 
                        ? "" 
                        : "bg-gray-300 dark:bg-[#1f1f1f]"
                      }`}
          style={ initials ? { backgroundColor: getBgColor() } : {} }
        >
          {getAvatarName(initials) || "N/A"}
        </h1>
      </div>

      <p className="text-gray-600 dark:text-[#ababab] text-xs">
        Sillas: <span className="text-gray-900 dark:text-[#f5f5f5]">{seats}</span>
      </p>
    </div>
  );
};

export default TableCard;
