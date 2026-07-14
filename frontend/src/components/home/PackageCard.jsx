import React from "react";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PackageCard = ({ item }) => {
   const navigate = useNavigate();
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
          alt={item.testName}
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
          {item.testName}
        </h3>

        <span className="text-[#17B978] text-[22px] font-semibold">
          ₹{item.price}
        </span>
      </div>

      {/* Features */}
    <div className="mt-6 space-y-3">
  <div className="flex items-center gap-2 text-[#555]">
    <Check size={18} className="text-[#17B978]" />
    <span>{item.category}</span>
  </div>

  <div className="flex items-center gap-2 text-[#555]">
    <Check size={18} className="text-[#17B978]" />
    <span>
      {item.preparationRequired
        ? "Preparation Required"
        : "No Preparation Required"}
    </span>
  </div>

  <div className="flex items-center gap-2 text-[#555]">
    <Check size={18} className="text-[#17B978]" />
    <span>Reports in {item.reportTime}</span>
  </div>
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
          onClick={() => navigate(`/booking/${item._id}`)}
          className="bg-[#2F80FF] hover:bg-[#166CFF] text-white text-[17px] font-medium px-12 py-4 rounded-full transition"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default PackageCard;
