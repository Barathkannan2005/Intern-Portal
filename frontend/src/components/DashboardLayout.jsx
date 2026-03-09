import { NavLink, Outlet } from "react-router-dom";

const DashboardLayout = ({ links }) => {
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <aside className="w-full md:w-64 shrink-0">
            <nav className="bg-surface-800 rounded-xl shadow-sm border border-surface-600 p-4 space-y-1">
              {links.map(({ to, label, icon: Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  end
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition ${
                      isActive
                        ? "bg-primary-500/10 text-primary-400 font-semibold"
                        : "text-gray-400 hover:bg-surface-700 hover:text-white"
                    }`
                  }
                >
                  {Icon && <Icon size={18} />}
                  {label}
                </NavLink>
              ))}
            </nav>
          </aside>

          {/* Main content */}
          <main className="flex-1 min-w-0">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
