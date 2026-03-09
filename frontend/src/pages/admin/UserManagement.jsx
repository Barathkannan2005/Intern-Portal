import { useEffect, useState } from "react";
import {
  getStudents,
  getCompanies,
  getInternships,
  verifyInternship,
  deleteUser,
} from "../../services/adminService";
import toast from "react-hot-toast";

const UserManagement = () => {
  const [students, setStudents] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [internships, setInternships] = useState([]);
  const [tab, setTab] = useState("students");
  const [loading, setLoading] = useState(true);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [sRes, cRes, iRes] = await Promise.all([
        getStudents(),
        getCompanies(),
        getInternships(),
      ]);
      setStudents(sRes.data.students);
      setCompanies(cRes.data.companies);
      setInternships(iRes.data.internships);
    } catch {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleDelete = async (userId) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      await deleteUser(userId);
      toast.success("User deleted");
      fetchAll();
    } catch {
      toast.error("Failed to delete user");
    }
  };

  const handleVerify = async (internshipId) => {
    try {
      await verifyInternship(internshipId);
      toast.success("Verification toggled");
      fetchAll();
    } catch {
      toast.error("Failed to verify internship");
    }
  };

  if (loading) {
    return (
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-400 mx-auto mt-12"></div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-6 text-white">
        User & Internship Management
      </h2>

      <div className="flex gap-2 mb-6">
        {["students", "companies", "internships"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition ${
              tab === t
                ? "bg-primary-600 text-white"
                : "bg-surface-800 border border-surface-600 text-gray-400 hover:bg-surface-700"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="bg-surface-800 rounded-xl shadow-sm border border-surface-600 p-6 overflow-x-auto">
        {tab === "students" && (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-surface-600 text-left text-gray-500">
                <th className="pb-3 font-medium">Name</th>
                <th className="pb-3 font-medium">Email</th>
                <th className="pb-3 font-medium">Joined</th>
                <th className="pb-3 font-medium">Actions</th>
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
                  <td className="py-3 text-gray-500">
                    {new Date(s.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3">
                    <button
                      onClick={() => handleDelete(s._id)}
                      className="text-red-400 text-sm hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {tab === "companies" && (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-surface-600 text-left text-gray-500">
                <th className="pb-3 font-medium">Company</th>
                <th className="pb-3 font-medium">Contact</th>
                <th className="pb-3 font-medium">Website</th>
                <th className="pb-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((c) => (
                <tr
                  key={c._id}
                  className="border-b border-surface-700 last:border-0"
                >
                  <td className="py-3 font-medium text-white">
                    {c.companyName}
                  </td>
                  <td className="py-3 text-gray-400">{c.userId?.email}</td>
                  <td className="py-3">
                    {c.website && (
                      <a
                        href={c.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-400 hover:underline"
                      >
                        {c.website}
                      </a>
                    )}
                  </td>
                  <td className="py-3">
                    <button
                      onClick={() => handleDelete(c.userId?._id)}
                      className="text-red-400 text-sm hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {tab === "internships" && (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-surface-600 text-left text-gray-500">
                <th className="pb-3 font-medium">Role</th>
                <th className="pb-3 font-medium">Company</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {internships.map((i) => (
                <tr
                  key={i._id}
                  className="border-b border-surface-700 last:border-0"
                >
                  <td className="py-3 font-medium text-white">{i.role}</td>
                  <td className="py-3 text-gray-400">
                    {i.companyId?.companyName}
                  </td>
                  <td className="py-3">
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-medium ${i.isVerified ? "bg-green-500/10 text-green-400" : "bg-yellow-500/10 text-yellow-400"}`}
                    >
                      {i.isVerified ? "Verified" : "Pending"}
                    </span>
                  </td>
                  <td className="py-3">
                    <button
                      onClick={() => handleVerify(i._id)}
                      className="text-primary-400 text-sm hover:underline"
                    >
                      {i.isVerified ? "Unverify" : "Verify"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default UserManagement;