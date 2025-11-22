import React, { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

const More = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    
    // Actualizar DOM
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(newTheme);
    
    // Actualizar estado y localStorage
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // Aplica el tema al cargar el componente
  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);

  return (
    <section className="h-screen p-8 bg-white dark:bg-[#1f1f1f] text-black dark:text-white">
      <h1 className="text-3xl font-bold mb-6">Configuraciones</h1>

      <div className="flex items-center justify-between bg-gray-200 dark:bg-[#2a2a2a] px-5 py-4 rounded-xl">
        <div className="flex items-center gap-3">
          {theme === "dark" ? (
            <FiMoon className="text-2xl" />
          ) : (
            <FiSun className="text-2xl" />
          )}
          <div>
            <p className="text-lg font-semibold">Tema de Apariencia</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Modo {theme === "dark" ? "Oscuro" : "Claro"}
            </p>
          </div>
        </div>

        <button
          onClick={toggleTheme}
          className="px-6 py-3 rounded-lg 
            bg-yellow-500 dark:bg-yellow-400 
            text-gray-900 
            font-semibold
            hover:bg-yellow-600 dark:hover:bg-yellow-500
            transition-all
            shadow-md"
        >
          Cambiar a {theme === "dark" ? "Claro" : "Oscuro"}
        </button>
      </div>
    </section>
  );
};

export default More;