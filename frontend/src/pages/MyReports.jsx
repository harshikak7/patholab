import React, { useEffect, useState } from "react";
import Navbar from "../components/home/Navbar";
import { getMyReports } from "../services/reportService";

const MyReports = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
       const data = await getMyReports();

console.log(data);

setReports(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchReports();
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F8FC]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10">

        <h1 className="text-5xl font-bold">
          Reports
        </h1>

        <p className="text-gray-500 mt-3">
          Access all your medical reports.
        </p>
    <div className="mt-10">
  <pre>
    {JSON.stringify(reports, null, 2)}
  </pre>
</div>
      </div>
    </div>
  );
};

export default MyReports;