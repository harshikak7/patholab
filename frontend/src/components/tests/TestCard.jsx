import React from "react";
import { Clock3, House, ChevronRight, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const TestCard = ({ item }) => {
  const navigate = useNavigate();
  const { addToCart, cartItems } = useCart();
  console.log(cartItems);

  return (
    <div className="bg-white rounded-4xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition">
      {/* TOP */}

      <div className="p-6">
        {/* TITLE */}

        <h2 className="text-3xl leading-[1.1] font-bold text-[#1677FF]">
          {item.testName}
        </h2>

        {/* DESC */}
{/* 
        <p className="text-[#8A8A8A] text-[15px] leading-[1.6] mt-4">
          {item.description}
        </p> */}

        {/* INFO */}

        <div className="mt-5 space-y-3">
          <div className="flex items-center gap-3 text-[#7B7B7B]">
            <Clock3 size={20} />

            <span className="text-[15px]">Reports in {item.reportTime}</span>
          </div>

          <div className="flex items-center gap-3 text-[#7B7B7B]">
            <House size={20} />

            <span className="text-[15px]">Home Collection</span>
          </div>
        </div>

        {/* FASTING */}

        <div className="mt-2">
          <span className="text-[#FF3B30] text-[15px] font-medium">
            Fasting:
          </span>

          <span
            className={`ml-1 text-[15px] font-medium ${
              item.preparationRequired ? "text-[#FF3B30]" : "text-[#22C55E]"
            }`}
          >
            {item.preparationRequired ? "Required" : "Not Required"}
          </span>
        </div>

        {/* PRICE */}

        <div className="mt-4 flex items-center gap-5">
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold leading-none">
              ₹{item.price}
            </span>

            <span className="text-[#9A9A9A] line-through text-[22px]">
              ₹600
            </span>
          </div>

          <div className="bg-[#B9F3C3] px-5 py-2 rounded-full flex items-center gap-2">
            <Check size={18} />

            <span className="text-[15px] font-medium">Lab Visit</span>
          </div>
        </div>
      </div>

      {/* FOOTER */}

      <div className="border-t border-gray-200 px-5 py-5 flex items-center justify-between">
        <button
          onClick={() => navigate(`/booking/${item._id}`)}
          className="bg-[#2F80FF] hover:bg-[#166CFF] text-white text-[17px] font-medium px-12 py-4 rounded-full transition"
        >
          Book Now
        </button>

        <button
          onClick={() => addToCart(item)}
          className="flex items-center gap-2 text-[#3B82F6] text-[17px] font-medium"
        >
          Add to cart
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default TestCard;
