import React, { useEffect, useRef } from "react";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { FaNotesMedical } from "react-icons/fa";
import { removeItem } from "../../redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const CartInfo = () => {
  const cartData = useSelector((state) => state.cart);
  const scrolLRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    if (scrolLRef.current) {
      scrolLRef.current.scrollTo({
        top: scrolLRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [cartData]);

  const handleRemove = (itemId) => {
    dispatch(removeItem(itemId));
  };

  return (
    <div className="px-4 py-2">
      <h1 className="text-lg font-semibold tracking-wide text-gray-900 dark:text-gray-200">
        Detalles de la Orden
      </h1>

      <div
        className="mt-4 overflow-y-scroll scrollbar-hide h-[380px]"
        ref={scrolLRef}
      >
        {cartData.length === 0 ? (
          <span className="text-gray-500 dark:text-gray-400 text-sm flex justify-center items-center h-[380px]">
            La lista está vacía. Debe añadir elementos!
          </span>
        ) : (
          cartData.map((item) => (
            <div
              key={item.id}
              className="bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-4 mb-2 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <h1 className="font-semibold tracking-wide text-gray-700 dark:text-gray-300 text-md">
                  {item.name}
                </h1>
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  x{item.quantity}
                </span>
              </div>

              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-3">
                  <RiDeleteBin2Fill
                    onClick={() => handleRemove(item.id)}
                    className="text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 cursor-pointer"
                    size={20}
                  />
                  <FaNotesMedical
                    className="text-gray-600 dark:text-gray-400 cursor-pointer hover:text-blue-500 dark:hover:text-blue-400"
                    size={20}
                  />
                </div>

                <span className="text-md font-bold text-gray-900 dark:text-gray-100">
                  ${item.price}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CartInfo;
