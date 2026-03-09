import API from "./api";

export const getProfile = () => API.get("/company/profile");
export const updateProfile = (data) => API.put("/company/profile", data);
export const postInternship = (data) => API.post("/company/internship", data);
export const getMyInternships = () => API.get("/company/internships");
export const getApplicants = (internshipId) =>
  API.get(`/company/applicants/${internshipId}`);
export const updateApplicationStatus = (data) =>
  API.put("/company/application/status", data);
