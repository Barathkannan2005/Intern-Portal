import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FiMenu, FiX, FiBriefcase, FiLogOut } from "react-icons/fi";
import { useState } from "react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  if (isAuthPage) return null;

  const getDashboardLink = () => {
    if (!user) return "/login";
    const map = {
      student: "/student/dashboard",
      company: "/company/dashboard",
      faculty: "/faculty/dashboard",
      admin: "/admin/dashboard",
    };
    return map[user.role] || "/";
  };

  return (
    <nav className="bg-surface-800 border-b border-surface-600 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gradient-to-br from-primary-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <FiBriefcase size={18} className="text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary-400 to-indigo-400 bg-clip-text text-transparent">
              InternPortal
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/internships"
              className="text-sm text-gray-300 hover:text-primary-400 transition"
            >
              Internships
            </Link>
            {user ? (
              <>
                <Link
                  to={getDashboardLink()}
                  className="text-sm text-gray-300 hover:text-primary-400 transition"
                >
                  Dashboard
                </Link>
                <div className="h-6 w-px bg-surface-600" />
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-600 to-indigo-600 text-white flex items-center justify-center text-sm font-semibold shadow-sm">
                    {user.name?.charAt(0)?.toUpperCase()}
                  </div>
                  <div className="hidden lg:block">
                    <p className="text-sm font-semibold text-gray-200 leading-tight">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-500 capitalize">
                      {user.role}
                    </p>
                  </div>
                  <button
                    onClick={logout}
                    className="p-2 text-gray-400 hover:text-red-400 hover:bg-surface-700 rounded-lg transition"
                    title="Logout"
                  >
                    <FiLogOut size={18} />
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-semibold text-primary-400 hover:text-primary-300 transition"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-semibold bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-gray-300 hover:bg-surface-700 rounded-lg"
            onClick={() => setOpen(!open)}
          >
            {open ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden pb-3 pt-1 space-y-1 border-t border-surface-600">
            {user && (
              <div className="flex items-center gap-3 px-3 py-3 mb-1">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-600 to-indigo-600 text-white flex items-center justify-center font-semibold">
                  {user.name?.charAt(0)?.toUpperCase()}
                </div>
                <div>
                  <p className="font-medium text-gray-200">{user.name}</p>
                  <p className="text-xs text-gray-500 capitalize">
                    {user.role}
                  </p>
                </div>
              </div>
            )}
            <Link
              to="/internships"
              className="block px-3 py-2.5 rounded-lg text-sm text-gray-300 hover:bg-surface-700"
              onClick={() => setOpen(false)}
            >
              Internships
            </Link>
            {user ? (
              <>
                <Link
                  to={getDashboardLink()}
                  className="block px-3 py-2.5 rounded-lg text-sm text-gray-300 hover:bg-surface-700"
                  onClick={() => setOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2.5 rounded-lg text-sm text-red-400 hover:bg-surface-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2.5 rounded-lg text-sm text-primary-400 hover:bg-surface-700"
                  onClick={() => setOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="block mx-3 mt-1 text-center py-2.5 rounded-lg text-sm font-semibold bg-primary-600 text-white hover:bg-primary-700"
                  onClick={() => setOpen(false)}
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
