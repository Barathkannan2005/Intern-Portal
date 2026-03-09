import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import {
  FiBriefcase,
  FiUser,
  FiMail,
  FiLock,
  FiArrowRight,
  FiUsers,
  FiBookOpen,
  FiCheckCircle,
} from "react-icons/fi";

const roleInfo = [
  {
    value: "student",
    label: "Student",
    icon: FiBookOpen,
    desc: "Browse & apply for internships",
  },
  {
    value: "company",
    label: "Company",
    icon: FiBriefcase,
    desc: "Post internships & hire talent",
  },
  {
    value: "faculty",
    label: "Faculty",
    icon: FiUsers,
    desc: "Review reports & assign credit",
  },
];

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
  });
  const [loading, setLoading] = useState(false);
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    setLoading(true);
    try {
      const { data } = await register({
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
      });
      loginUser(data.user, data.token);
      toast.success("Registration successful!");

      const dashMap = {
        student: "/student/dashboard",
        company: "/company/dashboard",
        faculty: "/faculty/dashboard",
        admin: "/admin/dashboard",
      };
      navigate(dashMap[data.user.role] || "/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel — branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-700 via-primary-600 to-indigo-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-white/10 blur-3xl" />
        </div>
        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-20 text-white">
          <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center mb-8">
            <FiBriefcase size={32} />
          </div>
          <h1 className="text-4xl xl:text-5xl font-extrabold leading-tight">
            Start Your Journey
            <br />
            <span className="bg-gradient-to-r from-amber-300 to-yellow-200 bg-clip-text text-transparent">
              With InternshipPortal
            </span>
          </h1>
          <p className="mt-4 text-lg text-blue-100 leading-relaxed max-w-md">
            Create your free account today and join a thriving community of
            students, companies, and educators.
          </p>
          <ul className="mt-8 space-y-3">
            {[
              "Smart internship recommendations",
              "One-click applications",
              "Academic credit tracking",
              "Real-time status updates",
            ].map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 text-sm text-blue-100"
              >
                <FiCheckCircle className="text-amber-300 shrink-0" size={16} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12 bg-surface-900">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-8">
            <Link to="/" className="text-2xl font-extrabold text-primary-600">
              InternshipPortal
            </Link>
          </div>

          <div className="bg-surface-700 rounded-2xl shadow-xl border border-surface-500 p-6 sm:p-8 md:p-10">
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                Create Account
              </h2>
              <p className="text-sm text-gray-400 mt-1">
                Fill in your details to get started
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Role selector */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  I am a
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {roleInfo.map(({ value, label, icon: Icon }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setForm({ ...form, role: value })}
                      className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 text-xs font-medium transition-all ${
                        form.role === value
                          ? "border-primary-500 bg-primary-500/10 text-primary-400"
                          : "border-surface-500 text-gray-400 hover:border-gray-500"
                      }`}
                    >
                      <Icon size={20} />
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <FiUser
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500"
                    size={18}
                  />
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    className="w-full pl-11 pr-4 py-3 bg-surface-800 border border-surface-500 rounded-xl text-sm text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <FiMail
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500"
                    size={18}
                  />
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="w-full pl-11 pr-4 py-3 bg-surface-800 border border-surface-500 rounded-xl text-sm text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <FiLock
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500"
                      size={18}
                    />
                    <input
                      type="password"
                      required
                      minLength={6}
                      placeholder="••••••••"
                      className="w-full pl-11 pr-4 py-3 bg-surface-800 border border-surface-500 rounded-xl text-sm text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition"
                      value={form.password}
                      onChange={(e) =>
                        setForm({ ...form, password: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-1.5">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <FiLock
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500"
                      size={18}
                    />
                    <input
                      type="password"
                      required
                      minLength={6}
                      placeholder="••••••••"
                      className="w-full pl-11 pr-4 py-3 bg-surface-800 border border-surface-500 rounded-xl text-sm text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition"
                      value={form.confirmPassword}
                      onChange={(e) =>
                        setForm({ ...form, confirmPassword: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:from-primary-700 hover:to-indigo-700 shadow-lg shadow-primary-600/25 transition-all duration-200 disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Create Account
                    <FiArrowRight size={16} />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-400">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-primary-600 hover:text-primary-700 transition"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>

          <p className="text-center text-xs text-gray-400 mt-6">
            &copy; {new Date().getFullYear()} InternshipPortal. All rights
            reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
