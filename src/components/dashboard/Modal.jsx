import React, { useState } from "react";
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { useMutation } from "@tanstack/react-query";
import { addTable } from "../../https";
import { enqueueSnackbar } from "notistack"

const Modal = ({ setIsTableModalOpen }) => {
  const [tableData, setTableData] = useState({
    tableNo: "",
    seats: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTableData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(tableData);
    tableMutation.mutate(tableData);
  };

  const handleCloseModal = () => {
    setIsTableModalOpen(false);
  };

  const tableMutation = useMutation({
    mutationFn: (reqData) => addTable(reqData),
    onSuccess: (res) => {
        setIsTableModalOpen(false);
        const { data } = res;
        enqueueSnackbar(data.message, { variant: "success" })
    },
    onError: (error) => {
        const { data } = error.response;
        enqueueSnackbar(data.message, { variant: "error" })
        console.log(error);
    }
  })

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="bg-white dark:bg-[#262626] p-6 rounded-lg shadow-xl w-96"
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-gray-900 dark:text-[#f5f5f5] text-xl font-semibold">
            Agregar Mesa
          </h2>
          <button
            onClick={handleCloseModal}
            className="text-gray-600 dark:text-[#f5f5f5] 
              hover:text-red-500 dark:hover:text-red-500
              transition-colors"
          >
            <IoMdClose size={24} />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="space-y-4 mt-10">
          {/* Número de Mesa */}
          <div>
            <label className="block text-gray-600 dark:text-[#ababab] mb-2 mt-3 text-sm font-medium">
              Número de mesa
            </label>
            <div className="flex items-center rounded-lg p-5 px-4 
              bg-gray-100 dark:bg-[#1f1f1f]
              border border-gray-300 dark:border-transparent
              focus-within:ring-2 focus-within:ring-yellow-400 dark:focus-within:ring-yellow-500
              transition-all">
              <input
                type="number"
                name="tableNo"
                value={tableData.tableNo}
                onChange={handleInputChange}
                placeholder="Ej: 1"
                className="bg-transparent flex-1 
                  text-gray-900 dark:text-white 
                  placeholder-gray-400 dark:placeholder-gray-500
                  focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Número de Sillas */}
          <div>
            <label className="block text-gray-600 dark:text-[#ababab] mb-2 mt-3 text-sm font-medium">
              Número de sillas
            </label>
            <div className="flex items-center rounded-lg p-5 px-4 
              bg-gray-100 dark:bg-[#1f1f1f]
              border border-gray-300 dark:border-transparent
              focus-within:ring-2 focus-within:ring-yellow-400 dark:focus-within:ring-yellow-500
              transition-all">
              <input
                type="number"
                name="seats"
                value={tableData.seats}
                onChange={handleInputChange}
                placeholder="Ej: 4"
                className="bg-transparent flex-1 
                  text-gray-900 dark:text-white 
                  placeholder-gray-400 dark:placeholder-gray-500
                  focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Botón Submit */}
          <button
            type="submit"
            disabled={tableMutation.isPending}
            className="w-full rounded-lg mt-10 mb-6 py-3 text-lg 
              bg-yellow-400 dark:bg-yellow-400 
              text-gray-900 dark:text-gray-900 
              font-bold
              hover:bg-yellow-500 dark:hover:bg-yellow-500
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-all
              shadow-md"
          >
            {tableMutation.isPending ? "Agregando..." : "Agregar Mesa"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Modal;