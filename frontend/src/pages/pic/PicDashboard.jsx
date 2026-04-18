import React, { useState } from 'react';
import { postCompany } from '../../services/api'; // Adjust path if needed

const PicDashboard = () => {
  const [companyData, setCompanyData] = useState({
    companyName: '',
    jobDescription: '',
    roles: '',
    minCGPA: ''
  });

  const handlePost = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = {
        ...companyData,
        roles: companyData.roles.split(',').map(role => role.trim())
      };
      await postCompany(dataToSend);
      alert("Job Posting Successful!");
      setCompanyData({ companyName: '', jobDescription: '', roles: '', minCGPA: '' });
    } catch (err) {
      alert("Error posting job. Check console.");
      console.error(err);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ color: '#0055a4' }}>PIC Admin Portal</h1>
      <div style={{ maxWidth: '500px', background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
        <h3>Post New Opportunity</h3>
        <form onSubmit={handlePost} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input 
            type="text" placeholder="Company Name" 
            value={companyData.companyName}
            onChange={(e) => setCompanyData({...companyData, companyName: e.target.value})}
            required 
          />
          <textarea 
            placeholder="Job Description" 
            value={companyData.jobDescription}
            onChange={(e) => setCompanyData({...companyData, jobDescription: e.target.value})}
          />
          <input 
            type="text" placeholder="Roles (e.g. SDE, Analyst)" 
            value={companyData.roles}
            onChange={(e) => setCompanyData({...companyData, roles: e.target.value})}
          />
          <input 
            type="number" step="0.1" placeholder="Minimum CGPA" 
            value={companyData.minCGPA}
            onChange={(e) => setCompanyData({...companyData, minCGPA: e.target.value})}
          />
          <button type="submit" style={{ background: '#0055a4', color: 'white', border: 'none', padding: '10px', cursor: 'pointer' }}>
            Publish to Student Portal
          </button>
        </form>
      </div>
    </div>
  );
};

export default PicDashboard;