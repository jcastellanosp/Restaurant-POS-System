import React, { useState } from "react"
import { register } from "../../https";
import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { FiUser, FiMail, FiPhone, FiLock } from "react-icons/fi";

const Register = ({setIsRegister}) => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: ""
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleRoleSelection = (selectedRole) => {
    setFormData({...formData, role: selectedRole});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    registerMutation.mutate(formData);
  }

  const registerMutation = useMutation({
    mutationFn: (reqData) => register(reqData),
    onSuccess: (res) => {
      const { data } = res;
      enqueueSnackbar(data.message, { variant: "success" });
      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
        role: "",
      });
      
      setTimeout(() => {
        setIsRegister(false);
      }, 1500);
    },
    onError: (error) => {
      const { response } = error;
      enqueueSnackbar(response.data.message, { variant: "error" });
    }
  })   

  return (
    <div className="w-full max-w-md mx-auto px-4">
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Nombre del empleado */}
        <div>
          <label className="block text-gray-700 dark:text-[#ababab] mb-3 text-sm font-medium">
            Nombre del empleado
          </label>
          <div className="flex items-center rounded-lg px-5 py-4
            bg-gray-100 dark:bg-[#1f1f1f]
            border-2 border-gray-300 dark:border-transparent
            focus-within:ring-2 focus-within:ring-yellow-400 dark:focus-within:ring-yellow-500
            transition-all">
            <FiUser className="text-gray-500 dark:text-gray-400 mr-3 text-xl" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
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

        {/* Correo del empleado */}
        <div>
          <label className="block text-gray-700 dark:text-[#ababab] mb-3 text-sm font-medium">
            Correo del empleado
          </label>
          <div className="flex items-center rounded-lg px-5 py-4
            bg-gray-100 dark:bg-[#1f1f1f]
            border-2 border-gray-300 dark:border-transparent
            focus-within:ring-2 focus-within:ring-yellow-400 dark:focus-within:ring-yellow-500
            transition-all">
            <FiMail className="text-gray-500 dark:text-gray-400 mr-3 text-xl" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="ejemplo@correo.com"
              className="bg-transparent flex-1 
                text-gray-900 dark:text-white
                placeholder-gray-400 dark:placeholder-gray-500
                focus:outline-none
                text-base"
              required
            />
          </div>
        </div>

        {/* Celular del empleado */}
        <div>
          <label className="block text-gray-700 dark:text-[#ababab] mb-3 text-sm font-medium">
            Celular del empleado
          </label>
          <div className="flex items-center rounded-lg px-5 py-4
            bg-gray-100 dark:bg-[#1f1f1f]
            border-2 border-gray-300 dark:border-transparent
            focus-within:ring-2 focus-within:ring-yellow-400 dark:focus-within:ring-yellow-500
            transition-all">
            <FiPhone className="text-gray-500 dark:text-gray-400 mr-3 text-xl" />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
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

        {/* Contraseña */}
        <div>
          <label className="block text-gray-700 dark:text-[#ababab] mb-3 text-sm font-medium">
            Contraseña
          </label>
          <div className="flex items-center rounded-lg px-5 py-4
            bg-gray-100 dark:bg-[#1f1f1f]
            border-2 border-gray-300 dark:border-transparent
            focus-within:ring-2 focus-within:ring-yellow-400 dark:focus-within:ring-yellow-500
            transition-all">
            <FiLock className="text-gray-500 dark:text-gray-400 mr-3 text-xl" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Mínimo 6 caracteres"
              className="bg-transparent flex-1 
                text-gray-900 dark:text-white
                placeholder-gray-400 dark:placeholder-gray-500
                focus:outline-none
                text-base"
              required
            />
          </div>
        </div>

        {/* Rol del empleado */}
        <div>
          <label className="block text-gray-700 dark:text-[#ababab] mb-3 text-sm font-medium">
            Elige tu rol
          </label>
          <div className="flex items-center gap-3 mt-4">
            {["Camarero", "Cajero", "Administrador"].map((role) => {
              return (
                <button
                  key={role}
                  type="button"
                  onClick={() => handleRoleSelection(role)}
                  className={`px-4 py-3 w-full rounded-lg text-sm font-semibold
                    transition-all
                    ${formData.role === role 
                      ? "bg-indigo-600 dark:bg-indigo-600 text-white ring-2 ring-indigo-400" 
                      : "bg-gray-200 dark:bg-[#1f1f1f] text-gray-700 dark:text-[#ababab] hover:bg-gray-300 dark:hover:bg-[#2a2a2a]"
                    }`}
                >
                  {role}
                </button>
              );
            })}
          </div>
        </div>

        {/* Botón de Submit */}
        <button 
          type="submit"
          disabled={registerMutation.isPending || !formData.role}
          className="w-full rounded-lg mt-8 py-4 text-lg 
            bg-yellow-500 dark:bg-yellow-400 
            text-gray-900 
            font-bold
            hover:bg-yellow-600 dark:hover:bg-yellow-500
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-all
            shadow-md
            transform active:scale-95"
        >
          {registerMutation.isPending ? "Registrando..." : "Registrarse"}
        </button>
      </form>
    </div>
  );
};

export default Register;