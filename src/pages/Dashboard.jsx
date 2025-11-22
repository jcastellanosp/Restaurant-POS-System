import React, { useState } from "react";
import { MdTableBar, MdCategory } from "react-icons/md";
import { BiSolidDish } from "react-icons/bi";
import Metrics from "../components/dashboard/Metrics";
import RecentOrders from "../components/dashboard/RecentOrders";
import Modal from "../components/dashboard/Modal";

const buttons = [
  { label: "Agregar Mesa", icon: <MdTableBar />, action: "table" },
  { label: "Agregar Categoria", icon: <MdCategory />, action: "category" },
  { label: "Agregar Platos", icon: <BiSolidDish />, action: "dishes" },
];

const tabs = ["Metricas", "Ordenes", "Pagos"];

const Dashboard = () => {

  const [isTableModalOpen, setIsTableModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Metricas");

  const handleOpenModal = (action) => {
    if (action === "table") setIsTableModalOpen(true);
  };  

  return (
    <div className="bg-gray-100 dark:bg-[#1f1f1f] min-h-screen">
      <div className="container mx-auto flex items-center justify-between py-14 px-6 md:px-4">
        {/* Botones de Agregar */}
        <div className="flex items-center gap-3">
          {buttons.map(({ label, icon, action }) => {
            return (
              <button
                key={action}
                onClick={() => handleOpenModal(action)}
                className="bg-white dark:bg-[#1a1a1a] 
                  hover:bg-gray-200 dark:hover:bg-[#262626] 
                  px-8 py-3 rounded-lg 
                  text-gray-800 dark:text-[#f5f5f5] 
                  font-semibold text-md 
                  flex items-center gap-2
                  transition-colors
                  shadow-sm dark:shadow-none"
              >
                {label} {icon}
              </button>
            );
          })}
        </div>

        {/* Tabs de Navegación */}
        <div className="flex items-center gap-3">
          {tabs.map((tab) => {
            return (
              <button
                key={tab}
                className={`
                  px-8 py-3 rounded-lg 
                  font-semibold text-md 
                  flex items-center gap-2
                  transition-colors
                  ${activeTab === tab 
                    ? "bg-gray-300 dark:bg-[#262626] text-gray-900 dark:text-[#f5f5f5] shadow-sm" 
                    : "bg-white dark:bg-[#1a1a1a] text-gray-700 dark:text-[#f5f5f5] hover:bg-gray-200 dark:hover:bg-[#262626] shadow-sm dark:shadow-none"
                  }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      {/* Contenido de los Tabs */}
      {activeTab === "Metricas" && <Metrics />}
      {activeTab === "Ordenes" && <RecentOrders />}

      {/* Modal */}
      {isTableModalOpen && <Modal setIsTableModalOpen={setIsTableModalOpen} />}
    </div>
  );
};

export default Dashboard;