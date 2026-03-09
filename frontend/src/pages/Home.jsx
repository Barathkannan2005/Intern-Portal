import { Link } from "react-router-dom";
import {
  FiBriefcase,
  FiUsers,
  FiAward,
  FiCheckCircle,
  FiArrowRight,
  FiSearch,
  FiBookOpen,
  FiTrendingUp,
} from "react-icons/fi";

const Home = () => {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-x-clip bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-indigo-300/10 blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-sm font-semibold tracking-wide mb-6">
                BRIDGING ACADEMIA &amp; INDUSTRY
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
                Your Gateway to
                <br />
                <span className="text-yellow-400">Career-Ready</span>
                <br />
                Internships
              </h1>
              <p className="mt-5 text-lg text-blue-100/80 leading-relaxed max-w-lg">
                A unified platform for students, companies, faculty, and
                administrators to manage internships with seamless academic
                integration and career tracking.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 bg-white text-blue-700 px-7 py-3.5 rounded-lg font-bold hover:bg-gray-100 transition shadow-lg"
                >
                  Get Started Free
                  <FiArrowRight size={16} />
                </Link>
                <Link
                  to="/internships"
                  className="inline-flex items-center gap-2 border-2 border-white/30 text-white px-7 py-3.5 rounded-lg font-semibold hover:bg-white/10 transition"
                >
                  Browse Internships
                </Link>
              </div>
            </div>
            <div className="hidden lg:block relative">
              {/* Status Selected Card */}
              <div className="absolute -top-4 right-16 bg-white rounded-xl shadow-2xl px-5 py-4 animate-float-slow z-20">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                    <FiCheckCircle className="text-emerald-500" size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Status</p>
                    <p className="text-sm font-bold text-gray-900">Selected!</p>
                  </div>
                </div>
                <div className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full w-3/4 bg-emerald-500 rounded-full" />
                </div>
              </div>

              {/* Main Glassmorphism Card */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 mt-12">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                    <FiBriefcase size={28} className="text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">120+ New Roles</p>
                    <p className="text-blue-200 text-sm">Posted this week</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {["Frontend Developer", "Data Analyst", "UI/UX Designer"].map(
                    (role) => (
                      <div
                        key={role}
                        className="flex items-center justify-between bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/10"
                      >
                        <span className="text-sm font-medium text-white">{role}</span>
                        <span className="text-xs font-semibold text-blue-200">Apply</span>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Placement Rate Card */}
              <div className="absolute -bottom-6 right-4 bg-white rounded-xl shadow-2xl px-5 py-4 animate-float-delayed z-20">
                <div className="flex items-center gap-3">
                  <FiTrendingUp className="text-purple-500" size={20} />
                  <span className="text-xs text-gray-500 font-medium">This Month</span>
                </div>
                <p className="text-2xl font-extrabold text-gray-900 mt-1">+43%</p>
                <p className="text-xs text-gray-400">Placement rate</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-surface-600">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "500+", label: "Internships Posted" },
              { value: "1,200+", label: "Students Placed" },
              { value: "150+", label: "Partner Companies" },
              { value: "98%", label: "Satisfaction Rate" },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="text-3xl font-bold text-primary-400">{value}</p>
                <p className="text-sm text-gray-500 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-white">
              Everything you need in one platform
            </h2>
            <p className="mt-3 text-gray-500 max-w-2xl mx-auto">
              From discovery to completion, we streamline every step of the internship journey.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: FiBriefcase, title: "Browse Internships", desc: "Explore curated opportunities from top companies across industries.", color: "bg-primary-500/10 text-primary-400" },
              { icon: FiBookOpen, title: "Academic Integration", desc: "Earn academic credit with seamless faculty review workflows.", color: "bg-green-500/10 text-green-400" },
              { icon: FiUsers, title: "Company Dashboard", desc: "Post internships, review applicants, and manage hiring.", color: "bg-purple-500/10 text-purple-400" },
              { icon: FiAward, title: "Track Progress", desc: "Monitor applications, upload reports, and track completion.", color: "bg-amber-500/10 text-amber-400" },
            ].map(({ icon: Icon, title, desc, color }) => (
              <div
                key={title}
                className="bg-surface-800 border border-surface-600 rounded-xl p-6 hover:border-primary-500/30 hover:shadow-xl transition-all duration-200"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${color} mb-4`}>
                  <Icon size={22} />
                </div>
                <h3 className="font-semibold text-white mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Role Cards */}
      <section className="py-16 md:py-24 border-t border-surface-600">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-white">Built for every stakeholder</h2>
            <p className="mt-3 text-gray-500">
              Whether you are a student, company, or faculty - we have got you covered.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Students",
                desc: "Discover internships, apply seamlessly, and kickstart your career.",
                features: ["Smart recommendations", "Application tracking", "Resume upload", "Report submission"],
                border: "border-primary-500/30",
                btn: "from-primary-600 to-indigo-600 hover:from-primary-700 hover:to-indigo-700",
              },
              {
                title: "Companies",
                desc: "Access talented students, post internships, and streamline hiring.",
                features: ["Post internships", "Applicant management", "Status tracking", "Skills & resume view"],
                border: "border-green-500/30",
                btn: "from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700",
              },
              {
                title: "Faculty",
                desc: "Monitor student progress, review reports, and assign credits.",
                features: ["Progress monitoring", "Report review", "Credit assignment", "Student analytics"],
                border: "border-purple-500/30",
                btn: "from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700",
              },
            ].map(({ title, desc, features, border, btn }) => (
              <div key={title} className={`bg-surface-800 rounded-xl border ${border} p-7 hover:shadow-xl transition`}>
                <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
                <p className="text-sm text-gray-500 mb-5">{desc}</p>
                <ul className="space-y-2.5 mb-6">
                  {features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-400">
                      <FiCheckCircle className="text-green-400 shrink-0" size={15} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/register"
                  className={`inline-flex items-center gap-2 bg-gradient-to-r ${btn} text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition shadow-lg`}
                >
                  Join as {title}
                  <FiArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-primary-700 via-primary-600 to-indigo-600 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to launch your career?
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of students who have already found their dream internships.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 bg-white text-primary-700 px-8 py-3.5 rounded-lg font-bold hover:bg-gray-100 transition shadow"
            >
              Create Free Account
              <FiArrowRight />
            </Link>
            <Link
              to="/internships"
              className="inline-flex items-center gap-2 border-2 border-white/40 text-white px-8 py-3.5 rounded-lg font-bold hover:bg-white/10 transition"
            >
              Explore Internships
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-surface-600 pt-12 pb-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 pb-8 border-b border-surface-600">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-indigo-600 rounded flex items-center justify-center">
                  <FiBriefcase size={16} className="text-white" />
                </div>
                <span className="font-bold text-white">InternPortal</span>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">
                Connecting talent with opportunity. Bridging academia and industry.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-300 mb-3">Platform</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><Link to="/internships" className="hover:text-primary-400 transition">Browse Internships</Link></li>
                <li><Link to="/register" className="hover:text-primary-400 transition">Create Account</Link></li>
                <li><Link to="/login" className="hover:text-primary-400 transition">Sign In</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-300 mb-3">Users</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>Students</li>
                <li>Companies</li>
                <li>Faculty</li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-300 mb-3">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>support@internportal.com</li>
                <li>+91 98765 43210</li>
                <li>Bengaluru, India</li>
              </ul>
            </div>
          </div>
          <div className="pt-6 text-center text-sm text-gray-600">
            &copy; {new Date().getFullYear()} InternPortal. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;