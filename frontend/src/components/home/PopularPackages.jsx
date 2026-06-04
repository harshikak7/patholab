import React from "react";
import PackageCard from "./PackageCard";

import body from "../../assets/body.png";
import women from "../../assets/women.png";
import fitness from "../../assets/fitness.png";

const packages = [
  {
    title: "Full Body Checkup",
    price: "1400",
    recommended: true,
    icon: body,

    features: [
      "70 Tests included",
      "Reports within 24 hours",
      "Free Home Sample Collection",
    ],
  },

  {
    title: "Women Health Kit",
    price: "500",
    recommended: true,
    icon: women,

    features: [
      "50+ Tests included",
      "Reports within 24 hours",
      "Free Home Sample Collection",
    ],
  },

  {
    title: "Fitness Checkup",
    price: "800",
    recommended: true,
    icon: fitness,

    features: [
      "50+ Tests included",
      "Reports within 24 hours",
      "Free Home Sample Collection",
    ],
  },
];

const PopularPackages = () => {
  return (
    <section className="bg-white py-2">

      <div className="max-w-350 mx-auto px-6">

        {/* Heading */}
        <h2
          className="
          text-center
          text-[32px]
          md:text-[42px]
          font-bold
          "
        >
          Popular Test Packages
        </h2>

        {/* Cards */}
        <div
          className="
          mt-10
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-3
          gap-8
          "
        >
          {packages.map((item) => (
            <PackageCard
              key={item.title}
              item={item}
            />
          ))}
        </div>

      </div>

    </section>
  );
};

export default PopularPackages;