import React from "react";
import { itemsData, metricsData } from "../../constants";

const Metrics = () => {
  return (
    <div className="container mx-auto py-2 px-6 md:px-4">
      {/* Encabezado Principal */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-semibold text-gray-900 dark:text-[#f5f5f5] text-xl">
            Rendimiento General
          </h2>
          <p className="text-sm text-gray-600 dark:text-[#ababab] mt-1">
            Visión general de ingresos, clientes y eventos: 
            compara tendencias clave para ayudarte a tomar decisiones rápidas.
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-md 
          text-gray-700 dark:text-[#f5f5f5] 
          bg-white dark:bg-[#1a1a1a] 
          hover:bg-gray-100 dark:hover:bg-[#262626]
          shadow-sm dark:shadow-none
          transition-colors
          border border-gray-300 dark:border-transparent">
          Last 1 Month
          <svg
            className="w-3 h-3"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
          >
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Cards de Métricas */}
      <div className="mt-6 grid grid-cols-4 gap-4">
        {metricsData.map((metric, index) => {
          return (
            <div
              key={index}
              className="shadow-md dark:shadow-sm rounded-lg p-4 transition-transform hover:scale-105"
              style={{ backgroundColor: metric.color }}
            >
              <div className="flex justify-between items-center">
                <p className="font-medium text-xs text-white">
                  {metric.title}
                </p>
                <div className="flex items-center gap-1">
                  <svg
                    className="w-3 h-3"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    style={{ color: metric.isIncrease ? "#ffffff" : "#ff4444" }}
                  >
                    <path
                      d={metric.isIncrease ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                    />
                  </svg>
                  <p
                    className="font-medium text-xs"
                    style={{ color: metric.isIncrease ? "#ffffff" : "#ff4444" }}
                  >
                    {metric.percentage}
                  </p>
                </div>
              </div>
              <p className="mt-2 font-semibold text-2xl text-white">
                {metric.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* Sección de Detalles */}
      <div className="flex flex-col justify-between mt-12">
        <div>
          <h2 className="font-semibold text-gray-900 dark:text-[#f5f5f5] text-xl">
            Detalles
          </h2>
          <p className="text-sm text-gray-600 dark:text-[#ababab] mt-1">
            Detalle del inventario y operaciones: 
            número de categorías, platos disponibles, pedidos activos y mesas en servicio.
          </p>
        </div>

        {/* Cards de Items */}
        <div className="mt-6 grid grid-cols-4 gap-4">
          {itemsData.map((item, index) => {
            return (
              <div 
                key={index} 
                className="shadow-md dark:shadow-sm rounded-lg p-4 transition-transform hover:scale-105" 
                style={{ backgroundColor: item.color }}
              >
                <div className="flex justify-between items-center">
                  <p className="font-medium text-xs text-white">
                    {item.title}
                  </p>
                  <div className="flex items-center gap-1">
                    <svg 
                      className="w-3 h-3 text-white" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor" 
                      strokeWidth="4" 
                      fill="none"
                    >
                      <path d="M5 15l7-7 7 7" />
                    </svg>
                    <p className="font-medium text-xs text-white">
                      {item.percentage}
                    </p>
                  </div>
                </div>
                <p className="mt-2 font-semibold text-2xl text-white">
                  {item.value}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Metrics;