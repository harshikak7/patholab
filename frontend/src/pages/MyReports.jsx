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
        <h1 className="text-5xl font-bold">Reports</h1>

        <p className="text-gray-500 mt-3">Access all your medical reports.</p>
        <div className="mt-10">
          <div className="mt-10 grid gap-6">
            {reports.map((report) => (
              <div
                key={report._id}
                className="bg-white rounded-2xl p-6 shadow-sm border"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold">
                      {report.bookingId.tests.map((t) => t.testName).join(", ")}
                    </h2>

                    <p className="text-gray-500 mt-2">
                      Appointment:{" "}
                      {new Date(
                        report.bookingId.appointmentDate,
                      ).toLocaleDateString("en-GB")}
                    </p>

                    <p className="text-gray-500">
                      Time: {report.bookingId.timeSlot}
                    </p>
                  </div>

                  <button
                    onClick={() => window.open(report.reportUrl, "_blank")}
                    className="bg-blue-600 text-white px-5 py-2 rounded-lg"
                  >
                    View PDF
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyReports;
