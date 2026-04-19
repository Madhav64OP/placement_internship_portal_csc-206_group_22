import React, { useState, useEffect } from 'react';

const StudentDashboard = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    loadCompanies();
  }, []);

  const loadCompanies = async () => {
    // 🛑 TEMPORARY MOCK DATA 
    // We are skipping the backend fetch for now so you can see your UI!
    const mockData = [
      { _id: '1', companyName: 'NatWest', roles: ['SDE Intern', 'Analyst'], criteria: { minCGPA: 7.5 } },
      { _id: '2', companyName: 'Google', roles: ['SWE Intern'], criteria: { minCGPA: 8.0 } },
      { _id: '3', companyName: 'Microsoft', roles: ['Data Scientist'], criteria: { minCGPA: 7.8 } }
    ];
    setCompanies(mockData);
  };

  const handleApply = (companyName) => {
    alert(`Application started for ${companyName}! (Backend connection pending)`);
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-800 border-b-2 pb-2 mb-6">
        Student Portal - Open Opportunities
      </h1>
      
      {companies.length === 0 ? (
        <p className="text-gray-600 text-lg">No companies are currently hiring. Check back later!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {companies.map((company) => (
            <div key={company._id} className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm hover:shadow-md transition">
              <h2 className="text-2xl font-bold text-gray-800 mb-3">{company.companyName}</h2>
              
              <div className="text-gray-600 mb-4">
                <p><strong className="text-gray-700">Roles:</strong> {company.roles.join(', ')}</p>
                <p><strong className="text-gray-700">Min CGPA:</strong> {company.criteria?.minCGPA || 'N/A'}</p>
              </div>
              
              <button 
                onClick={() => handleApply(company.companyName)}
                className="w-full bg-green-600 text-white font-semibold py-2 px-4 rounded hover:bg-green-700 transition"
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