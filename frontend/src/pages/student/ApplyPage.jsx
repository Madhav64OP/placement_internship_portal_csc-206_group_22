import React from 'react'
import { NavLink } from 'react-router-dom'

function ApplyPage() {
  return (
    <div className='max-w-7xl mx-auto py-8 px-6 lg:px-8 font-sans'>
      <div className='flex justify-between items-end border-b border-gray-200 pb-4 mb-8'>
        <h1 className='text-pip-dark text-4xl font-bold'>Apply To Companies</h1>
        <h2 className='text-pip-dark text-sm font-bold bg-gray-100 px-4 py-2 rounded-full uppercase tracking-wider border-2 border-pip-dark'>Intern Season</h2>
      </div>

      <NavLink to='/company/Google' id='applypage-container-company' className='px-12 py-2'>
        <div id='applypage-company-google' className=' bg-white shadow-sm border hover:cursor-pointer hover:bg-gray-200 border-gray-200 rounded-xl p-4 flex justify-between items-center gap-4 hover:shadow-md transition-all duration-300'>

          <div id="sno" className='bg-gray-100 text-gray-500 font-bold px-4 py-2 rounded-lg text-sm'>1.0</div>

          <div id="company-name-tags" className='flex flex-1 justify-between items-center bg-gray-50 py-2 px-4 rounded-lg border border-gray-100'>

            <p className='text-lg font-bold text-gray-900'>Google</p>

            <div id="tags" className='flex gap-2'>

              <span className='bg-pip-border text-pip-dark px-3 py-1 rounded-full text-xs font-bold tracking-wide'>Software Engineer</span>
              <span className='bg-blue-700 text-blue-100 px-3 py-1 rounded-full text-xs font-bold tracking-wide'>Intern</span>

            </div>
          </div>

          <button id="apply-eligibility-btn" className='bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg py-2 px-8 transition-colors duration-300 shadow-sm cursor-pointer'>Apply</button>

        </div>
      </NavLink>
    </div>
  )
}

export default ApplyPage
