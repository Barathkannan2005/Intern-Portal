import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getInternships,
  applyForInternship,
  getProfile,
} from "../../services/studentService";
import {
  FiMapPin,
  FiClock,
  FiAlertCircle,
  FiX,
  FiBriefcase,
  FiGlobe,
  FiChevronRight,
  FiDollarSign,
} from "react-icons/fi";
import toast from "react-hot-toast";

const ApplyInternship = () => {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [profileComplete, setProfileComplete] = useState(null);
  const [selectedIntern, setSelectedIntern] = useState(null);

  const checkProfile = async () => {
    try {
      const { data } = await getProfile();
      const p = data.profile;
      const hasSkills = p.skills && p.skills.length > 0;
      const hasResume = !!p.resumeURL;
      setProfileComplete(hasSkills && hasResume);
    } catch {
      setProfileComplete(false);
    }
  };

  const fetchInternships = async () => {
    setLoading(true);
    try {
      const params = {};
      if (search) params.search = search;
      const { data } = await getInternships(params);
      setInternships(data.internships);
    } catch {
      toast.error("Failed to load internships");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkProfile();
    fetchInternships();
  }, []);

  const handleApply = async (id) => {
    try {
      await applyForInternship(id, {});
      toast.success("Applied successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to apply");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-white">Browse & Apply</h2>

      {profileComplete === false && (
        <div className="mb-6 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-start gap-3">
          <FiAlertCircle className="text-amber-400 mt-0.5 shrink-0" size={20} />
          <div>
            <p className="text-amber-400 font-medium">
              Complete your profile to apply
            </p>
            <p className="text-sm text-gray-400 mt-1">
              You need to add your skills and upload a resume before applying
              for internships.
            </p>
            <Link
              to="/student/dashboard"
              className="inline-block mt-2 text-sm font-semibold text-primary-400 hover:text-primary-300 transition"
            >
              Go to Profile &rarr;
            </Link>
          </div>
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetchInternships();
        }}
        className="flex gap-2 mb-6"
      >
        <input
          type="text"
          placeholder="Search internships..."
          className="flex-1 bg-surface-700 border border-surface-600 rounded-lg px-3 py-2 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-primary-500/20"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          type="submit"
          className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition"
        >
          Search
        </button>
      </form>

      {loading ? (
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-400 mx-auto mt-12"></div>
      ) : internships.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No internships found.</p>
      ) : (
        <div className="space-y-4">
          {internships.map((intern) => (
            <div
              key={intern._id}
              className="bg-surface-800 rounded-xl shadow-sm border border-surface-600 p-5 hover:border-surface-500 transition"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-primary-400">
                    {intern.role}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {intern.companyId?.companyName}
                    {intern.companyId?.industry && (
                      <span className="text-gray-600"> · {intern.companyId.industry}</span>
                    )}
                  </p>
                  <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                    {intern.description}
                  </p>
                  <div className="flex gap-3 mt-2 text-xs text-gray-500">
                    {intern.location && (
                      <span className="flex items-center gap-1">
                        <FiMapPin size={12} />
                        {intern.location}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <FiClock size={12} />
                      {intern.duration}
                    </span>
                    {intern.stipend > 0 && (
                      <span className="flex items-center gap-1">
                        <FiDollarSign size={12} />
                        ₹{intern.stipend}/mo
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => setSelectedIntern(intern)}
                    className="px-4 py-2 rounded-lg text-sm border border-surface-500 text-gray-300 hover:bg-surface-700 transition flex items-center gap-1"
                  >
                    Details <FiChevronRight size={14} />
                  </button>
                  <button
                    onClick={() => handleApply(intern._id)}
                    disabled={!profileComplete}
                    className={`px-6 py-2 rounded-lg text-sm transition ${
                      profileComplete
                        ? "bg-primary-600 text-white hover:bg-primary-700"
                        : "bg-surface-700 text-gray-600 cursor-not-allowed"
                    }`}
                    title={!profileComplete ? "Complete your profile first" : ""}
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detail modal */}
      {selectedIntern && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-surface-800 border border-surface-600 rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto">
            <div className="p-6">
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

              {/* Details */}
              <div className="space-y-3 mb-5">
                <h3 className="text-sm font-semibold text-white">Description</h3>
                <p className="text-sm text-gray-400 whitespace-pre-line">
                  {selectedIntern.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-5">
                {selectedIntern.location && (
                  <div className="bg-surface-700 rounded-lg p-3">
                    <p className="text-xs text-gray-500">Location</p>
                    <p className="text-sm text-white">{selectedIntern.location}</p>
                  </div>
                )}
                <div className="bg-surface-700 rounded-lg p-3">
                  <p className="text-xs text-gray-500">Duration</p>
                  <p className="text-sm text-white">{selectedIntern.duration}</p>
                </div>
                {selectedIntern.stipend > 0 && (
                  <div className="bg-surface-700 rounded-lg p-3">
                    <p className="text-xs text-gray-500">Stipend</p>
                    <p className="text-sm text-white">₹{selectedIntern.stipend}/month</p>
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

              <button
                onClick={() => {
                  handleApply(selectedIntern._id);
                  setSelectedIntern(null);
                }}
                disabled={!profileComplete}
                className={`w-full py-2.5 rounded-lg font-medium transition ${
                  profileComplete
                    ? "bg-primary-600 text-white hover:bg-primary-700"
                    : "bg-surface-700 text-gray-600 cursor-not-allowed"
                }`}
              >
                {profileComplete ? "Apply for this Internship" : "Complete Profile to Apply"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplyInternship;