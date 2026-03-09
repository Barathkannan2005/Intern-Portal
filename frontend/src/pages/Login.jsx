import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { FiBriefcase, FiMail, FiLock, FiArrowRight } from "react-icons/fi";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await login(form);
      loginUser(data.user, data.token);
      toast.success("Login successful!");

      const dashMap = {
        student: "/student/dashboard",
        company: "/company/dashboard",
        faculty: "/faculty/dashboard",
        admin: "/admin/dashboard",
      };
      navigate(dashMap[data.user.role] || "/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
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
            Welcome Back to
            <br />
            <span className="bg-gradient-to-r from-amber-300 to-yellow-200 bg-clip-text text-transparent">
              InternshipPortal
            </span>
          </h1>
          <p className="mt-4 text-lg text-blue-100 leading-relaxed max-w-md">
            Sign in to access your dashboard, track applications, and manage
            your internship journey.
          </p>
          <div className="mt-10 flex items-center gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold">500+</p>
              <p className="text-xs text-blue-200">Internships</p>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div className="text-center">
              <p className="text-2xl font-bold">1,200+</p>
              <p className="text-xs text-blue-200">Students</p>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div className="text-center">
              <p className="text-2xl font-bold">150+</p>
              <p className="text-xs text-blue-200">Companies</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-surface-900">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-8">
            <Link to="/" className="text-2xl font-extrabold text-primary-600">
              InternshipPortal
            </Link>
          </div>

          <div className="bg-surface-700 rounded-2xl shadow-xl border border-surface-500 p-8 sm:p-10">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-extrabold text-white">Sign In</h2>
              <p className="text-sm text-gray-400 mt-1">
                Enter your credentials to access your account
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
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
                    placeholder="••••••••"
                    className="w-full pl-11 pr-4 py-3 bg-surface-800 border border-surface-500 rounded-xl text-sm text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition"
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                  />
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
                    Sign In
                    <FiArrowRight size={16} />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-400">
                Don&apos;t have an account?{" "}
                <Link
                  to="/register"
                  className="font-semibold text-primary-600 hover:text-primary-700 transition"
                >
                  Create one free
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

export default Login;
