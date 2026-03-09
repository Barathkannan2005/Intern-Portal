import { useEffect, useState } from "react";
import { getApplications } from "../../services/studentService";
import StatusBadge from "../../components/StatusBadge";
import {
  FiMapPin,
  FiGlobe,
  FiBriefcase,
  FiChevronDown,
  FiChevronUp,
  FiClock,
  FiDollarSign,
} from "react-icons/fi";
import toast from "react-hot-toast";

const ApplicationStatus = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await getApplications();
        setApplications(data.applications);
      } catch {
        toast.error("Failed to load applications");
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

  return (
    <div>
      <h2 className="text-xl font-bold mb-6 text-white">My Applications</h2>

      {applications.length === 0 ? (
        <div className="bg-surface-800 rounded-xl border border-surface-600 p-8">
          <p className="text-gray-500 text-center">No applications yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => {
            const intern = app.internshipId;
            const company = intern?.companyId;
            const isExpanded = expandedId === app._id;

            return (
              <div
                key={app._id}
                className="bg-surface-800 rounded-xl shadow-sm border border-surface-600 overflow-hidden"
              >
                {/* Summary bar */}
                <div
                  className="p-5 flex flex-col md:flex-row md:items-center gap-4 cursor-pointer hover:bg-surface-700/50 transition"
                  onClick={() =>
                    setExpandedId(isExpanded ? null : app._id)
                  }
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-white">
                      {intern?.role}
                    </p>
                    <p className="text-sm text-gray-400">
                      {company?.companyName}
                      {company?.industry && (
                        <span className="text-gray-600">
                          {" "}· {company.industry}
                        </span>
                      )}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs text-gray-500">
                      {new Date(app.appliedDate).toLocaleDateString()}
                    </span>
                    <StatusBadge status={app.status} />
                    {isExpanded ? (
                      <FiChevronUp className="text-gray-400" size={18} />
                    ) : (
                      <FiChevronDown className="text-gray-400" size={18} />
                    )}
                  </div>
                </div>

                {/* Expanded details */}
                {isExpanded && (
                  <div className="border-t border-surface-600 p-5 bg-surface-700/30">
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Company info */}
                      <div>
                        <h4 className="text-sm font-semibold text-white flex items-center gap-2 mb-3">
                          <FiBriefcase
                            size={14}
                            className="text-primary-400"
                          />
                          Company Information
                        </h4>
                        <div className="bg-surface-700 rounded-lg p-4 border border-surface-600 space-y-2">
                          <p className="text-base font-medium text-white">
                            {company?.companyName}
                          </p>
                          {company?.industry && (
                            <p className="text-sm text-gray-400">
                              Industry: {company.industry}
                            </p>
                          )}
                          {company?.location && (
                            <p className="text-sm text-gray-400 flex items-center gap-1">
                              <FiMapPin size={12} />
                              {company.location}
                            </p>
                          )}
                          {company?.description && (
                            <p className="text-sm text-gray-400 mt-1">
                              {company.description}
                            </p>
                          )}
                          {company?.website && (
                            <a
                              href={company.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-sm text-primary-400 hover:text-primary-300 transition"
                            >
                              <FiGlobe size={12} />
                              {company.website}
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Internship info */}
                      <div>
                        <h4 className="text-sm font-semibold text-white mb-3">
                          Internship Details
                        </h4>
                        <div className="space-y-3">
                          <p className="text-sm text-gray-400 whitespace-pre-line line-clamp-4">
                            {intern?.description}
                          </p>
                          <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                            {intern?.location && (
                              <span className="flex items-center gap-1 bg-surface-700 px-2 py-1 rounded">
                                <FiMapPin size={12} /> {intern.location}
                              </span>
                            )}
                            {intern?.duration && (
                              <span className="flex items-center gap-1 bg-surface-700 px-2 py-1 rounded">
                                <FiClock size={12} /> {intern.duration}
                              </span>
                            )}
                            {intern?.stipend > 0 && (
                              <span className="flex items-center gap-1 bg-surface-700 px-2 py-1 rounded">
                                <FiDollarSign size={12} /> ₹{intern.stipend}/mo
                              </span>
                            )}
                          </div>
                          {intern?.requiredSkills?.length > 0 && (
                            <div className="flex flex-wrap gap-1.5">
                              {intern.requiredSkills.map((skill) => (
                                <span
                                  key={skill}
                                  className="bg-primary-500/10 text-primary-400 text-xs px-2 py-0.5 rounded-full"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ApplicationStatus;