import React from "react";
import { FaSearch } from "react-icons/fa";
import { FaBell, FaUserCircle } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';
import logoDark from "../../assets/images/logo-dark.png"; // Logo dorado
import logoLight from "../../assets/images/logo-light.png"; // Logo negro
import { IoLogOut } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { logout } from "../../https"; 
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../../redux/slices/userSlice";
import { useQueryClient } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";

const Header = () => {
  const userData = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    console.log("🔴 Iniciando logout...");
    
    const currentTheme = localStorage.getItem("theme") || "dark";
    
    try {
      await logout();
      console.log("✅ Cookie eliminada del servidor");
    } catch (error) {
      console.error("❌ Error en logout backend:", error);
    }
    
    dispatch(removeUser());
    queryClient.clear();
    localStorage.clear();
    sessionStorage.clear();
    localStorage.setItem("theme", currentTheme);
    
    enqueueSnackbar("Sesión cerrada correctamente", { variant: "success" });
    window.location.href = "/auth";
  };

  return (
    <header className="flex justify-between items-center py-4 px-8 bg-white dark:bg-[#1a1a1a] border-b border-gray-200 dark:border-gray-800">
      {/* LOGO */}
      <div onClick={() => navigate("/")} className="flex items-center gap-2 cursor-pointer">
        {/* Logo que cambia según el modo */}
        <img 
          src={logoLight} 
          className="h-10 w-10 block dark:hidden" 
          alt="restaurante logo" 
        />
        <img 
          src={logoDark} 
          className="h-10 w-10 hidden dark:block" 
          alt="restaurante logo" 
        />
        <h1 className="text-lg font-semibold text-gray-900 dark:text-[#f5f5f5] tracking-wide">
          Restaurante
        </h1>
      </div>

      {/* BUSCAR  */}
      <div className="flex items-center gap-4 bg-gray-100 dark:bg-[#1f1f1f] rounded-[15px] px-5 py-2 w-[500px] border border-gray-300 dark:border-transparent">
        <FaSearch className="text-gray-600 dark:text-[#f5f5f5]" />
        <input
          type="text"
          placeholder="Buscar"
          className="bg-transparent outline-none text-gray-900 dark:text-[#f5f5f5] placeholder-gray-400 dark:placeholder-gray-500 w-full"
        />
      </div>

      {/* CUENTA USUARIO INFORMACION  */}
      <div className="flex items-center gap-4">
        {userData.role === "Administrador" && (
          <div 
            onClick={() => navigate("/dashboard")} 
            className="bg-gray-100 dark:bg-[#1f1f1f] rounded-[15px] p-3 cursor-pointer hover:bg-gray-200 dark:hover:bg-[#262626] transition"
          >
            <MdDashboard className="text-gray-700 dark:text-[#f5f5f5] text-2xl" />
          </div>
        )}
        <div className="bg-gray-100 dark:bg-[#1f1f1f] rounded-[15px] p-3 cursor-pointer hover:bg-gray-200 dark:hover:bg-[#262626] transition">
          <FaBell className="text-gray-700 dark:text-[#f5f5f5] text-2xl" />
        </div>
        <div className="flex items-center gap-3">
          <FaUserCircle className="text-gray-700 dark:text-[#f5f5f5] text-4xl" />
          <div className="flex flex-col items-start">
            <h1 className="text-md text-gray-900 dark:text-[#f5f5f5] font-semibold tracking-wide">
              {userData.name || "Usuario"}
            </h1>
            <p className="text-xs text-gray-600 dark:text-[#ababab] font-medium">
              {userData.role || "Role"}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="ml-2 hover:opacity-80 transition cursor-pointer"
            title="Cerrar sesión"
          >
            <IoLogOut className="text-gray-700 dark:text-[#f5f5f5]" size={40} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;