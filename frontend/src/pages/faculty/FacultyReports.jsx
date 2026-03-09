import { useEffect, useState } from "react";
import {
  getReports,
  approveReport,
  rejectReport,
} from "../../services/facultyService";
import toast from "react-hot-toast";

const FacultyReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    try {
      const { data } = await getReports();
      setReports(data.reports);
    } catch {
      toast.error("Failed to load reports");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleApprove = async (reportId) => {
    const credit = prompt("Academic credit to assign (number):");
    if (credit === null) return;
    try {
      await approveReport(reportId, {
        academicCredit: Number(credit),
        feedback: "Approved",
      });
      toast.success("Report approved");
      fetchReports();
    } catch {
      toast.error("Failed to approve report");
    }
  };

  const handleReject = async (reportId) => {
    const feedback = prompt("Feedback for student:");
    if (feedback === null) return;
    try {
      await rejectReport(reportId, { feedback });
      toast.success("Report sent back for revision");
      fetchReports();
    } catch {
      toast.error("Failed to reject report");
    }
  };

  if (loading) {
    return (
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-400 mx-auto mt-12"></div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-6 text-white">Review Reports</h2>

      {reports.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No reports to review.</p>
      ) : (
        <div className="space-y-4">
          {reports.map((r) => (
            <div
              key={r._id}
              className="bg-surface-800 rounded-xl shadow-sm border border-surface-600 p-5"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <p className="font-semibold text-white">
                    {r.studentId?.name}
                  </p>
                  <p className="text-sm text-gray-500">{r.studentId?.email}</p>
                  <p className="text-sm text-gray-400 mt-1">
                    Internship: {r.internshipId?.companyId?.companyName} {" "}
                    {r.internshipId?.role || "N/A"}
                  </p>
                  {r.summary && (
                    <p className="text-sm text-gray-500 mt-1">{r.summary}</p>
                  )}
                  <div className="flex gap-4 mt-2">
                    <a
                      href={r.reportURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-400 text-sm hover:underline"
                    >
                      View Report
                    </a>
                    {r.certificateURL && (
                      <a
                        href={r.certificateURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-400 text-sm hover:underline"
                      >
                        View Certificate
                      </a>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {r.approvedByFaculty ? (
                    <span className="text-green-400 text-sm font-medium">
                      Approved (Credit: {r.academicCredit})
                    </span>
                  ) : (
                    <>
                      <button
                        onClick={() => handleApprove(r._id)}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(r._id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 transition"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FacultyReports;