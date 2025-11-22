import React from "react";
import BottomNav from "../components/shared/BottomNav";
import BackButton from "../components/shared/BackButton";
import { MdRestaurantMenu } from "react-icons/md";
import MenuContainer from "../components/menu/MenuContainer";
import CustomerInfo from "../components/menu/CustomerInfo";
import CartInfo from "../components/menu/CartInfo";
import Bill from "../components/menu/Bill";
import { useSelector } from "react-redux";

const Menu = () => {

  const customerData = useSelector((state) => state.customer);

  return (
    <section className="bg-neutral-100 dark:bg-neutral-900 min-h-[calc(100vh-5rem)] overflow-y-auto flex gap-3 p-3 transition-colors">

      {/* Left - Menu de platillos */}
      <div className="flex-[3]">
        <div className="flex items-center justify-between px-10 py-4">
          
          {/* Back + Title */}
          <div className="flex items-center gap-4">
            <BackButton />
            <h1 className="text-neutral-900 dark:text-neutral-100 text-2xl font-bold tracking-wider">
              Menú
            </h1>
          </div>

          {/* Customer Info Header */}
          <div className="flex items-center justify-around gap-4">
            <div className="flex items-center gap-3 cursor-pointer">
              <MdRestaurantMenu className="text-neutral-900 dark:text-neutral-100 text-4xl" />
              <div className="flex flex-col items-start">
                <h1 className="text-md text-neutral-900 dark:text-neutral-100 font-semibold tracking-wide">
                  {customerData.customerName || "Customer Name"}
                </h1>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 font-medium">
                  Mesa : {customerData.table?.tableNo || "N/A"}
                </p>
              </div>
            </div>
          </div>

        </div>

        <MenuContainer />
      </div>

      {/* Right Side - Carrito y Factura */}
      <div className="flex-[1] bg-gray-100 dark:bg-[#1a1a1a] mt-4 mr-3 h-[850px] rounded-lg pt-2">

        <CustomerInfo />
        
        <div className="border-t border-neutral-300 dark:border-neutral-700 mt-2"></div>
        
        <CartInfo />
        
        <div className="border-t border-neutral-300 dark:border-neutral-700 mt-2"></div>

        <Bill />
      </div>

      <BottomNav />
    </section>
  );
};

export default Menu;
