import React, { useEffect, useState } from "react";

import Navbar from "../components/home/Navbar";

import Footer from "../components/home/Footer";

import TestCard from "../components/tests/TestCard";

import { Search } from "lucide-react";
import { getTests } from "../services/testService";

const BookTest = () => {
  const [tests, setTests] = useState([]);

  const [filteredTests, setFilteredTests] = useState([]);

  const [search, setSearch] = useState("");

  // FETCH TESTS

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const data = await getTests();

        setTests(data);

        setFilteredTests(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTests();
  }, []);

  // SEARCH

  useEffect(() => {
    const filtered = tests.filter((item) =>
      item.testName.toLowerCase().includes(search.toLowerCase()),
    );

    setFilteredTests(filtered);
  }, [search, tests]);

  return (
    
    <section className="bg-[#F7F7F7] min-h-screen">
      <Navbar />

      {/* HERO */}

      <div className="max-w-350 mx-auto px-6 pt-10">
     <div className="relative rounded-[24px] md:rounded-[36px] overflow-hidden h-[260px] sm:h-[340px] md:h-[420px] lg:h-[340px]">
  <img
    src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1600&auto=format&fit=crop"
    alt="banner"
    className="w-full h-full object-cover"
  />

  <div className="absolute inset-0 bg-black/30" />

  <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-10 md:px-14">
    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-xs sm:max-w-md md:max-w-2xl">
      Book Lab Tests From Home
    </h1>

    <p className="text-white/90 mt-3 md:mt-5 text-sm sm:text-base md:text-lg max-w-xs sm:max-w-md md:max-w-xl">
      Accurate reports, certified labs, and hassle-free home sample
      collection.
    </p>
  </div>
</div>
      </div>

      {/* SEARCH */}

      <div className="max-w-350 mx-auto px-6 mt-8">
        <div className="bg-white rounded-2xl px-6 py-5 flex items-center gap-4 border border-gray-100">
          <Search size={20} className="text-gray-400" />

          <input
            type="text"
            placeholder="Search tests..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full outline-none"
          />
        </div>
      </div>

      {/* TITLE */}

      <div className="max-w-350 mx-auto px-6 mt-8">
        <h2 className="text-5xl font-bold">All Tests</h2>

        <p className="text-gray-500 mt-3">
          Browse health checkups and diagnostic tests.
        </p>
      </div>

      {/* GRID */}

      <div className="max-w-350 mx-auto px-6 py-8 grid sm:grid-cols-2 xl:grid-cols-3 gap-8">
        {filteredTests.map((item) => (
          <TestCard key={item._id} item={item} />
        ))}
      </div>

      <Footer />
    </section>
  );
};

export default BookTest;
