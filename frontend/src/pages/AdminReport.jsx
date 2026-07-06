import { useEffect, useMemo, useState } from "react";
import { CalendarDays, FileText, Upload } from "lucide-react";

import AdminLayout from "../components/admin/AdminLayout";
import StatCard from "../components/admin/StatCard";
import StatusBadge from "../components/admin/StatusBadge";
import {
  getReportByBooking,
  replaceReport,
  getAllBookings,
  uploadReport,
} from "../services/adminService";

const AdminReport = () => {
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState("All");

  const [showUploadModal, setShowUploadModal] = useState(false);

  const [selectedBooking, setSelectedBooking] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const data = await getAllBookings();

      setBookings(data.bookings);

      setStats({
        pendingReports: data.bookings.filter((b) => !b.reportUpload).length,
        uploadedToday: data.bookings.filter((b) => b.reportUpload).length,
        totalReports: data.bookings.length,
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const tabs = ["All", "Pending Upload", "Uploaded", "Today", "This Week"];

  const filteredBookings = useMemo(() => {
    if (activeTab === "All") return bookings;

    if (activeTab === "Pending Upload")
      return bookings.filter((b) => !b.reportUpload);

    if (activeTab === "Uploaded") return bookings.filter((b) => b.reportUpload);

    return bookings;
  }, [activeTab, bookings]);

  if (loading) {
    return <AdminLayout>Loading...</AdminLayout>;
  }
  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleAttachFile = async () => {
    if (!selectedFile || !selectedBooking) return;

    try {
      await uploadReport(selectedBooking._id, selectedFile);

      setShowUploadModal(false);

      setSelectedFile(null);

      setSelectedBooking(null);

      fetchReports();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <AdminLayout>
      <div>
        <h1 className="text-3xl font-bold">Reports</h1>

        <p className="text-gray-500 mt-2">Manage uploaded pathology reports.</p>
      </div>

      <div className="grid grid-cols-3 gap-5 mt-8">
        <StatCard
          title="Pending Reports"
          value={stats.pendingReports}
          icon={<FileText size={18} />}
        />

        <StatCard
          title="Uploaded Today"
          value={stats.uploadedToday}
          icon={<Upload size={18} />}
        />

        <StatCard
          title="Total Reports"
          value={stats.totalReports}
          icon={<CalendarDays size={18} />}
        />
      </div>

      <div className="flex gap-8 mt-10 border-b border-gray-100">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-4 text-lg transition

${
  activeTab === tab
    ? "border-b-2 border-blue-500 font-semibold text-black"
    : "text-gray-500"
}

`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="mt-6 bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1250px]">
            <thead className="bg-[#FAFAFA]">
              <tr>
                <th className="px-5 py-4">
                  <input type="checkbox" />
                </th>

                <th className="px-5 py-4 text-left">Patients</th>

                <th className="px-5 py-4 text-left">Tests</th>

                <th className="px-5 py-4 text-left">Technician</th>

                <th className="px-5 py-4 text-left">Upload Date</th>

                <th className="px-5 py-4 text-left">Status</th>

                <th className="px-5 py-4 text-right">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredBookings.map((booking) => (
                <tr
                  key={booking._id}
                  className="border-t border-gray-100 hover:bg-gray-50 transition"
                >
                  <td className="px-5 py-4">
                    <input type="checkbox" />
                  </td>

                  <td className="px-5 py-4">
                    <p className="font-medium">{booking.userId?.name}</p>
                  </td>

                  <td className="px-5 py-4">
                    {booking.tests?.map((t) => t.testName).join(", ")}
                  </td>

                  <td className="px-5 py-4">Kirti Kumar</td>

                  <td className="px-5 py-4">
                    {booking.reportUpload
                      ? new Date(booking.updatedAt).toLocaleDateString("en-GB")
                      : "Not Uploaded"}
                  </td>

                  <td className="px-5 py-4">
                    <StatusBadge
                      status={booking.reportUpload ? "Completed" : "Pending"}
                    />
                  </td>

                  <td className="px-5 py-4 text-right">
                    {booking.reportUpload ? (
                      <div className="flex justify-end gap-3">
                        <button
                          onClick={async () => {
                            const report = await getReportByBooking(
                              booking._id,
                            );

                            window.open(report.reportUrl, "_blank");
                          }}
                          className="text-blue-600"
                        >
                          View PDF
                        </button>

                        <button
                          onClick={() => {
                            setSelectedBooking(booking);

                            setShowUploadModal(true);
                          }}
                          className="text-gray-500"
                        >
                          Replace
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          setSelectedBooking(booking);

                          setShowUploadModal(true);
                        }}
                        className="text-blue-600"
                      >
                        Upload Report
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white rounded-2xl w-[520px] shadow-xl">
            {/* Header */}

            <div className="flex justify-between items-center px-6 py-5 border-b">
              <div>
                <h2 className="text-lg font-semibold">File Upload</h2>

                <p className="text-sm text-gray-500 mt-1">
                  Choose a file and upload securely to proceed.
                </p>
              </div>

              <button
                onClick={() => {
                  setShowUploadModal(false);
                  setSelectedFile(null);
                }}
                className="text-gray-400 hover:text-black text-xl"
              >
                ×
              </button>
            </div>

            {/* Body */}

            <div className="p-6">
              <label className="border-2 border-dashed border-gray-200 rounded-xl h-48 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 transition">
                <FileText size={40} className="text-gray-400" />

                <p className="mt-5 font-medium">Drag and drop your files</p>

                <p className="text-xs text-gray-400 mt-2">
                  JPEG, PNG, PDF and MP4 formats, up to 50MB
                </p>

                <div className="mt-5">
                  <span className="px-5 py-2 rounded-lg border border-gray-200 text-sm">
                    Select File
                  </span>
                </div>

                <input
                  type="file"
                  accept=".pdf,.png,.jpg,.jpeg"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>

              {/* Uploaded File */}

              {selectedFile && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium mb-3">Uploaded Files</h3>

                  <div className="border rounded-xl p-4 flex justify-between items-center">
                    <div>
                      <p className="font-medium text-sm">{selectedFile.name}</p>

                      <p className="text-xs text-gray-400 mt-1">
                        {(selectedFile.size / 1024).toFixed(1)} KB
                      </p>
                    </div>

                    <div className="text-green-500 text-sm">Ready</div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}

            <div className="border-t px-6 py-5 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowUploadModal(false);
                  setSelectedFile(null);
                }}
                className="px-6 py-2 border rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={handleAttachFile}
                className="px-7 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Attach File
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminReport;
