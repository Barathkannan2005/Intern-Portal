const StatCard = ({ title, value, icon: Icon, color = "primary" }) => {
  const colorClasses = {
    primary: "bg-primary-500/10 text-primary-400",
    green: "bg-green-500/10 text-green-400",
    yellow: "bg-yellow-500/10 text-yellow-400",
    red: "bg-red-500/10 text-red-400",
    purple: "bg-purple-500/10 text-purple-400",
  };

  return (
    <div className="bg-surface-800 rounded-xl shadow-sm border border-surface-600 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-bold mt-1 text-white">{value}</p>
        </div>
        {Icon && (
          <div className={`p-3 rounded-full ${colorClasses[color]}`}>
            <Icon size={24} />
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
