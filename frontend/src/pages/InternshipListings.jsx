import { useEffect, useState } from "react";
import {
  FiMapPin,
  FiClock,
  FiDollarSign,
  FiGlobe,
  FiBriefcase,
  FiX,
  FiChevronRight,
} from "react-icons/fi";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";
import { applyForInternship } from "../services/studentService";
import toast from "react-hot-toast";

const InternshipListings = () => {
  const { user } = useAuth();
  const [internships, setInternships] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectedIntern, setSelectedIntern] = useState(null);

  const fetchInternships = async () => {
    setLoading(true);
    try {
      const params = { page, limit: 9 };
      if (search) params.search = search;
      const { data } = await API.get("/internships", { params });
      setInternships(data.internships);
      setPagination(data.pagination);
    } catch {
      toast.error("Failed to load internships");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInternships();
  }, [page]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchInternships();
  };

  const handleApply = async (internshipId) => {
    try {
      await applyForInternship(internshipId, {});
      toast.success("Application submitted!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to apply");
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-white">
          Internship Listings
        </h1>

        <form
          onSubmit={handleSearch}
          className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-6 sm:mb-8"
        >
          <input
            type="text"
            placeholder="Search by role, description..."
            className="flex-1 bg-surface-700 border border-surface-600 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:ring-2 focus:ring-primary-500/20 outline-none text-sm sm:text-base"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            type="submit"
            className="bg-primary-600 text-white px-6 py-2.5 rounded-lg hover:bg-primary-700 transition font-medium text-sm sm:text-base shrink-0"
          >
            Search
          </button>
        </form>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-400 mx-auto"></div>
          </div>
        ) : internships.length === 0 ? (
          <p className="text-center text-gray-500 py-12">
            No internships found.
          </p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {internships.map((intern) => (
                <div
                  key={intern._id}
                  className="bg-surface-800 rounded-xl shadow-sm border border-surface-600 p-4 sm:p-6 hover:shadow-lg hover:border-primary-500/30 transition-all duration-200 flex flex-col"
                >
                  <h3 className="text-base sm:text-lg font-semibold text-primary-400">
                    {intern.role}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {intern.companyId?.companyName || "Company"}
                  </p>
                  <p className="text-sm text-gray-400 mt-2 sm:mt-3 line-clamp-3">
                    {intern.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-2 sm:mt-3">
                    {intern.requiredSkills?.slice(0, 4).map((skill) => (
                      <span
                        key={skill}
                        className="text-xs bg-primary-500/10 text-primary-400 px-2 py-0.5 rounded"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-3 sm:mt-4 text-xs text-gray-500">
                    {intern.location && (
                      <span className="flex items-center gap-1">
                        <FiMapPin size={12} /> {intern.location}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <FiClock size={12} /> {intern.duration}
                    </span>
                    {intern.stipend > 0 && (
                      <span className="flex items-center gap-1">
                        <FiDollarSign size={12} /> {intern.stipend}/mo
                      </span>
                    )}
                  </div>

                  <div className="mt-auto pt-4 flex gap-2">
                    <button
                      onClick={() => setSelectedIntern(intern)}
                      className="flex-1 border border-surface-500 text-gray-300 py-2.5 rounded-lg text-sm hover:bg-surface-700 transition flex items-center justify-center gap-1"
                    >
                      View Details <FiChevronRight size={14} />
                    </button>
                    {user?.role === "student" && (
                      <button
                        onClick={() => handleApply(intern._id)}
                        className="flex-1 bg-primary-600 text-white py-2.5 rounded-lg text-sm hover:bg-primary-700 transition"
                      >
                        Apply Now
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {pagination.pages > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                {Array.from({ length: pagination.pages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setPage(i + 1)}
                    className={`px-3 py-1 rounded ${
                      page === i + 1
                        ? "bg-primary-600 text-white"
                        : "bg-surface-800 border border-surface-600 text-gray-400 hover:bg-surface-700"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Detail modal/drawer */}
      {selectedIntern && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-surface-800 border border-surface-600 rounded-t-2xl sm:rounded-2xl shadow-2xl w-full sm:max-w-lg max-h-[90vh] sm:max-h-[85vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-white">
                    {selectedIntern.role}
                  </h2>
                  <p className="text-sm text-gray-400 mt-1">
                    Posted on{" "}
                    {new Date(selectedIntern.postedDate).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedIntern(null)}
                  className="text-gray-400 hover:text-white transition p-1"
                >
                  <FiX size={20} />
                </button>
              </div>

              {/* Company info */}
              <div className="bg-surface-700 rounded-xl p-4 mb-5 border border-surface-600">
                <h3 className="text-sm font-semibold text-white flex items-center gap-2 mb-3">
                  <FiBriefcase size={14} className="text-primary-400" />
                  Posted by
                </h3>
                <p className="text-base font-medium text-white">
                  {selectedIntern.companyId?.companyName}
                </p>
                {selectedIntern.companyId?.industry && (
                  <p className="text-sm text-gray-400 mt-1">
                    Industry: {selectedIntern.companyId.industry}
                  </p>
                )}
                {selectedIntern.companyId?.location && (
                  <p className="text-sm text-gray-400 flex items-center gap-1 mt-1">
                    <FiMapPin size={12} />
                    {selectedIntern.companyId.location}
                  </p>
                )}
                {selectedIntern.companyId?.description && (
                  <p className="text-sm text-gray-400 mt-2">
                    {selectedIntern.companyId.description}
                  </p>
                )}
                {selectedIntern.companyId?.website && (
                  <a
                    href={selectedIntern.companyId.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-primary-400 hover:text-primary-300 mt-2 transition"
                  >
                    <FiGlobe size={12} />
                    {selectedIntern.companyId.website}
                  </a>
                )}
              </div>

              {/* Internship details */}
              <div className="space-y-3 mb-5">
                <h3 className="text-sm font-semibold text-white">
                  Description
                </h3>
                <p className="text-sm text-gray-400 whitespace-pre-line">
                  {selectedIntern.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-5">
                {selectedIntern.location && (
                  <div className="bg-surface-700 rounded-lg p-3">
                    <p className="text-xs text-gray-500">Location</p>
                    <p className="text-sm text-white">
                      {selectedIntern.location}
                    </p>
                  </div>
                )}
                <div className="bg-surface-700 rounded-lg p-3">
                  <p className="text-xs text-gray-500">Duration</p>
                  <p className="text-sm text-white">
                    {selectedIntern.duration}
                  </p>
                </div>
                {selectedIntern.stipend > 0 && (
                  <div className="bg-surface-700 rounded-lg p-3">
                    <p className="text-xs text-gray-500">Stipend</p>
                    <p className="text-sm text-white">
                      ₹{selectedIntern.stipend}/month
                    </p>
                  </div>
                )}
                {selectedIntern.deadline && (
                  <div className="bg-surface-700 rounded-lg p-3">
                    <p className="text-xs text-gray-500">Deadline</p>
                    <p className="text-sm text-white">
                      {new Date(selectedIntern.deadline).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>

              {/* Required skills */}
              {selectedIntern.requiredSkills?.length > 0 && (
                <div className="mb-5">
                  <p className="text-sm font-semibold text-white mb-2">
                    Required Skills
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedIntern.requiredSkills.map((skill) => (
                      <span
                        key={skill}
                        className="bg-primary-500/10 text-primary-400 text-xs px-2.5 py-1 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Apply button */}
              {user?.role === "student" && (
                <button
                  onClick={() => {
                    handleApply(selectedIntern._id);
                    setSelectedIntern(null);
                  }}
                  className="w-full bg-primary-600 text-white py-2.5 rounded-lg hover:bg-primary-700 transition font-medium"
                >
                  Apply for this Internship
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InternshipListings;
