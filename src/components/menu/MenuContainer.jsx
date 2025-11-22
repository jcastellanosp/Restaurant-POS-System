import React, { useState } from "react";
import { menus } from "../../constants";
import { GrRadialSelected } from "react-icons/gr";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addItems } from "../../redux/slices/cartSlice";

const MenuContainer = () => {
  const [selected, setSelected] = useState(menus[0]);
  const [itemCount, setItemCount] = useState(0);
  const [itemId, setItemId] = useState();
  const dispatch = useDispatch();

  const increment = (id) => {
    setItemId(id);
    if (itemCount >= 4) return;
    setItemCount((prev) => prev + 1);
  };

  const decrement = (id) => {
    setItemId(id);
    if (itemCount <= 0) return;
    setItemCount((prev) => prev - 1);
  };

  const handleAddToCart = (item) => {
    if (itemCount === 0) return;

    const { name, price } = item;
    const newObj = {
      id: new Date(),
      name,
      pricePerQuantity: price,
      quantity: itemCount,
      price: price * itemCount,
    };

    dispatch(addItems(newObj));
    setItemCount(0);
  };

  return (
    <>
      {/* CATEGORÍAS */}
      <div className="grid grid-cols-4 gap-4 px-10 py-4 w-[100%]">
        {menus.map((menu) => {
          return (
            <div
              key={menu.id}
              className="
                flex flex-col items-start justify-between p-4 rounded-lg h-[100px] cursor-pointer 
                text-white dark:text-gray-100
              "
              style={{ backgroundColor: menu.bgColor }}
              onClick={() => {
                setSelected(menu);
                setItemId(0);
                setItemCount(0);
              }}
            >
              <div className="flex items-center justify-between w-full">
                <h1 className="text-lg font-semibold">
                  {menu.icon} {menu.name}
                </h1>

                {selected.id === menu.id && (
                  <GrRadialSelected className="text-white" size={20} />
                )}
              </div>

              <p className="text-sm font-semibold text-gray-200 dark:text-gray-300">
                {menu.items.length} Items
              </p>
            </div>
          );
        })}
      </div>

      {/* DIVISOR - Cambiado a gris claro */}
      <hr className="border-gray-300 dark:border-[#2a2a2a] border-t-2 mt-4" />

      {/* ITEMS */}
      <div className="grid grid-cols-4 gap-4 px-10 py-4 w-[100%]">
        {selected?.items.map((item) => {
          return (
            <div
              key={item.id}
              className="
                flex flex-col items-start justify-between p-4 rounded-lg h-[150px] cursor-pointer 
                bg-gray-200 dark:bg-[#1a1a1a] 
                hover:bg-gray-300 dark:hover:bg-[#2a2a2a]
                transition
              "
            >
              <div className="flex items-start justify-between w-full">
                <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {item.name}
                </h1>

                {/* ADD TO CART */}
                <button
                  onClick={() => handleAddToCart(item)}
                  className="
                    bg-green-200 dark:bg-green-900 
                    text-green-700 dark:text-green-300 
                    p-2 rounded-lg shadow 
                    hover:bg-green-300 dark:hover:bg-green-800
                  "
                >
                  <FaShoppingCart size={20} />
                </button>
              </div>

              <div className="flex items-center justify-between w-full mt-2">
                <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  ${item.price}
                </p>

                {/* CONTADOR */}
                <div
                  className="
                    flex items-center justify-between 
                    bg-gray-300 dark:bg-[#1f1f1f] 
                    px-2 py-3 rounded-lg gap-2 w-[50%]
                  "
                >
                  <button
                    onClick={() => decrement(item.id)}
                    className="text-yellow-600 dark:text-yellow-400 text-2xl"
                  >
                    &minus;
                  </button>

                  <span className="text-gray-900 dark:text-white">
                    {itemId === item.id ? itemCount : "0"}
                  </span>

                  <button
                    onClick={() => increment(item.id)}
                    className="text-yellow-600 dark:text-yellow-400 text-2xl"
                  >
                    &#43;
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default MenuContainer;