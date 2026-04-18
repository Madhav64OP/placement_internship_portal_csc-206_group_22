import axios from 'axios';

// Creating a central instance so we don't repeat the URL everywhere
const API = axios.create({
    baseURL: 'http://localhost:5000/api', 
});

// Company related API calls
export const fetchCompanies = () => API.get('/companies');
export const postCompany = (companyData) => API.post('/companies', companyData);

// Application related API calls
export const applyToCompany = (applicationData) => API.post('/applications/apply', applicationData);
export const getStudentApps = (studentId) => API.get(`/applications/student/${studentId}`);

export default API;