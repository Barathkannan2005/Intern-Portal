import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./components/DashboardLayout";

// Public pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import InternshipListings from "./pages/InternshipListings";
import RedirectToDashboard from "./components/RedirectToDashboard";

// Student pages
import StudentProfile from "./pages/student/StudentProfile";
import ApplyInternship from "./pages/student/ApplyInternship";
import ApplicationStatus from "./pages/student/ApplicationStatus";

// Company pages
import PostInternship from "./pages/company/PostInternship";
import ManageApplicants from "./pages/company/ManageApplicants";

// Faculty pages
import FacultyStudents from "./pages/faculty/FacultyStudents";
import FacultyReports from "./pages/faculty/FacultyReports";

// Admin pages
import UserManagement from "./pages/admin/UserManagement";
import Analytics from "./pages/admin/Analytics";

import {
  FiUser,
  FiSearch,
  FiFileText,
  FiPlusCircle,
  FiUsers,
  FiClipboard,
  FiBarChart2,
} from "react-icons/fi";

const studentLinks = [
  { to: "/student/dashboard", label: "Profile", icon: FiUser },
  { to: "/student/dashboard/apply", label: "Apply", icon: FiSearch },
  {
    to: "/student/dashboard/applications",
    label: "Applications",
    icon: FiFileText,
  },
];

const companyLinks = [
  { to: "/company/dashboard", label: "Post Internship", icon: FiPlusCircle },
  {
    to: "/company/dashboard/applicants",
    label: "Manage Applicants",
    icon: FiUsers,
  },
];

const facultyLinks = [
  { to: "/faculty/dashboard", label: "Students", icon: FiUsers },
  { to: "/faculty/dashboard/reports", label: "Reports", icon: FiClipboard },
];

const adminLinks = [
  { to: "/admin/dashboard", label: "User Management", icon: FiUsers },
  { to: "/admin/dashboard/analytics", label: "Analytics", icon: FiBarChart2 },
];

function App() {
  return (
    <AuthProvider>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Navbar />
        <Toaster position="top-right" />
        <Routes>
          {/* Public */}
          <Route path="/" element={<RedirectToDashboard />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/internships" element={<InternshipListings />} />

          {/* Student Dashboard */}
          <Route
            path="/student/dashboard"
            element={
              <ProtectedRoute roles={["student"]}>
                <DashboardLayout links={studentLinks} />
              </ProtectedRoute>
            }
          >
            <Route index element={<StudentProfile />} />
            <Route path="apply" element={<ApplyInternship />} />
            <Route path="applications" element={<ApplicationStatus />} />
          </Route>

          {/* Company Dashboard */}
          <Route
            path="/company/dashboard"
            element={
              <ProtectedRoute roles={["company"]}>
                <DashboardLayout links={companyLinks} />
              </ProtectedRoute>
            }
          >
            <Route index element={<PostInternship />} />
            <Route path="applicants" element={<ManageApplicants />} />
          </Route>

          {/* Faculty Dashboard */}
          <Route
            path="/faculty/dashboard"
            element={
              <ProtectedRoute roles={["faculty"]}>
                <DashboardLayout links={facultyLinks} />
              </ProtectedRoute>
            }
          >
            <Route index element={<FacultyStudents />} />
            <Route path="reports" element={<FacultyReports />} />
          </Route>

          {/* Admin Dashboard */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute roles={["admin"]}>
                <DashboardLayout links={adminLinks} />
              </ProtectedRoute>
            }
          >
            <Route index element={<UserManagement />} />
            <Route path="analytics" element={<Analytics />} />
          </Route>

          {/* 404 */}
          <Route
            path="*"
            element={
              <div className="text-center py-20">
                <h1 className="text-4xl font-bold text-gray-400">404</h1>
                <p className="text-gray-500 mt-2">Page not found</p>
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
