import React from "react";
import { FaSearch } from "react-icons/fa";
import { FaBell, FaUserCircle } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';
import logo from "../../assets/images/logo.png";
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
    
    try {
      // 1. PRIMERO llamar al backend para eliminar la cookie
      await logout();
      console.log("✅ Cookie eliminada del servidor");
    } catch (error) {
      console.error("❌ Error en logout backend:", error);
    }
    
    // 2. Limpiar Redux
    dispatch(removeUser());
    
    // 3. Limpiar React Query cache
    queryClient.clear();
    
    // 4. Limpiar localStorage y sessionStorage
    localStorage.clear();
    sessionStorage.clear();
    
    // 5. Mostrar mensaje
    enqueueSnackbar("Sesión cerrada correctamente", { variant: "success" });
    
    // 6. Forzar recarga completa para eliminar cookies del navegador
    window.location.href = "/auth";
  };

  return (
    <header className="flex justify-between items-center py-4 px-8 bg-[#1a1a1a]">
      {/* LOGO */}
      <div onClick={() => navigate("/")} className="flex items-center gap-2 cursor-pointer">
        <img src={logo} className="h-8 w-8" alt="restaurante logo" />
        <h1 className="text-lg font-semibold text-[#f5f5f5] tracking-wide"> Restaurante </h1>
      </div>

      {/* BUSCAR  */}
      <div className="flex items-center gap-4 bg-[#1f1f1f] rounded-[15px] px-5 py-2 w-[500px]">
        <FaSearch className="text-[#f5f5f5]" />
        <input
          type="text"
          placeholder="Buscar"
          className="bg-[#1f1f1f] outline-none text-[#f5f5f5] w-full"
        />
      </div>

      {/* CUENTA USUARIO INFORMACION  */}
      <div className="flex items-center gap-4">
        {userData.role === "Administrador" && (
          <div 
            onClick={() => navigate("/dashboard")} 
            className="bg-[#1f1f1f] rounded-[15px] p-3 cursor-pointer hover:bg-[#262626] transition"
          >
            <MdDashboard className="text-[#f5f5f5] text-2xl" />
          </div>
        )}
        <div className="bg-[#1f1f1f] rounded-[15px] p-3 cursor-pointer hover:bg-[#262626] transition">
          <FaBell className="text-[#f5f5f5] text-2xl" />
        </div>
        <div className="flex items-center gap-3">
          <FaUserCircle className="text-[#f5f5f5] text-4xl" />
          <div className="flex flex-col items-start">
            <h1 className="text-md text-[#f5f5f5] font-semibold tracking-wide">
              {userData.name || "Usuario"}
            </h1>
            <p className="text-xs text-[#ababab] font-medium">
              {userData.role || "Role"}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="ml-2 hover:opacity-80 transition cursor-pointer"
            title="Cerrar sesión"
          >
            <IoLogOut className="text-[#f5f5f5]" size={40} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
