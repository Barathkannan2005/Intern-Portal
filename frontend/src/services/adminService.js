import API from "./api";

export const getStudents = () => API.get("/admin/students");
export const getCompanies = () => API.get("/admin/companies");
export const getInternships = () => API.get("/admin/internships");
export const verifyInternship = (internshipId) =>
  API.put(`/admin/internship/${internshipId}/verify`);
export const deleteUser = (userId) => API.delete(`/admin/user/${userId}`);
export const getAnalytics = () => API.get("/admin/analytics");
