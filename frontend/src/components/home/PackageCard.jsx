import React from "react";
import { Check } from "lucide-react";

const PackageCard = ({ item }) => {
  return (
    <div
      className="
      bg-white
      rounded-[28px]
      p-8
      shadow-sm
      hover:shadow-lg
      transition
      "
    >
      {/* Top */}
      <div className="flex justify-between items-start">
        <img
          src={item.icon}
          alt={item.title}
          className="w-18 h-18 object-contain"
        />

        {item.recommended && (
          <span
            className="
            bg-[#F8EA75]
            px-4
            py-2
            rounded-xl
            text-sm
            font-medium
            "
          >
            Recommended
          </span>
        )}
      </div>

      {/* Title + Price */}
      <div className="mt-5 flex justify-between items-center gap-4">
        <h3 className="text-[28px] font-semibold leading-tight">
          {item.title}
        </h3>

        <span className="text-[#17B978] text-[22px] font-semibold">
          ₹{item.price}
        </span>
      </div>

      {/* Features */}
      <div className="mt-6 space-y-3">
        {item.features.map((feature) => (
          <div key={feature} className="flex items-center gap-2 text-[#555]">
            <Check size={18} className="text-[#17B978]" />

            <span>{feature}</span>
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex gap-3 mt-8">
        <button
          className="
          flex-1
          border
          border-blue-600
          text-blue-600
          rounded-full
          py-3
          hover:bg-blue-50
          "
        >
          View Details
        </button>

        <button
          onClick={() => navigate(`/booking/${item.id}`)}
          className="
          flex-1
          bg-blue-600
          text-white
          rounded-full
          py-3
          hover:bg-blue-700
          "
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default PackageCard;
