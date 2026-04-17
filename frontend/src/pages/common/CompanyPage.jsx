import React from 'react'
import { useParams } from 'react-router-dom'

function CompanyPage() {
    const { companyName } = useParams()

    return (
        <div className='max-w-7xl mx-auto py-8 px-6 lg:px-8 font-sans'>
            <div className='flex justify-between items-end border-b border-gray-200 pb-4 mb-8'>
                <h1 className='text-pip-dark text-4xl font-extrabold tracking-tight'>{companyName}</h1>
                <h2 className='text-pip-primary text-sm font-bold bg-blue-50 px-4 py-1.5 rounded-full uppercase tracking-wider border border-blue-200'>Internship</h2>
            </div>

            <div id="main-body" className='flex flex-col w-full'>
                <div id='applypage-container-company' className='bg-white shadow-sm border border-gray-200 rounded-2xl p-6 lg:p-10 flex flex-col gap-8 w-full'>

                    <div id="upper-section" className='grid grid-cols-1 md:grid-cols-2 gap-8 w-full'>

                        <div id='eligibility' className='flex flex-col gap-4 bg-pip-dark p-6 rounded-xl border border-gray-100'>

                            <h2 className='text-xl font-bold text-pip-bg border-b border-gray-200 pb-2'>Eligibility</h2>

                            <div className='flex items-center flex-wrap gap-2'>
                                <span className='text-sm text-pip-bg opacity-80'>Year:</span>
                                {/* <span className='bg-pip-bg text-pip-dark px-3 py-1 rounded-full text-xs font-bold shadow-sm'>2nd</span> */}
                                <span className='bg-pip-bg text-pip-dark px-3 py-1 rounded-full text-xs font-bold shadow-sm'>3rd</span>
                                {/* <span className='bg-pip-bg text-pip-dark px-3 py-1 rounded-full text-xs font-bold shadow-sm'>4th</span> */}
                            </div>
                            <div className='flex items-center flex-wrap gap-2'>
                                <span className='text-sm text-pip-bg opacity-80'>Branches:</span>
                                <span className='bg-pip-bg text-pip-dark px-3 py-1 rounded-full text-xs font-bold shadow-sm'>CSE</span>
                                <span className='bg-pip-bg text-pip-dark px-3 py-1 rounded-full text-xs font-bold shadow-sm'>ECE</span>
                                <span className='bg-pip-bg text-pip-dark px-3 py-1 rounded-full text-xs font-bold shadow-sm'>CH</span>
                                <span className='bg-pip-bg text-pip-dark px-3 py-1 rounded-full text-xs font-bold shadow-sm'>MT</span>
                                <span className='bg-pip-bg text-pip-dark px-3 py-1 rounded-full text-xs font-bold shadow-sm'>GT</span>
                                <span className='bg-pip-bg text-pip-dark px-3 py-1 rounded-full text-xs font-bold shadow-sm'>GPT</span>
                            </div>
                            <div className='flex items-center flex-wrap gap-2'>
                                <span className='text-sm text-pip-bg opacity-80'>CGPA:</span>
                                <span className='bg-green-400 text-pip-dark px-3 py-1 rounded-full text-xs font-bold shadow-sm'>8.0+</span>
                            </div>

                        </div>

                        <div id='second menu' className='flex flex-col gap-4 bg-pip-border p-6 rounded-xl border border-gray-100'>

                            <div className='flex items-center flex-wrap gap-2'>
                                <span className='text-sm text-pip-dark font-medium'>Deadline:</span>
                                <span className='bg-red-50 text-red-600 border border-red-200 px-3 py-1 rounded-full text-xs font-bold shadow-sm'>
                                    30th Sep 2024
                                </span>
                            </div>

                            <div className='flex items-center flex-wrap gap-2'>
                                <span className='text-sm text-pip-dark font-medium'>Process:</span>
                                <span className='bg-white text-gray-800 border border-gray-200 px-3 py-1 rounded-full text-xs font-bold shadow-sm'>Online Test</span>
                                <span className='bg-white text-gray-800 border border-gray-200 px-3 py-1 rounded-full text-xs font-bold shadow-sm'>Tech Interview</span>
                                <span className='bg-white text-gray-800 border border-gray-200 px-3 py-1 rounded-full text-xs font-bold shadow-sm'>HR Interview</span>
                            </div>
                            <div className='flex items-center flex-wrap gap-2'>
                                <span className='text-sm text-pip-dark font-medium'>Location:</span>
                                <span className='bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 rounded-full text-xs font-bold shadow-sm'>
                                    <i className="fa-solid fa-location-dot mr-1"></i> Bangalore
                                </span>
                                <span className='bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 rounded-full text-xs font-bold shadow-sm'>
                                    <i className="fa-solid fa-location-dot mr-1"></i> New Delhi
                                </span>
                                <span className='bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 rounded-full text-xs font-bold shadow-sm'>
                                    <i className="fa-solid fa-location-dot mr-1"></i> Mumbai
                                </span>
                            </div>
                            <div className='flex items-center flex-wrap gap-2'>
                                <span className='text-sm text-pip-dark font-medium'>Stripend:</span>
                                <span className='bg-green-400 text-pip-dark px-3 py-1 rounded-full text-xs font-bold shadow-sm'>₹80,000</span>
                            </div>
                        </div>

                    </div>


                    <div id="lower-section" className='w-full pt-8 border-t border-gray-200 mt-2'>

                        <div id="job-description" className='flex flex-col gap-4'>

                            <h2 className='text-2xl font-bold text-gray-900'>Job Description</h2>
                            <p className='text-base leading-relaxed text-gray-700 bg-gray-50 p-6 rounded-xl border border-gray-100'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>

                        </div>

                    </div>
                <button className='bg-green-500 max-w-fit hover:bg-green-600 text-white font-semibold rounded-lg py-2 px-8 transition-colors duration-300 shadow-sm cursor-pointer'>Apply</button>
                </div>


            </div>

        </div>
    )
}

export default CompanyPage