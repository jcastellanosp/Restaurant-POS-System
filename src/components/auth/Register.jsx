import React, { useState } from "react"
import { register } from "../../https";
import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";

const Register = ({setIsRegister}) => {

  const[formData, setFormData] = useState({
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
    <div>
      <form onSubmit={handleSubmit}>
        {/* Nombre del empleado */}
        <div>
          <label className="block text-[#ababab] mb-2 text-sm font-medium">
            Nombre del empleado
          </label>
          <div className="flex items-center rounded-lg p-5 px-4 bg-[#1f1f1f]">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ingrese el nombre del empleado"
              className="bg-transparent flex-1 text-white focus:outline-none"
              required
            />
          </div>
        </div>
        {/* Correo del empleado */}
        <div>
          <label className="block text-[#ababab] mb-2 mt-3 text-sm font-medium">
            Correo del empleado
          </label>
          <div className="flex items-center rounded-lg p-5 px-4 bg-[#1f1f1f]">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Ingrese el correo del empleado"
              className="bg-transparent flex-1 text-white focus:outline-none"
              required
            />
          </div>
        </div>
        {/* Celular del empleado */}
        <div>
          <label className="block text-[#ababab] mb-2 mt-3 text-sm font-medium">
            Celular del empleado
          </label>
          <div className="flex items-center rounded-lg p-5 px-4 bg-[#1f1f1f]">
            <input
              type="number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Ingrese el celular del empleado"
              className="bg-transparent flex-1 text-white focus:outline-none"
              required
            />
          </div>
        </div>

        {/* Contraseña */}
        <div>
          <label className="block text-[#ababab] mb-2 mt-3 text-sm font-medium">
            Contraseña
          </label>
          <div className="flex items-center rounded-lg p-5 px-4 bg-[#1f1f1f]">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Ingrese la contraseña"
              className="bg-transparent flex-1 text-white focus:outline-none"
              required
            />
          </div>
        </div>

        {/* Rol del empleado */}
        <div>
          <label className="block text-[#ababab] mb-2 mt-3 text-sm font-medium">
            Elige tu rol
          </label>
          <div className="flex items-center gap-3 mt-4">
            {["Camarero", "Cajero", "Administrador"].map((role) => {
                return (
              <button
                key={role}
                type="button"
                onClick={() => handleRoleSelection(role)}
                className={`bg-[#1f1f1f] px-4 py-3 w-full rounded-lg text-[#ababab] ${formData.role === role ? "bg-indigo-700" : ""}`}
              >
                {role}
              </button>
              );
            })}
          </div>
        </div>

        <button type="submit" className="w-full rounded-lg mt-6 py-3 text-lg bg-yellow-400 text-gray-900 front-bold}">
            Registrarse
        </button>
      </form>
    </div>
  );
};

export default Register
