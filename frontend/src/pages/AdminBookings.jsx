import { useEffect, useMemo, useState } from "react";
import { CalendarDays, ClipboardList, FileText } from "lucide-react";

import AdminLayout from "../components/admin/AdminLayout";
import StatCard from "../components/admin/StatCard";
import {
  getAllBookings,
  getTechnicians,
  assignTechnician,
} from "../services/adminService";
import StatusBadge from "../components/admin/StatusBadge";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState("All");
  const [technicians, setTechnicians] = useState([]);

  const [showAssignModal, setShowAssignModal] = useState(false);

  const [selectedBooking, setSelectedBooking] = useState(null);

  const [selectedTechnician, setSelectedTechnician] = useState("");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const data = await getAllBookings();

      setBookings(data.bookings);

      setStats(data.stats);
      const techs = await getTechnicians();

      setTechnicians(techs);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    "All",
    "Today",
    "Tomorrow",
    "Pending",
    "Assigned",
    "Collected",
    "Completed",
  ];

  const filteredBookings = useMemo(() => {
    if (activeTab === "All") return bookings;

    if (activeTab === "Pending") {
      return bookings.filter((booking) => booking.status === "Pending");
    }

    if (activeTab === "Assigned") {
      return bookings.filter((booking) => booking.status === "Assigned");
    }

    if (activeTab === "Collected") {
      return bookings.filter((booking) => booking.status === "Collected");
    }

    if (activeTab === "Completed") {
      return bookings.filter((booking) => booking.status === "Completed");
    }

    if (activeTab === "Today") {
      return bookings.filter(
        (booking) =>
          new Date(booking.appointmentDate).toDateString() ===
          new Date().toDateString(),
      );
    }

    if (activeTab === "Tomorrow") {
      const tomorrow = new Date();

      tomorrow.setDate(tomorrow.getDate() + 1);

      return bookings.filter(
        (booking) =>
          new Date(booking.appointmentDate).toDateString() ===
          tomorrow.toDateString(),
      );
    }

    return bookings;
  }, [activeTab, bookings]);

  if (loading) {
    return (
      <AdminLayout>
        <p>Loading...</p>
      </AdminLayout>
    );
  }

  const handleAssignTechnician = async () => {
  if (!selectedTechnician) return;

  try {
    await assignTechnician(
      selectedBooking._id,
      selectedTechnician
    );

    setShowAssignModal(false);

    setSelectedBooking(null);

    setSelectedTechnician("");

    fetchBookings();
  } catch (err) {
    console.log(err);
  }
};
  return (
    <AdminLayout>
      {/* Heading */}

      <div>
        <h1 className="text-3xl font-bold">Bookings</h1>

        <p className="text-gray-500 mt-1">
          Manage bookings, reports, technicians and tests.
        </p>
      </div>

      {/* Cards */}

      <div className="grid grid-cols-3 gap-5 mt-8">
        <StatCard
          title="Today's Bookings"
          value={stats.todayBookings || 0}
          icon={<CalendarDays size={18} />}
        />

        <StatCard
          title="Pending Assignment"
          value={stats.pendingAssignments || 0}
          icon={<ClipboardList size={18} />}
        />

        <StatCard
          title="Pending Reports"
          value={stats.pendingReports || 0}
          icon={<FileText size={18} />}
        />
      </div>

      {/* Tabs */}

      <div className="flex gap-8 mt-6 border-b border-gray-100">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-4 text-lg transition-all ${
              activeTab === tab
                ? "border-b-2 border-blue-500 font-semibold text-black"
                : "text-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* TABLE COMES HERE */}
      <div className="mt-6 bg-white rounded-xl border border-gray-100 overflow-hidden">
        {/* Scrollable Table */}

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1200px]">
            {/* Header */}

            <thead className="bg-[#FAFAFA]">
              <tr className="text-left text-[16px] text-gray-500">
                <th className="px-5 py-4 w-10">
                  <input type="checkbox" />
                </th>

                <th className="px-5 py-4">Patient</th>

                <th className="px-5 py-4">Tests</th>

                <th className="px-5 py-4">Collection Date</th>

                <th className="px-5 py-4">Time</th>

                <th className="px-5 py-4">Status</th>

                <th className="px-5 py-4">Technician</th>

                <th className="px-5 py-4 text-right">Action</th>
              </tr>
            </thead>

            {/* BODY */}

            <tbody>
              {filteredBookings.map((booking) => (
                <tr
                  key={booking._id}
                  className="border-t border-gray-100 hover:bg-gray-50 transition"
                >
                  {/* Checkbox */}

                  <td className="px-5 py-4">
                    <input type="checkbox" />
                  </td>

                  {/* Patient */}

                  <td className="px-5 py-4">
                    <div>
                      <p className="font-medium text-[15px]">
                        {booking.userId?.name}
                      </p>

                      <p className="text-xs text-gray-400 mt-1">
                        {booking.userId?.email}
                      </p>
                    </div>
                  </td>

                  {/* Tests */}

                  <td className="px-5 py-4 max-w-[240px]">
                    <p
                      className="truncate text-[14px]"
                      title={booking.tests?.map((t) => t.testName).join(", ")}
                    >
                      {booking.tests?.map((t) => t.testName).join(", ")}
                    </p>
                  </td>

                  {/* Date */}

                  <td className="px-5 py-4 text-[14px]">
                    {new Date(booking.appointmentDate).toLocaleDateString(
                      "en-GB",
                    )}
                  </td>

                  {/* Time */}

                  <td className="px-5 py-4 text-[14px]">{booking.timeSlot}</td>

                  {/* Status */}

                  <td className="px-5 py-4">
                    <StatusBadge status={booking.status} />
                  </td>

                  {/* Technician */}

                  <td className="px-5 py-4 text-[14px]">
                    {booking.technicianId ? (
                      <div>
                        <p className="font-medium">
                          {booking.technicianId.name}
                        </p>

                        <p className="text-xs text-gray-400">
                          {booking.technicianId.phone}
                        </p>
                      </div>
                    ) : (
                      <span className="text-gray-400">Unassigned</span>
                    )}
                  </td>

                  {/* Action */}

                  <td className="px-5 py-4 text-right">
                    <button
                      onClick={() => {
                        setSelectedBooking(booking);

                        setSelectedTechnician(booking.technicianId?._id || "");

                        setShowAssignModal(true);
                      }}
                      className="text-blue-600 text-sm font-medium"
                    >
                      {booking.technicianId ? "Reassign" : "Assign"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Footer */}

          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-white">
            <p className="text-sm text-gray-500">
              Showing{" "}
              <span className="font-semibold">{filteredBookings.length}</span>{" "}
              of <span className="font-semibold">{bookings.length}</span>{" "}
              bookings
            </p>

            <div className="flex items-center gap-2">
              <button className="w-9 h-9 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50">
                &lt;
              </button>

              <button className="w-9 h-9 rounded-lg bg-blue-600 text-white">
                1
              </button>

              <button className="w-9 h-9 rounded-lg border border-gray-200 hover:bg-gray-50">
                2
              </button>

              <button className="w-9 h-9 rounded-lg border border-gray-200 hover:bg-gray-50">
                3
              </button>

              <button className="w-9 h-9 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50">
                &gt;
              </button>
            </div>
          </div>
        </div>
      </div>

      {showAssignModal && (
  <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="bg-white rounded-2xl w-[500px] shadow-xl">

      {/* Header */}

      <div className="px-6 py-5 border-b">
        <h2 className="text-xl font-semibold">
          Assign Technician
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Select a technician for sample collection.
        </p>
      </div>

      {/* Body */}

      <div className="p-6">

        <div className="mb-6">

          <label className="block text-sm font-medium mb-2">
            Patient
          </label>

          <div className="rounded-xl border px-4 py-3 bg-gray-50">
            {selectedBooking?.userId?.name}
          </div>

        </div>

        <div className="mb-6">

          <label className="block text-sm font-medium mb-2">
            Technician
          </label>

          <select
            value={selectedTechnician}
            onChange={(e) =>
              setSelectedTechnician(e.target.value)
            }
            className="w-full border rounded-xl px-4 py-3"
          >
            <option value="">
              Select Technician
            </option>

            {technicians.map((tech) => (
              <option
                key={tech._id}
                value={tech._id}
              >
                {tech.name}
              </option>
            ))}

          </select>

        </div>

      </div>

      {/* Footer */}

      <div className="border-t px-6 py-5 flex justify-end gap-3">

        <button
          onClick={() => {
            setShowAssignModal(false);

            setSelectedBooking(null);

            setSelectedTechnician("");
          }}
          className="px-6 py-2 rounded-lg border"
        >
          Cancel
        </button>

        <button
          onClick={handleAssignTechnician}
          className="px-6 py-2 rounded-lg bg-blue-600 text-white"
        >
          Assign
        </button>

      </div>

    </div>
  </div>
)}
    </AdminLayout>
  );
};

export default AdminBookings;
