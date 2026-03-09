import { useEffect, useState } from "react";
import {
  getMyInternships,
  getApplicants,
  updateApplicationStatus,
} from "../../services/companyService";
import StatusBadge from "../../components/StatusBadge";
import {
  FiFileText,
  FiChevronDown,
  FiChevronUp,
  FiMail,
  FiBook,
  FiAward,
  FiExternalLink,
  FiUser,
} from "react-icons/fi";
import toast from "react-hot-toast";

const ManageApplicants = () => {
  const [internships, setInternships] = useState([]);
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await getMyInternships();
        setInternships(data.internships);
      } catch {
        toast.error("Failed to load internships");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const loadApplicants = async (internshipId) => {
    setSelectedInternship(internshipId);
    setExpandedId(null);
    try {
      const { data } = await getApplicants(internshipId);
      setApplicants(data.applications);
    } catch {
      toast.error("Failed to load applicants");
    }
  };

  const handleStatusUpdate = async (applicationId, status) => {
    try {
      await updateApplicationStatus({ applicationId, status });
      toast.success(`Status updated to ${status}`);
      loadApplicants(selectedInternship);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update status");
    }
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (loading) {
    return (
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-400 mx-auto mt-12"></div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-6 text-white">Manage Applicants</h2>

      <div className="bg-surface-800 rounded-xl shadow-sm border border-surface-600 p-4 mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Select Internship
        </label>
        <select
          className="w-full bg-surface-700 border border-surface-600 rounded-lg px-3 py-2 text-white outline-none focus:ring-2 focus:ring-primary-500/20"
          value={selectedInternship || ""}
          onChange={(e) => loadApplicants(e.target.value)}
        >
          <option value="">-- Choose an internship --</option>
          {internships.map((i) => (
            <option key={i._id} value={i._id}>
              {i.role} — {i.duration}
            </option>
          ))}
        </select>
      </div>

      {selectedInternship && (
        <div className="space-y-4">
          {applicants.length === 0 ? (
            <div className="bg-surface-800 rounded-xl border border-surface-600 p-8">
              <p className="text-gray-500 text-center">No applicants yet.</p>
            </div>
          ) : (
            applicants.map((app) => (
              <div
                key={app._id}
                className="bg-surface-800 rounded-xl shadow-sm border border-surface-600 overflow-hidden"
              >
                {/* Summary row */}
                <div
                  className="p-5 flex flex-col md:flex-row md:items-center gap-4 cursor-pointer hover:bg-surface-700/50 transition"
                  onClick={() => toggleExpand(app._id)}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-primary-500/10 flex items-center justify-center shrink-0">
                      <FiUser className="text-primary-400" size={18} />
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-white truncate">
                        {app.studentId?.name}
                      </p>
                      <p className="text-sm text-gray-400 truncate">
                        {app.studentId?.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    {app.studentProfile?.skills?.length > 0 && (
                      <div className="hidden md:flex flex-wrap gap-1 max-w-xs">
                        {app.studentProfile.skills.slice(0, 3).map((skill) => (
                          <span
                            key={skill}
                            className="inline-block bg-primary-500/10 text-primary-400 text-xs px-2 py-0.5 rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                        {app.studentProfile.skills.length > 3 && (
                          <span className="text-xs text-gray-500">
                            +{app.studentProfile.skills.length - 3}
                          </span>
                        )}
                      </div>
                    )}

                    {app.studentProfile?.resumeURL && (
                      <a
                        href={app.studentProfile.resumeURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-primary-400 hover:text-primary-300 text-xs font-medium bg-primary-500/10 px-2 py-1 rounded"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FiFileText size={14} />
                        Resume
                      </a>
                    )}

                    <StatusBadge status={app.status} />

                    {expandedId === app._id ? (
                      <FiChevronUp className="text-gray-400" size={18} />
                    ) : (
                      <FiChevronDown className="text-gray-400" size={18} />
                    )}
                  </div>
                </div>

                {/* Expanded profile detail */}
                {expandedId === app._id && (
                  <div className="border-t border-surface-600 p-5 bg-surface-700/30">
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Left: Academic & Personal */}
                      <div className="space-y-4">
                        <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                          <FiBook size={14} className="text-primary-400" />
                          Academic Information
                        </h4>

                        <div className="grid grid-cols-2 gap-3">
                          {app.studentProfile?.department && (
                            <div>
                              <p className="text-xs text-gray-500">Department</p>
                              <p className="text-sm text-gray-300">
                                {app.studentProfile.department}
                              </p>
                            </div>
                          )}
                          {app.studentProfile?.cgpa != null && (
                            <div>
                              <p className="text-xs text-gray-500">CGPA</p>
                              <p className="text-sm text-gray-300">
                                {app.studentProfile.cgpa}
                              </p>
                            </div>
                          )}
                          {app.studentProfile?.academics?.university && (
                            <div>
                              <p className="text-xs text-gray-500">University</p>
                              <p className="text-sm text-gray-300">
                                {app.studentProfile.academics.university}
                              </p>
                            </div>
                          )}
                          {app.studentProfile?.academics?.degree && (
                            <div>
                              <p className="text-xs text-gray-500">Degree</p>
                              <p className="text-sm text-gray-300">
                                {app.studentProfile.academics.degree}
                              </p>
                            </div>
                          )}
                          {app.studentProfile?.academics?.yearOfStudy && (
                            <div>
                              <p className="text-xs text-gray-500">Year of Study</p>
                              <p className="text-sm text-gray-300">
                                {app.studentProfile.academics.yearOfStudy}
                              </p>
                            </div>
                          )}
                          {app.studentProfile?.academics?.graduationYear && (
                            <div>
                              <p className="text-xs text-gray-500">Graduation</p>
                              <p className="text-sm text-gray-300">
                                {app.studentProfile.academics.graduationYear}
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Skills */}
                        {app.studentProfile?.skills?.length > 0 && (
                          <div>
                            <p className="text-xs text-gray-500 mb-2">All Skills</p>
                            <div className="flex flex-wrap gap-1.5">
                              {app.studentProfile.skills.map((skill) => (
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
                      </div>

                      {/* Right: Projects & Resume */}
                      <div className="space-y-4">
                        {app.studentProfile?.projects?.length > 0 && (
                          <div>
                            <h4 className="text-sm font-semibold text-white flex items-center gap-2 mb-3">
                              <FiAward size={14} className="text-primary-400" />
                              Projects
                            </h4>
                            <div className="space-y-3">
                              {app.studentProfile.projects.map((proj, idx) => (
                                <div
                                  key={idx}
                                  className="bg-surface-700 rounded-lg p-3 border border-surface-600"
                                >
                                  <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium text-white">
                                      {proj.title}
                                    </p>
                                    {proj.link && (
                                      <a
                                        href={proj.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-primary-400 hover:text-primary-300"
                                      >
                                        <FiExternalLink size={14} />
                                      </a>
                                    )}
                                  </div>
                                  {proj.description && (
                                    <p className="text-xs text-gray-400 mt-1">
                                      {proj.description}
                                    </p>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Resume download */}
                        {app.studentProfile?.resumeURL && (
                          <div>
                            <h4 className="text-sm font-semibold text-white flex items-center gap-2 mb-2">
                              <FiFileText size={14} className="text-primary-400" />
                              Resume
                            </h4>
                            <a
                              href={app.studentProfile.resumeURL}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-primary-700 transition"
                            >
                              <FiExternalLink size={14} />
                              View / Download Resume
                            </a>
                          </div>
                        )}

                        {/* Contact */}
                        <div>
                          <h4 className="text-sm font-semibold text-white flex items-center gap-2 mb-2">
                            <FiMail size={14} className="text-primary-400" />
                            Contact
                          </h4>
                          <a
                            href={`mailto:${app.studentId?.email}`}
                            className="text-sm text-primary-400 hover:text-primary-300 transition"
                          >
                            {app.studentId?.email}
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="mt-5 pt-4 border-t border-surface-600 flex gap-2 flex-wrap">
                      {[
                        { status: "shortlisted", color: "bg-blue-600 hover:bg-blue-700" },
                        { status: "interview", color: "bg-purple-600 hover:bg-purple-700" },
                        { status: "selected", color: "bg-green-600 hover:bg-green-700" },
                        { status: "rejected", color: "bg-red-500 hover:bg-red-600" },
                      ].map(({ status, color }) => (
                        <button
                          key={status}
                          onClick={() => handleStatusUpdate(app._id, status)}
                          className={`text-xs px-3 py-1.5 rounded-lg text-white ${color} capitalize transition`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default ManageApplicants;