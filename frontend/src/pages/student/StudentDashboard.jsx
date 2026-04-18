import React, { useState, useEffect } from 'react';
import API, { fetchCompanies, applyToCompany } from '../../services/api';

const StudentDashboard = () => {
  const [companies, setCompanies] = useState([]);
  const dummyStudentId = "60d5ecb8b392d700153ef123"; // We will replace this with real login IDs later!

  useEffect(() => {
    loadCompanies();
  }, []);

  const loadCompanies = async () => {
    try {
      const response = await fetchCompanies();
      setCompanies(response.data);
    } catch (error) {
      console.error("Failed to load companies", error);
    }
  };

  const handleApply = async (companyId) => {
    try {
      // In a real app, you'd get the resume link from a file upload or user profile
      const applicationData = {
        studentId: dummyStudentId,
        companyId: companyId,
        resumeLink: "https://drive.google.com/dummy-resume-link" 
      };
      
      await applyToCompany(applicationData);
      alert("Application submitted successfully!");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to apply.");
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: 'auto' }}>
      <h1 style={{ color: '#0055a4', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>
        Student Portal - Open Opportunities
      </h1>
      
      {companies.length === 0 ? (
        <p>No companies are currently hiring. Check back later!</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
          {companies.map((company) => (
            <div key={company._id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', background: 'white' }}>
              <h2 style={{ margin: '0 0 10px 0', color: '#333' }}>{company.companyName}</h2>
              <p><strong>Roles:</strong> {company.roles.join(', ')}</p>
              <p><strong>Min CGPA:</strong> {company.criteria?.minCGPA || 'N/A'}</p>
              
              <button 
                onClick={() => handleApply(company._id)}
                style={{ background: '#28a745', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', marginTop: '10px' }}
              >
                Apply Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;