import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const Greetings = () => {
    const userData = useSelector(state => state.user);
    const [dateTime, setDateTime] = useState(new Date());
    
    useEffect(() => {
        const timer = setInterval(() => setDateTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatDate = (date) => {
        const months = [
            'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ];
        return `${months[date.getMonth()]} ${String(date.getDate()).padStart(2, '0')}, ${date.getFullYear()}`;
    };

    const formatTime = (date) =>
        `${String(date.getHours()).padStart(2, "0")}:${String(
            date.getMinutes()
        ).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;

    return (
        <div className="flex justify-between items-center px-8 mt-5 
                        text-black dark:text-white">
            <div>
                <h1 className="text-2xl font-semibold tracking-wide">
                    Buen día, {userData.name || "TEST USER"}
                </h1>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                    Este es un mensaje de saludo.
                </span>
            </div>

            <div className="text-right">
                <h1 className="text-3xl font-bold tracking-wide w-[130px]">
                    {formatTime(dateTime)}
                </h1>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                    {formatDate(dateTime)}
                </span>
            </div>
        </div>
    );
};

export default Greetings;
