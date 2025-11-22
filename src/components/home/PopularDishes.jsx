import React from "react";
import { popularDishesData } from "../../constants";

const PopularDishes = () => {
  return (
    <div className="mt-6 pr-6">
      <div className="bg-white dark:bg-[#1a1a1a] w-full rounded-lg shadow">
        
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4">
          <h1 className="text-black dark:text-white text-lg font-semibold tracking-wide">
            Platos Populares
          </h1>

          <a
            href="#"
            className="text-blue-600 dark:text-blue-400 text-sm font-semibold"
          >
            Mirar Todos
          </a>
        </div>

        {/* List */}
        <div className="overflow-y-scroll h-[680px] scrollbar-hide pb-4">
          {popularDishesData.map((dish) => {
            return (
              <div
                key={dish.id}
                className="flex items-center gap-4 
                bg-gray-100 dark:bg-[#1f1f1f] 
                rounded-[15px] px-6 py-4 mt-4 mx-6 mb-3 shadow-sm"
              >
                {/* ID */}
                <h1 className="text-black dark:text-white font-bold">
                  {dish.id < 10 ? `0${dish.id}` : dish.id}
                </h1>

                {/* Image */}
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-[50px] h-[50px] rounded-full object-cover"
                />

                {/* Text */}
                <div>
                  <h1 className="text-black dark:text-white font-semibold tracking-wide">
                    {dish.name}
                  </h1>

                  <span className="text-gray-700 dark:text-gray-300 text-sm font-semibold mt-1 block">
                    <span className="text-gray-500 dark:text-gray-400">
                      Órdenes:{" "}
                    </span>
                    {dish.price}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default PopularDishes;
