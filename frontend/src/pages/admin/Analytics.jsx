import { useEffect, useState } from "react";
import { getAnalytics } from "../../services/adminService";
import StatCard from "../../components/StatCard";
import {
  FiUsers,
  FiBriefcase,
  FiFileText,
  FiCheckCircle,
  FiTrendingUp,
  FiAward,
} from "react-icons/fi";
import toast from "react-hot-toast";

const Analytics = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getAnalytics();
        setData(res.data);
      } catch {
        toast.error("Failed to load analytics");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  if (loading) {
    return (
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-400 mx-auto mt-12"></div>
    );
  }

  if (!data) return null;

  return (
    <div>
      <h2 className="text-xl font-bold mb-6 text-white">
        Analytics Dashboard
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <StatCard
          title="Total Students"
          value={data.totalStudents}
          icon={FiUsers}
          color="primary"
        />
        <StatCard
          title="Total Companies"
          value={data.totalCompanies}
          icon={FiBriefcase}
          color="green"
        />
        <StatCard
          title="Total Internships"
          value={data.totalInternships}
          icon={FiFileText}
          color="purple"
        />
        <StatCard
          title="Total Applications"
          value={data.totalApplications}
          icon={FiTrendingUp}
          color="yellow"
        />
        <StatCard
          title="Verified Internships"
          value={data.verifiedInternships}
          icon={FiCheckCircle}
          color="green"
        />
        <StatCard
          title="Approved Reports"
          value={data.approvedReports}
          icon={FiAward}
          color="primary"
        />
      </div>

      <div className="bg-surface-800 rounded-xl shadow-sm border border-surface-600 p-6 mb-6">
        <h3 className="font-semibold mb-4 text-white">
          Application Status Distribution
        </h3>
        <div className="grid sm:grid-cols-3 md:grid-cols-5 gap-3">
          {data.statusDistribution.map((item) => (
            <div
              key={item._id}
              className="bg-surface-700 border border-surface-600 rounded-lg p-4 text-center"
            >
              <p className="text-2xl font-bold text-primary-400">
                {item.count}
              </p>
              <p className="text-sm text-gray-500 capitalize">{item._id}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-surface-800 rounded-xl shadow-lg border border-surface-600 p-6">
        <h3 className="font-semibold mb-2 text-white">
          Recent Activity (Last 30 Days)
        </h3>
        <p className="text-3xl font-bold text-primary-400">
          {data.recentApplications}
        </p>
        <p className="text-sm text-gray-400">new applications</p>
      </div>
    </div>
  );
};

export default Analytics;