import React from "react";
import innovation from "../../assets/innovation.png";
import accuracy from "../../assets/accuracy.png";
import accessibility from "../../assets/accessibility.png";

const WhyPatholab = () => {
  const features = [
    {
      image: innovation,
      title: "Innovation",
      description:
        "We leverage the latest technology to provide cutting-edge diagnostic solutions.",
    },
    {
      image: accuracy,
      title: "Accuracy",
      description:
        "Our tests are highly accurate, ensuring reliable results for better patient care.",
    },
    {
      image: accessibility,
      title: "Accessibility",
      description:
        "We strive to make quality diagnostics accessible to everyone, everywhere.",
    },
  ];
  return (
    <section className="bg-[#f7f7f7] py-20">
      <div className="max-w-350 mx-auto px-6">
        <h2 className="text-center text-[35px] font-bold md:text-[42px]">
          Why PathoLab
        </h2>

        {/* Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-[34px] p-10 shadow-sm hover:shadow-lg transition"
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-22.5 h-22.5 object-contain"
              />

              {/* Title */}
              <h3 className="mt-10 text-[28px] font-semibold">{item.title}</h3>

              {/* Description */}
              <p className="mt-3 text-gray-600 text-[18px] leading-relaxed">
                {item.description}
              </p>

              {/* Learn More */}
              <button className="mt-8 text-[#3B82F6] font-medium hover:translate-x-1 transition">
                Learn More →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyPatholab;
