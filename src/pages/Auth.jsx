import React, { useState } from "react"
import restaurant from "../assets/images/restaurant-img.jpg"
import logo from "../assets/images/logo.png"
import Register from "../components/auth/Register";
import Login from "../components/auth/Login";

const Auth = () => {

  const [isRegister, setIsRegister] = useState(false);

  return (
    <div className="flex min-h-screen w-full">
      {/* left section */}
      <div className="w-1/2 relative flex items-center justify-center bg-cover">
        {/* BG Image */}
        <img className="w-full h-full object-cover" src={restaurant} alt="Restaurant Image" />

        {/* Black Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>

        {/* Quote at bottom */}
        <blockquote className="absolute bottom-4 px-4 mb-4 text-2xl italic text-white">
          "Sirve a los clientes la mejor comida con un servicio rápido y amable 
          en un ambiente acogedor, y seguirán regresando."
          <br />
          <span className="block mt-2 text-yellow-400">- Founder of Restro</span>
        </blockquote>
      </div>

      {/* Right Section */}
      <div className="w-1/2 min-h-screen bg-[#1a1a1a] p-6">
        <div className="flex flex-col items-center gap-2">
          <img src={logo} alt="Restro Logo" className="h-14 w-14 border-2 rounded-full p-1" />
          <h1 className="text-lg font-semibold text-[#f5f5f5] tracking-wide"></h1>
        </div>

        <h2 className="text-4x1 text-center mt-10 front-semibold text-yellow-400 mb-10">
          {isRegister ? "Registro de empleados" : "Inicio de Sesion del empleado"}
        </h2>

        { /*Componentes*/ } 
        {isRegister ? <Register setIsRegister={setIsRegister} /> : <Login />}
        
        
        <div className="flex justify-center mt-6">
          <p className="text-sm text-[#ababab]">
            {isRegister ? "¿Ya tienes una cuenta?" : "¿No tienes una cuenta?"}
            <a onClick={() => setIsRegister(!isRegister)} className="text-yellow-400 font-semibold hover:underline"href="#">
              {isRegister ? "Iniciar sesión" : "Registrarse"}
            </a>
          </p>
        </div>


      </div>
    </div>
  )
}

export default Auth
