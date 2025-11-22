import React, { useState } from "react";
import { FaHome } from "react-icons/fa";
import { MdOutlineReorder, MdTableBar } from "react-icons/md";
import { CiCircleMore } from "react-icons/ci";
import { BiSolidDish } from "react-icons/bi";
import { FiUser, FiPhone, FiUsers } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";
import Modal from "./Modal";
import { useDispatch } from "react-redux";
import { setCustomer } from "../../redux/slices/customerSlice";

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [guestCount, setGuestCount] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    // Reset form
    setName("");
    setPhone("");
    setGuestCount(1);
  };

  const increment = () => {
    if (guestCount >= 6) return;
    setGuestCount((prev) => prev + 1);
  };

  const decrement = () => {
    if (guestCount <= 1) return;
    setGuestCount((prev) => prev - 1);
  };

  const handleCreateOrder = () => {
    if (!name.trim() || !phone.trim()) {
      alert("Por favor completa todos los campos");
      return;
    }
    dispatch(setCustomer({ name, phone, guests: guestCount }));
    closeModal();
    navigate("/tables");
  };

  return (
    <div className="
      fixed bottom-0 left-0 right-0 
      bg-gray-200 dark:bg-[#262626] 
      p-2 h-16 flex justify-around shadow-lg
      border-t border-gray-300 dark:border-gray-700
    ">
      {/* HOME */}
      <button
        onClick={() => navigate("/")}
        className={`flex items-center justify-center font-bold 
          w-[300px] rounded-[20px] transition-all
          ${location.pathname === "/" 
            ? "bg-yellow-400 dark:bg-yellow-500 text-gray-900" 
            : "bg-gray-300 dark:bg-[#343434] text-gray-700 dark:text-[#f5f5f5] hover:bg-gray-400 dark:hover:bg-[#3d3d3d]"
          }`}
      >
        <FaHome className="inline mr-2" size={20} /> <p>Home</p>
      </button>

      {/* PEDIDOS */}
      <button
        onClick={() => navigate("/orders")}
        className={`flex items-center justify-center font-bold 
          w-[300px] rounded-[20px] transition-all
          ${location.pathname === "/orders" 
            ? "bg-yellow-400 dark:bg-yellow-500 text-gray-900" 
            : "bg-gray-300 dark:bg-[#343434] text-gray-700 dark:text-[#f5f5f5] hover:bg-gray-400 dark:hover:bg-[#3d3d3d]"
          }`}
      >
        <MdOutlineReorder className="inline mr-2" size={20} /> <p>Pedidos</p>
      </button>

      {/* MESAS */}
      <button
        onClick={() => navigate("/tables")}
        className={`flex items-center justify-center font-bold 
          w-[300px] rounded-[20px] transition-all
          ${location.pathname === "/tables" 
            ? "bg-yellow-400 dark:bg-yellow-500 text-gray-900" 
            : "bg-gray-300 dark:bg-[#343434] text-gray-700 dark:text-[#f5f5f5] hover:bg-gray-400 dark:hover:bg-[#3d3d3d]"
          }`}
      >
        <MdTableBar className="inline mr-2" size={20} /> <p>Mesas</p>
      </button>

      {/* MÁS */}
      <button
        onClick={() => navigate("/more")}
        className={`flex items-center justify-center font-bold 
          w-[300px] rounded-[20px] transition-all
          ${location.pathname === "/more" 
            ? "bg-yellow-400 dark:bg-yellow-500 text-gray-900" 
            : "bg-gray-300 dark:bg-[#343434] text-gray-700 dark:text-[#f5f5f5] hover:bg-gray-400 dark:hover:bg-[#3d3d3d]"
          }`}
      >
        <CiCircleMore className="inline mr-2" size={20} /> <p>Más</p>
      </button>

      {/* BOTÓN DE NUEVO PEDIDO */}
      <button
        onClick={openModal}
        className="
          absolute bottom-6 
          bg-yellow-500 dark:bg-[#F6B100] 
          hover:bg-yellow-600 dark:hover:bg-yellow-600
          text-white rounded-full p-3 shadow-lg
          transition-all
          transform hover:scale-110 active:scale-95
        "
        aria-label="Nuevo pedido"
      >
        <BiSolidDish size={40} />
      </button>

      {/* MODAL */}
      <Modal isOpen={isModalOpen} onClose={closeModal} title="Nuevo Pedido">
        <div className="space-y-5">
          {/* Nombre Cliente */}
          <div>
            <label className="block text-gray-700 dark:text-[#ababab] mb-3 text-sm font-medium">
              Nombre del Cliente
            </label>
            <div className="flex items-center rounded-lg px-5 py-4
              bg-gray-100 dark:bg-[#1f1f1f]
              border-2 border-gray-300 dark:border-transparent
              focus-within:ring-2 focus-within:ring-yellow-400 dark:focus-within:ring-yellow-500
              transition-all">
              <FiUser className="text-gray-500 dark:text-gray-400 mr-3 text-xl" />
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Juan Pérez"
                className="bg-transparent flex-1 
                  text-gray-900 dark:text-white 
                  placeholder-gray-400 dark:placeholder-gray-500
                  focus:outline-none
                  text-base"
                required
              />
            </div>
          </div>

          {/* Teléfono */}
          <div>
            <label className="block text-gray-700 dark:text-[#ababab] mb-3 text-sm font-medium">
              Teléfono del Cliente
            </label>
            <div className="flex items-center rounded-lg px-5 py-4
              bg-gray-100 dark:bg-[#1f1f1f]
              border-2 border-gray-300 dark:border-transparent
              focus-within:ring-2 focus-within:ring-yellow-400 dark:focus-within:ring-yellow-500
              transition-all">
              <FiPhone className="text-gray-500 dark:text-gray-400 mr-3 text-xl" />
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="tel"
                placeholder="3001234567"
                className="bg-transparent flex-1 
                  text-gray-900 dark:text-white 
                  placeholder-gray-400 dark:placeholder-gray-500
                  focus:outline-none
                  text-base"
                required
              />
            </div>
          </div>

          {/* Invitados */}
          <div>
            <label className="flex items-center gap-2 mb-3 text-sm font-medium text-gray-700 dark:text-[#ababab]">
              <FiUsers className="text-xl" />
              Número de Invitados
            </label>
            <div className="flex items-center justify-between 
              bg-gray-100 dark:bg-[#1f1f1f] 
              border-2 border-gray-300 dark:border-transparent
              px-5 py-4 rounded-lg">
              <button 
                type="button"
                onClick={decrement} 
                className="text-yellow-600 dark:text-yellow-400 text-3xl font-bold
                  hover:text-yellow-700 dark:hover:text-yellow-300
                  transition-colors
                  disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={guestCount <= 1}
              >
                &minus;
              </button>

              <span className="text-gray-900 dark:text-white text-lg font-semibold">
                {guestCount} {guestCount === 1 ? "Persona" : "Personas"}
              </span>

              <button 
                type="button"
                onClick={increment} 
                className="text-yellow-600 dark:text-yellow-400 text-3xl font-bold
                  hover:text-yellow-700 dark:hover:text-yellow-300
                  transition-colors
                  disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={guestCount >= 6}
              >
                &#43;
              </button>
            </div>
          </div>

          {/* Botón Crear Pedido */}
          <button
            onClick={handleCreateOrder}
            disabled={!name.trim() || !phone.trim()}
            className="w-full 
              bg-yellow-500 dark:bg-[#F6B100] 
              hover:bg-yellow-600 dark:hover:bg-yellow-600
              text-white font-bold
              rounded-lg py-4 mt-8 
              transition-all
              shadow-md
              disabled:opacity-50 disabled:cursor-not-allowed
              transform active:scale-95"
          >
            Crear pedido
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default BottomNav;