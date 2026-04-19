/**
* Placement and Internship Portal.
* File: ApplyPage.jsx
* Description: Component for displaying list of companies available for application and allowing students to apply
*/


import React from 'react'
import { NavLink } from 'react-router-dom'
import { useCompanies } from '../../hooks/useCompanies'
import { checkEligibility } from '../../utils/eligibility';
import { useUser } from '../../hooks/useUser';
import { useApplications } from '../../hooks/useApplications';


function ApplyPage() {

  const {user,loading:userLoading,error:userError} = useUser();
  const {companies, loading:companyLoading, error:companyError } = useCompanies();
  const {applications, loading:applicationsLoading} = useApplications();

  if (userLoading || companyLoading || applicationsLoading) {
    return <div className='text-center py-8'>Loading...</div>
  }

  if (userError || companyError) {
    return <div className='text-center py-8 text-red-500'>Error: {userError || companyError}</div>
  }

  return (
    <div className='max-w-7xl mx-auto py-8 px-6 lg:px-8 font-sans'>
      <div className='flex justify-between items-end border-b border-gray-200 pb-4 mb-8'>
        <h1 className='text-pip-dark text-4xl font-bold'>Apply To Companies</h1>
        <h2 className='text-pip-dark text-sm font-bold bg-gray-100 px-4 py-2 rounded-full uppercase tracking-wider border-2 border-pip-dark'>My Season - {user?.mySeason ? `${user.mySeason} ` : ''}</h2>
      </div>

      {/* <NavLink to={`/company-apply/$`} id='applypage-container-company' className='px-12 py-2'> */}
      {/* // for now we will use a dummy list for companies  */}
      {companies.map((company, idx) => {
        const { isEligible } = checkEligibility(user, company);

        const hasApplied = applications.some(app=>app.companyId?._id === company._id);

        return (
          <NavLink to={`/company-apply/${company._id}`} key={company._id} className='bg-white shadow-sm border hover:cursor-pointer hover:bg-gray-200 border-gray-200 rounded-xl p-4 flex justify-between items-center gap-4 hover:shadow-md transition-all duration-300'>
            <div id="sno" className='bg-gray-100 text-gray-500 font-bold px-4 py-2 rounded-lg text-sm'>{idx + 1}.0</div>

            <div id="company-name-tags" className='flex flex-1 justify-between items-center bg-gray-50 py-2 px-4 rounded-lg border border-gray-100'>

              <p className='text-lg font-bold text-gray-900'>{company.companyName}</p>

              <div id="tags" className='flex gap-2'>

                <span className='bg-pip-border text-pip-dark px-3 py-1 rounded-full text-xs font-bold tracking-wide'>{company.role}</span>
                <span className='bg-blue-700 text-blue-100 px-3 py-1 rounded-full text-xs font-bold tracking-wide'>{company.season}</span>

              </div>
            </div>
            {isEligible ?
              !hasApplied ?
                (<NavLink to={`/company-apply/${company._id}`} className='bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg py-2 px-8 transition-colors duration-300 shadow-sm cursor-pointer h-12 w-32 text-center'>Apply</NavLink>)
                :
                (<NavLink to={`/company-apply/${company._id}`} className='bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg py-2 px-8 transition-colors duration-300 shadow-sm cursor-pointer w-32 text-center'>Applied</NavLink>)
              :
              (
                (<NavLink to={`/company-apply/${company._id}`} className='bg-pip-error hover:bg-pip-error text-white font-semibold rounded-lg py-2 px-8 transition-colors duration-300 text-xs shadow-sm cursor-pointer h-12 w-32 text-center'>Not Eligible</NavLink>)
              )}

          </NavLink>
        )
      })}
    </div>
  )
}

export default ApplyPage
