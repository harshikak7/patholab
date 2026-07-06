const StatCard = ({ title, value, icon }) => {
  return (
    <div className="bg-white border border-gray-100 rounded-xl px-5 py-4 hover:shadow-sm transition-all duration-200">
      <div className="flex items-start gap-4">
        {/* Icon */}

        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0">
          {icon}
        </div>

        {/* Content */}

        <div>
          <h3 className="text-[30px] font-bold text-gray-900 leading-none">
            {value}
          </h3>

          <p className="text-[15px] text-gray-500 mt-3">{title}</p>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
