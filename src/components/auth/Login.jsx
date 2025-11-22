import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query"
import { login } from "../../https/index";
import { enqueueSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { FiMail, FiLock } from "react-icons/fi";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        email: "",  
        password: "",
    });
    
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        loginMutation.mutate(formData);
    }

    const loginMutation = useMutation({
        mutationFn: (reqData) => login(reqData),
        onSuccess: (res) => {
            const { data } = res;
            console.log(data);
            const { _id, name, email, phone, role } = data.data;
            dispatch(setUser({ _id, name, email, phone, role }));
            enqueueSnackbar("¡Inicio de sesión exitoso!", { variant: "success" });
            navigate("/");
        },
        onError: (error) => {
            const { response } = error;
            enqueueSnackbar(response.data.message, { variant: "error" });
        }
    })   

    return (
        <div className="w-full max-w-md mx-auto px-4">
            <form onSubmit={handleSubmit} className="space-y-6">
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
                            placeholder="Ingrese su contraseña"
                            className="bg-transparent flex-1 
                                text-gray-900 dark:text-white
                                placeholder-gray-400 dark:placeholder-gray-500
                                focus:outline-none
                                text-base"
                            required
                        />
                    </div>
                </div>

                {/* Botón de Submit */}
                <button 
                    type="submit" 
                    disabled={loginMutation.isPending}
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
                    {loginMutation.isPending ? "Iniciando sesión..." : "Iniciar sesión"}
                </button>
            </form>
        </div>
    );
};

export default Login;