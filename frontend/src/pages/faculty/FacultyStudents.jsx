import { useEffect, useState } from "react";
import { getStudents, getStudentProgress } from "../../services/facultyService";
import StatusBadge from "../../components/StatusBadge";
import toast from "react-hot-toast";

const FacultyStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await getStudents();
        setStudents(data.students);
      } catch {
        toast.error("Failed to load students");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const viewProgress = async (studentId) => {
    setSelectedStudent(studentId);
    try {
      const { data } = await getStudentProgress(studentId);
      setProgress(data);
    } catch {
      toast.error("Failed to load progress");
    }
  };

  if (loading) {
    return (
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-400 mx-auto mt-12"></div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-6 text-white">Student Progress</h2>

      <div className="bg-surface-800 rounded-xl shadow-sm border border-surface-600 p-6 mb-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-surface-600 text-left text-gray-500">
                <th className="pb-3 font-medium">Name</th>
                <th className="pb-3 font-medium">Email</th>
                <th className="pb-3 font-medium">Applications</th>
                <th className="pb-3 font-medium">Selected</th>
                <th className="pb-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr
                  key={s._id}
                  className="border-b border-surface-700 last:border-0"
                >
                  <td className="py-3 font-medium text-white">{s.name}</td>
                  <td className="py-3 text-gray-400">{s.email}</td>
                  <td className="py-3 text-gray-400">{s.totalApplications}</td>
                  <td className="py-3 text-gray-400">{s.selectedCount}</td>
                  <td className="py-3">
                    <button
                      onClick={() => viewProgress(s._id)}
                      className="text-primary-400 hover:underline text-sm"
                    >
                      View Progress
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedStudent && progress && (
        <div className="bg-surface-800 rounded-xl shadow-sm border border-surface-600 p-6">
          <h3 className="font-semibold mb-4 text-white">Applications</h3>
          {progress.applications.length === 0 ? (
            <p className="text-gray-500 text-sm">No applications</p>
          ) : (
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-surface-600 text-left text-gray-500">
                    <th className="pb-2 font-medium">Role</th>
                    <th className="pb-2 font-medium">Company</th>
                    <th className="pb-2 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {progress.applications.map((a) => (
                    <tr
                      key={a._id}
                      className="border-b border-surface-700 last:border-0"
                    >
                      <td className="py-2 text-white">
                        {a.internshipId?.role}
                      </td>
                      <td className="py-2 text-gray-400">
                        {a.internshipId?.companyId?.companyName}
                      </td>
                      <td className="py-2">
                        <StatusBadge status={a.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <h3 className="font-semibold mb-4 text-white">Reports</h3>
          {progress.reports.length === 0 ? (
            <p className="text-gray-500 text-sm">No reports submitted</p>
          ) : (
            <ul className="space-y-2">
              {progress.reports.map((r) => (
                <li
                  key={r._id}
                  className="flex items-center justify-between bg-surface-700 border border-surface-600 p-3 rounded-lg"
                >
                  <span className="text-sm text-white">
                    {r.internshipId?.role || "Internship Report"}
                  </span>
                  <div className="flex items-center gap-3">
                    <a
                      href={r.reportURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-400 text-sm hover:underline"
                    >
                      View Report
                    </a>
                    <span
                      className={`text-xs ${r.approvedByFaculty ? "text-green-400" : "text-yellow-400"}`}
                    >
                      {r.approvedByFaculty ? "Approved" : "Pending"}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default FacultyStudents;