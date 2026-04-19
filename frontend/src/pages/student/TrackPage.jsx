/**
* Placement and Internship Portal.
* File: TrackPage.jsx
* Description: Component for tracking the status of student applications.
*/
import React from 'react'
import { useApplications } from '../../hooks/useApplications';
import { useCompanies } from '../../hooks/useCompanies';
import { NavLink } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';

function TrackPage() {
  const {user} = useUser();
  const {applications, loading:applicationsLoading} = useApplications();
  const {companies, loading:companyLoading, error:companyError } = useCompanies();
  

  const appliedCompanies = companies.filter((company)=>(
    applications.some((app)=>app.companyId?._id===company._id || app.companyId === company._id)
  ));

  if (applicationsLoading || companyLoading) {
    return <div className='text-center py-8 text-gray-500 font-medium'>Loading your applications...</div>;
  }

  if (companyError) {
    return <div className='text-center py-8 text-red-500 font-medium'>Error loading tracking data.</div>;
  }

  return (
    <div className='max-w-7xl mx-auto py-8 px-6 lg:px-8 font-sans'>
      <div className='flex justify-between items-end border-b border-gray-200 pb-4 mb-8'>
        <h1 className='text-pip-dark text-4xl font-bold'>My Applications</h1>
        <h2 className='text-pip-dark text-sm font-bold bg-gray-100 px-4 py-2 rounded-full uppercase tracking-wider border-2 border-pip-dark'>Intern Season</h2>
      </div>

      {appliedCompanies.map((company, idx) => {
        return (
          <NavLink to={`/company-track/${user._id}/${company._id}`} key={company._id} className='bg-white shadow-sm border hover:cursor-pointer hover:bg-gray-200 border-gray-200 rounded-xl p-4 flex justify-between items-center gap-4 hover:shadow-md transition-all duration-300'>
            <div id="sno" className='bg-gray-100 text-gray-500 font-bold px-4 py-2 rounded-lg text-sm'>{idx + 1}.0</div>

            <div id="company-name-tags" className='flex flex-1 justify-between items-center bg-gray-50 py-2 px-4 rounded-lg border border-gray-100'>

              <p className='text-lg font-bold text-gray-900'>{company.companyName}</p>

              <div id="tags" className='flex gap-2'>

                <span className='bg-pip-border text-pip-dark px-3 py-1 rounded-full text-xs font-bold tracking-wide'>{company.role}</span>
                <span className='bg-blue-700 text-blue-100 px-3 py-1 rounded-full text-xs font-bold tracking-wide'>{company.season}</span>

              </div>
            </div>

          </NavLink>
        )
      })}
    </div>
  )
}

export default TrackPage