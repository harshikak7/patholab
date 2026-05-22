import React from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const reviews = [
  {
    review:
      "Booking a test was super easy, and I got my reports the same day.",
    name: "Ananya S.",
    date: "3 June 2025",
    city: "Mumbai",
  },

  {
    review:
      "Booking a test was super easy, and I got my reports the same day.",
    name: "Duan Jansen",
    date: "3 June 2025",
    city: "Pune",
  },

  {
    review:
      "Booking a test was super easy, and I got my reports the same day.",
    name: "Rohit Sharma",
    date: "13 June 2025",
    city: "Mumbai",
  },
];

const Testimonials = () => {
  return (
    <section className="bg-[#F7F7F7] py-14">
      <div className="max-w-350 mx-auto px-6">

        <h2 className="text-center text-[34px] md:text-[54px] font-bold ">
          What patients say about Patholab Services.
        </h2>

        <div className="mt-16 flex items-center gap-6">

          <button className="hidden lg:flex w-14 h-14 rounded-full bg-[#ECECEC] items-center justify-center">
            <ChevronLeft />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 flex-1">

            {reviews.map((item) => (
              <div
                key={item.name}
                className="bg-white rounded-[30px] p-8 shadow-sm"
              >

                <div className="flex gap-1">

                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      fill="#FF9D00"
                      className="text-[#FF9D00]"
                    />
                  ))}

                </div>

                <p className="mt-8 text-[18px] text-[#333] leading-relaxed">
                  {item.review}
                </p>

                <button className="mt-5 text-[#00A67E]">
                  Read More
                </button>

                <div className="mt-4 border-t pt-5">

                  <h4 className="font-medium">
                    {item.name}
                  </h4>

                  <p className="text-sm text-[#888] mt-1">
                    {item.date} · {item.city}
                  </p>

                </div>

              </div>
            ))}

          </div>

          <button className="hidden lg:flex w-14 h-14 rounded-full bg-[#ECECEC] items-center justify-center">
            <ChevronRight />
          </button>

        </div>

      </div>
    </section>
  );
};

export default Testimonials;