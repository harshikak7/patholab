import { Search, Bell } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/logo.svg";

const AdminNavbar = () => {
  const { user } = useAuth();

  return (
    <header className="h-18 bg-white border-b border-gray-100 px-7  flex items-center justify-between sticky top-0 z-50">
      {/* Left - Logo */}
      <div className="flex items-center">
        <img src={logo} alt="PathoLab" className="h-10 object-contain" />
      </div>

      {/* Right */}
      <div className="flex items-center gap-6">
        {/* Search */}
        <div className="relative w-[360px]">
          <Search
            size={18}
            className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search patient, booking ID..."
            className="w-full h-11 rounded-full border border-gray-200 bg-white pl-12 pr-4 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Notification */}
        <button className="relative flex items-center justify-center w-11 h-11 rounded-full border border-gray-200 hover:bg-gray-50 transition">
          <Bell size={20} className="text-gray-600" />

          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-blue-500 text-white text-[10px] flex items-center justify-center font-medium">
            3
          </span>
        </button>

        {/* Avatar */}
        <div className="w-11 h-11 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold text-base">
          {user?.name?.charAt(0).toUpperCase() || "A"}
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;
