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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";

const Header = () => {
  const userData = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const logoutMutation = useMutation({
    mutationFn: () => logout(),
    onSuccess: (data) => {
      console.log("✅ Logout exitoso:", data);
      
      // 1. Limpiar Redux
      dispatch(removeUser());
      
      // 2. Limpiar React Query cache
      queryClient.clear();
      
      // 3. Limpiar localStorage
      localStorage.clear();
      
      // 4. Limpiar sessionStorage
      sessionStorage.clear();
      
      // 5. Mostrar mensaje
      enqueueSnackbar("Sesión cerrada correctamente", { variant: "success" });
      
      // 6. Navegar a login con replace (no permite volver con back)
      navigate("/auth", { replace: true });
      
      // 7. Recargar la página para limpiar cualquier estado residual
      setTimeout(() => {
        window.location.href = "/auth";
      }, 100);
    },
    onError: (error) => {
      console.error("❌ Error en logout:", error);
      
      // Incluso si hay error en el backend, limpiar todo localmente
      dispatch(removeUser());
      queryClient.clear();
      localStorage.clear();
      sessionStorage.clear();
      
      enqueueSnackbar("Sesión cerrada localmente", { variant: "warning" });
      
      // Forzar recarga
      window.location.href = "/auth";
    },
  }); 

  const handleLogout = () => {
    console.log("🔴 Iniciando logout...");
    logoutMutation.mutate();
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
            disabled={logoutMutation.isPending}
            className={`ml-2 hover:opacity-80 transition ${
              logoutMutation.isPending ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
            }`}
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
