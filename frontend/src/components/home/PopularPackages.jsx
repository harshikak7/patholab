import React, { useEffect, useState } from "react";
import PackageCard from "./PackageCard";
import { getTests } from "../../services/testService";

import body from "../../assets/body.png";
import women from "../../assets/women.png";
import fitness from "../../assets/fitness.png";

const PopularPackages = () => {
  const [tests, setTests] = useState([]);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const data = await getTests();

        // Add icons to first 3 tests
        const icons = [body, women, fitness];

        const updatedTests = data.slice(0, 3).map((test, index) => ({
          ...test,
          icon: icons[index] || body,
        }));

        setTests(updatedTests);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTests();
  }, []);

  return (
    <section className="bg-white py-2">
      <div className="max-w-350 mx-auto px-6">
        <h2 className="text-center text-[32px] md:text-[42px] font-bold">
          Popular Test Packages
        </h2>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tests.map((item) => (
            <PackageCard key={item._id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularPackages;