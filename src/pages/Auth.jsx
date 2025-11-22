import React, { useState } from "react"
import restaurant from "../assets/images/restaurant-img.jpg"
import logoDark from "../assets/images/logo-dark.png"; // Logo dorado
import logoLight from "../assets/images/logo-light.png"; // Logo negro
import Register from "../components/auth/Register";
import Login from "../components/auth/Login";

const Auth = () => {

  const [isRegister, setIsRegister] = useState(false);

  return (
    <div className="flex min-h-screen w-full">
      {/* Left Section - Imagen con Quote */}
      <div className="w-1/2 relative flex items-center justify-center bg-cover">
        <img 
          className="w-full h-full object-cover" 
          src={restaurant} 
          alt="Restaurant Image" 
        />

        <div className="absolute inset-0 bg-black bg-opacity-70 dark:bg-opacity-80"></div>

        <blockquote className="absolute bottom-4 px-8 mb-4 text-2xl italic text-white z-10">
          "Sirve a los clientes la mejor comida con un servicio rápido y amable 
          en un ambiente acogedor, y seguirán regresando."
          <br />
          <span className="block mt-2 text-yellow-400 dark:text-yellow-300">
            - Founder of Restro
          </span>
        </blockquote>
      </div>

      {/* Right Section - Formulario */}
      <div className="w-1/2 min-h-screen bg-gray-50 dark:bg-[#1a1a1a] p-6 flex flex-col">
        {/* Logo que cambia según el modo */}
        <div className="flex flex-col items-center gap-2 mt-8">
          <img 
            src={logoLight} 
            alt="Restro Logo" 
            className="h-16 w-16 block dark:hidden border-2 border-yellow-400 rounded-full p-2 bg-white" 
          />
          <img 
            src={logoDark} 
            alt="Restro Logo" 
            className="h-16 w-16 hidden dark:block border-2 border-yellow-500 rounded-full p-2 bg-gray-800" 
          />
          <h1 className="text-lg font-semibold text-gray-900 dark:text-[#f5f5f5] tracking-wide">
            Restaurante POS
          </h1>
        </div>

        <h2 className="text-3xl text-center mt-10 font-semibold text-yellow-500 dark:text-yellow-400 mb-10">
          {isRegister ? "Registro de empleados" : "Inicio de Sesión del empleado"}
        </h2>

        <div className="flex-1 flex items-start justify-center">
          {isRegister ? <Register setIsRegister={setIsRegister} /> : <Login />}
        </div>
        
        <div className="flex justify-center mt-6 mb-8">
          <p className="text-sm text-gray-600 dark:text-[#ababab]">
            {isRegister ? "¿Ya tienes una cuenta? " : "¿No tienes una cuenta? "}
            <button 
              onClick={() => setIsRegister(!isRegister)} 
              className="text-yellow-500 dark:text-yellow-400 font-semibold hover:underline ml-1 transition-all"
            >
              {isRegister ? "Iniciar sesión" : "Registrarse"}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Auth;