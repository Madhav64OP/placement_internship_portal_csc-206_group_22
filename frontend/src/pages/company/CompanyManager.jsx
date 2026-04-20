import React, { useState } from 'react';

const CompanyManager = () => {
  const [companies, setCompanies] = useState([
    { id: 1, name: 'NatWest', role: 'SDE Intern', cutoff: 7.5, status: 'Active' },
    { id: 2, name: 'Google', role: 'SWE Intern', cutoff: 8.5, status: 'Active' },
  ]);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">Company Management</h1>
            <p className="text-gray-500">Add and manage visiting recruiters.</p>
          </div>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200">
            + Add New Company
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {companies.map((co) => (
            <div key={co.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-gray-800">{co.name}</h3>
                <p className="text-sm text-gray-500">{co.role}</p>
                <div className="mt-2 flex items-center gap-4">
                  <span className="text-xs font-bold px-2 py-1 bg-blue-100 text-blue-700 rounded uppercase">
                    Cutoff: {co.cutoff}
                  </span>
                  <span className="text-xs font-bold px-2 py-1 bg-green-100 text-green-700 rounded uppercase">
                    {co.status}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 text-gray-400 hover:text-blue-600 transition">Edit</button>
                <button className="p-2 text-gray-400 hover:text-red-600 transition">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompanyManager;