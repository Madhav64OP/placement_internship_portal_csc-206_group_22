import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api', 
});

export const fetchCompanies = () => API.get('/companies');
export const postCompany = (companyData) => API.post('/companies', companyData);


export const applyToCompany = (applicationData) => API.post('/applications/apply', applicationData);
export const getStudentApps = (studentId) => API.get(`/applications/student/${studentId}`);

export default API;