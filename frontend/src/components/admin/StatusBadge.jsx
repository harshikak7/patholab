const StatusBadge = ({ status }) => {
  const styles = {
    Pending: "bg-yellow-100 text-yellow-700",
    Assigned: "bg-blue-100 text-blue-700",
    Collected: "bg-purple-100 text-purple-700",
    Completed: "bg-green-100 text-green-700",
  };

  return (
    <span
      className={`inline-flex items-center justify-center min-w-[95px] px-3 py-1 rounded-full text-xs font-medium ${
        styles[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;