import API from "./api";

export const getStudents = () => API.get("/faculty/students");
export const getStudentProgress = (studentId) =>
  API.get(`/faculty/student/${studentId}/progress`);
export const getReports = () => API.get("/faculty/reports");
export const approveReport = (reportId, data) =>
  API.put(`/faculty/report/${reportId}/approve`, data);
export const rejectReport = (reportId, data) =>
  API.put(`/faculty/report/${reportId}/reject`, data);
