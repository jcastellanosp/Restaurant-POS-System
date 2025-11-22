import React from "react";

const MiniCard = ({ title, icon, number, footerNum }) => {
  return (
    <div className="bg-white dark:bg-[#1a1a1a] py-5 px-5 rounded-lg w-[50%]
                    text-black dark:text-white shadow">
      
      <div className="flex items-start justify-between">
        <h1 className="text-lg font-semibold tracking-wide">
          {title}
        </h1>

        <button
          className={`${
            title === "Total Earnings" ? "bg-green-500" : "bg-yellow-500"
          } p-3 rounded-lg text-white text-2xl`}
        >
          {icon}
        </button>
      </div>

      <div>
        <h1 className="text-4xl font-bold mt-5">
          {title === "Total Earnings" ? `$${number}` : number}
        </h1>

        <h1 className="text-lg mt-2">
          <span className="text-green-500">{footerNum}%</span> Que Ayer
        </h1>
      </div>
    </div>
  );
};

export default MiniCard;
