import React from "react";

const DarkModeCards = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF9F0] p-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full">
        {[1, 2].map((_, index) => (
          <div
            key={index}
            className="bg-[#081F5C] p-8 rounded-3xl shadow-lg text-white flex flex-col items-center text-center  transition-transform transform hover:scale-105"
       
            
          >
            <h1 className="text-3xl   mb-3">
              Hatdog
            </h1>
            <h2 className="text-2xl font-semibold mb-2 text-[#08519C]">
              Modern Dark Mode Card
            </h2>
            <p className="text-gray-300 mb-6 text-lg leading-relaxed">
              A clean, minimalistic card with a responsive layout.
            </p>
            <button className="bg-[#08519C] text-white px-6 py-3 rounded-xl hover:bg-[#08519C] transition-all duration-300">
              Click Me
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DarkModeCards;
