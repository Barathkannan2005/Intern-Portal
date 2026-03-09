import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Home from "../pages/Home";

const dashMap = {
  student: "/student/dashboard",
  company: "/company/dashboard",
  faculty: "/faculty/dashboard",
  admin: "/admin/dashboard",
};

const RedirectToDashboard = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (user) {
    return <Navigate to={dashMap[user.role] || "/home"} replace />;
  }

  return <Home />;
};

export default RedirectToDashboard;
