import React from 'react'
import { useParams } from 'react-router-dom'

function CompanyPage() {
  const { companyName } = useParams()

  return (
    <div className='max-w-7xl mx-auto py-8 px-6 lg:px-8 font-sans'>
      <div className='flex justify-between items-end pb-4 mb-8'>
        <h1 className='text-pip-dark text-4xl font-bold'>{companyName}</h1>
        <h2 className='text-pip-dark text-xs font-bold bg-gray-100 px-4 py-2 rounded-full uppercase tracking-wider border-2 border-pip-dark'>Internship</h2>
      </div>

        <div id="main-body" className='flex-col justify-center items-center'>
            <div id='applypage-container-company' className='px-12 py-2 flex justify-between items-center'>
                <div id='eligibility'>
                    <h2 className='text-lg font-bold text-gray-900 mb-4'>Eligibility</h2>
                    <div id="year">
                        <p className='text-gray-700'>Year: 2024</p>
                    </div>
                    <div id="branches">
                        <p className='text-gray-700'>Branches: Computer Science, Information Technology</p>
                    </div>
                    <div id="cgpa">
                        <p className='text-gray-700'>Minimum CGPA and above: 8.0</p>
                    </div>
                </div>
                <div id='second menu'>
                    <div id="deadline">
                        <p className='text-gray-700'>Application Deadline: 30th September 2024</p>
                    </div>
                    <div id="selection-process">
                        <p className='text-gray-700'>Selection Process: Online Test, Technical Interview, HR Interview</p>
                    </div>
                    <div id="other-details">
                        <p className='text-gray-700'>Location : Bangalore</p>
                    </div>
                </div>
        
            <div id="job-description">
                <h2 className='text-lg font-bold text-gray-900 mb-4'>Job Description</h2>
                <p className='text-gray-700'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </div>
        </div>
        
      </div>
    </div>
  )
}

export default CompanyPage