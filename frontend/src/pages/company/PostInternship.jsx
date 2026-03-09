import { useState, useEffect } from "react";
import { postInternship, getProfile } from "../../services/companyService";
import toast from "react-hot-toast";

const PostInternship = () => {
  const [companyName, setCompanyName] = useState("");
  const [form, setForm] = useState({
    role: "",
    description: "",
    requiredSkills: "",
    stipend: "",
    duration: "",
    location: "",
    deadline: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const { data } = await getProfile();
        setCompanyName(data.company?.companyName || "");
      } catch {
        /* ignore */
      }
    };
    fetchCompany();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await postInternship({
        ...form,
        requiredSkills: form.requiredSkills
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        stipend: form.stipend ? Number(form.stipend) : 0,
        deadline: form.deadline || undefined,
      });
      toast.success("Internship posted successfully!");
      setForm({
        role: "",
        description: "",
        requiredSkills: "",
        stipend: "",
        duration: "",
        location: "",
        deadline: "",
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-surface-800 rounded-xl shadow-sm border border-surface-600 p-6">
      <h2 className="text-xl font-bold mb-6 text-white">
        Post New Internship
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Company Name
            </label>
            <input
              type="text"
              readOnly
              className="w-full bg-surface-700 border border-surface-600 rounded-lg px-3 py-2 text-gray-400 outline-none cursor-not-allowed"
              value={companyName}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Role *
            </label>
            <input
              type="text"
              required
              className="w-full bg-surface-700 border border-surface-600 rounded-lg px-3 py-2 text-white outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Duration *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. 3 months"
              className="w-full bg-surface-700 border border-surface-600 rounded-lg px-3 py-2 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
              value={form.duration}
              onChange={(e) => setForm({ ...form, duration: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Stipend (per month)
            </label>
            <input
              type="number"
              min="0"
              className="w-full bg-surface-700 border border-surface-600 rounded-lg px-3 py-2 text-white outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
              value={form.stipend}
              onChange={(e) => setForm({ ...form, stipend: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Location
            </label>
            <input
              type="text"
              className="w-full bg-surface-700 border border-surface-600 rounded-lg px-3 py-2 text-white outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Deadline
            </label>
            <input
              type="date"
              className="w-full bg-surface-700 border border-surface-600 rounded-lg px-3 py-2 text-white outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
              value={form.deadline}
              onChange={(e) => setForm({ ...form, deadline: e.target.value })}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Required Skills (comma-separated)
          </label>
          <input
            type="text"
            placeholder="React, Node.js, Python..."
            className="w-full bg-surface-700 border border-surface-600 rounded-lg px-3 py-2 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
            value={form.requiredSkills}
            onChange={(e) =>
              setForm({ ...form, requiredSkills: e.target.value })
            }
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Description *
          </label>
          <textarea
            rows={5}
            required
            className="w-full bg-surface-700 border border-surface-600 rounded-lg px-3 py-2 text-white outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition disabled:opacity-50"
        >
          {loading ? "Posting..." : "Post Internship"}
        </button>
      </form>
    </div>
  );
};

export default PostInternship;