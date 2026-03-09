import API from "./api";

export const getProfile = () => API.get("/student/profile");
export const updateProfile = (data) => API.put("/student/profile", data);
export const uploadResume = (formData) =>
  API.post("/student/resume", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const getInternships = (params) =>
  API.get("/student/internships", { params });
export const applyForInternship = (internshipId, data) =>
  API.post(`/student/apply/${internshipId}`, data);
export const getApplications = () => API.get("/student/applications");
export const uploadReport = (formData) =>
  API.post("/student/report", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const uploadCertificate = (formData) =>
  API.post("/student/certificate", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const getRecommendations = () => API.get("/student/recommendations");
