const StatusBadge = ({ status }) => {
  const colorMap = {
    applied: "bg-blue-500/10 text-blue-400",
    shortlisted: "bg-yellow-500/10 text-yellow-400",
    interview: "bg-purple-500/10 text-purple-400",
    selected: "bg-green-500/10 text-green-400",
    rejected: "bg-red-500/10 text-red-400",
  };

  return (
    <span
      className={`inline-block px-2 py-1 rounded-full text-xs font-medium capitalize ${
        colorMap[status] || "bg-surface-700 text-gray-400"
      }`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
