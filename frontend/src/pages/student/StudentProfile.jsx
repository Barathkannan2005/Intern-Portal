import { useEffect, useState } from "react";
import {
  getProfile,
  updateProfile,
  uploadResume,
} from "../../services/studentService";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import {
  FiUser,
  FiUploadCloud,
  FiFileText,
  FiBookOpen,
  FiCode,
  FiSave,
  FiExternalLink,
} from "react-icons/fi";

const StudentProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    department: "",
    cgpa: "",
    skills: "",
    university: "",
    degree: "",
    yearOfStudy: "",
    graduationYear: "",
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const { data } = await getProfile();
      const p = data.profile;
      setProfile(p);
      setForm({
        department: p.department || "",
        cgpa: p.cgpa || "",
        skills: (p.skills || []).join(", "),
        university: p.academics?.university || "",
        degree: p.academics?.degree || "",
        yearOfStudy: p.academics?.yearOfStudy || "",
        graduationYear: p.academics?.graduationYear || "",
      });
    } catch {
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateProfile({
        department: form.department,
        cgpa: form.cgpa ? Number(form.cgpa) : undefined,
        skills: form.skills
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        academics: {
          university: form.university,
          degree: form.degree,
          yearOfStudy: form.yearOfStudy ? Number(form.yearOfStudy) : undefined,
          graduationYear: form.graduationYear
            ? Number(form.graduationYear)
            : undefined,
        },
      });
      toast.success("Profile updated");
      loadProfile();
    } catch {
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("resume", file);
    try {
      const { data } = await uploadResume(formData);
      toast.success("Resume uploaded");
      setProfile((prev) => ({ ...prev, resumeURL: data.resumeURL }));
    } catch {
      toast.error("Failed to upload resume");
    }
  };

  if (loading) {
    return (
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-400 mx-auto mt-12"></div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Profile Header Card */}
      <div className="bg-surface-800 rounded-xl shadow-sm border border-surface-600 overflow-hidden">
        <div className="h-24 bg-gradient-to-r from-primary-600 via-indigo-600 to-purple-600" />
        <div className="px-6 pb-6 -mt-10">
          <div className="flex items-end gap-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-600 to-indigo-600 text-white flex items-center justify-center text-2xl font-bold border-4 border-surface-800 shadow-md">
              {user?.name?.charAt(0)?.toUpperCase()}
            </div>
            <div className="pb-1">
              <h1 className="text-xl font-bold text-white">{user?.name}</h1>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Resume Card */}
      <div className="bg-surface-800 rounded-xl shadow-sm border border-surface-600 p-6">
        <div className="flex items-center gap-2 mb-4">
          <FiFileText className="text-primary-400" size={20} />
          <h2 className="text-lg font-semibold text-white">Resume</h2>
        </div>
        <div className="flex items-center justify-between p-4 bg-surface-700 rounded-lg border border-dashed border-surface-500">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-500/10 rounded-lg flex items-center justify-center">
              <FiFileText className="text-primary-400" size={20} />
            </div>
            {profile?.resumeURL ? (
              <div>
                <p className="text-sm font-medium text-white">Resume uploaded</p>
                <a
                  href={profile.resumeURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary-400 hover:underline inline-flex items-center gap-1"
                >
                  View Resume <FiExternalLink size={12} />
                </a>
              </div>
            ) : (
              <div>
                <p className="text-sm font-medium text-gray-300">No resume uploaded yet</p>
                <p className="text-xs text-gray-500">PDF, DOC, or DOCX (max 5MB)</p>
              </div>
            )}
          </div>
          <label className="cursor-pointer inline-flex items-center gap-2 bg-primary-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-primary-700 transition shadow-sm">
            <FiUploadCloud size={16} />
            Upload
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              className="hidden"
              onChange={handleResumeUpload}
            />
          </label>
        </div>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* Academic Information */}
        <div className="bg-surface-800 rounded-xl shadow-sm border border-surface-600 p-6">
          <div className="flex items-center gap-2 mb-5">
            <FiBookOpen className="text-primary-400" size={20} />
            <h2 className="text-lg font-semibold text-white">Academic Information</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Department</label>
              <input
                type="text"
                placeholder="e.g. Computer Science"
                className="w-full bg-surface-700 border border-surface-600 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition"
                value={form.department}
                onChange={(e) => setForm({ ...form, department: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">CGPA</label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="10"
                placeholder="e.g. 8.5"
                className="w-full bg-surface-700 border border-surface-600 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition"
                value={form.cgpa}
                onChange={(e) => setForm({ ...form, cgpa: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">University</label>
              <input
                type="text"
                placeholder="e.g. IIT Bombay"
                className="w-full bg-surface-700 border border-surface-600 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition"
                value={form.university}
                onChange={(e) => setForm({ ...form, university: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Degree</label>
              <input
                type="text"
                placeholder="e.g. B.Tech"
                className="w-full bg-surface-700 border border-surface-600 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition"
                value={form.degree}
                onChange={(e) => setForm({ ...form, degree: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Year of Study</label>
              <input
                type="number"
                placeholder="e.g. 3"
                className="w-full bg-surface-700 border border-surface-600 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition"
                value={form.yearOfStudy}
                onChange={(e) => setForm({ ...form, yearOfStudy: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Graduation Year</label>
              <input
                type="number"
                placeholder="e.g. 2027"
                className="w-full bg-surface-700 border border-surface-600 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition"
                value={form.graduationYear}
                onChange={(e) => setForm({ ...form, graduationYear: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="bg-surface-800 rounded-xl shadow-sm border border-surface-600 p-6">
          <div className="flex items-center gap-2 mb-5">
            <FiCode className="text-primary-400" size={20} />
            <h2 className="text-lg font-semibold text-white">Skills</h2>
          </div>
          <input
            type="text"
            className="w-full bg-surface-700 border border-surface-600 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition"
            placeholder="React, Node.js, Python, Machine Learning..."
            value={form.skills}
            onChange={(e) => setForm({ ...form, skills: e.target.value })}
          />
          {form.skills && (
            <div className="flex flex-wrap gap-2 mt-3">
              {form.skills.split(",").map((s) => s.trim()).filter(Boolean).map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center px-3 py-1 rounded-full bg-primary-500/10 text-primary-400 text-xs font-medium border border-primary-500/20"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition shadow-sm disabled:opacity-60"
          >
            <FiSave size={16} />
            {saving ? "Saving..." : "Save Profile"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentProfile;