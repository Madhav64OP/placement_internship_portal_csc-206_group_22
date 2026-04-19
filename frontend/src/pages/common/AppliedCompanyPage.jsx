import React from 'react'
import { useParams } from 'react-router-dom';
import { useCompanyById } from '../../hooks/useCompanyById';

function AppliedCompanyPage() {

    const { userId,companyId } = useParams();
    const { companyDetails, loading:companyLoading, error:companyError } = useCompanyById(companyId);

    if (companyLoading) return <div className="text-center py-12 font-medium text-gray-600">Loading details...</div>;
    if (companyError) return <div className="text-center py-12 font-medium text-red-500">{companyError}</div>;
    if (!companyDetails) return <div className="text-center py-12 font-medium text-gray-600">Company not found.</div>;

    return (
        <div className='max-w-7xl mx-auto py-8 px-6 lg:px-8 font-sans'>
                <div className='flex justify-between items-end border-b border-gray-200 pb-4 mb-8 '>
                    <h1 className='text-pip-dark text-4xl font-extrabold tracking-tight'>{companyDetails.companyName}</h1>
                    <div className='flex justify-center items-center gap-3'>
                        <h2 className='text-pip-bg text-sm font-bold bg-pip-dark px-4 py-1.5 rounded-full uppercase tracking-wider border border-blue-200'>{companyDetails.role}</h2>
                        <h2 className='text-pip-primary text-sm font-bold bg-blue-50 px-4 py-1.5 rounded-full uppercase tracking-wider border border-blue-200'>{companyDetails.season}</h2>
                    </div>
                </div>

                <div id="main-body" className='flex flex-col w-full'>
                    <div id='trackpage-container-company' className='bg-white shadow-sm border border-gray-200 rounded-2xl p-6 lg:p-10 flex flex-col gap-8 w-full'>

                        {/* Current Process */}
                        <div>
                            <div>this div will contain the heading and a tag of the current process, </div>
                            <div>Here we will render our component based on the status of the company, weather its ['Upcoming','PPT','OA','Interview','Completed'] , for interview we will develop a dynamic interview queue for now, for rest of the components coming soon or done </div>
                        </div>

                        <div id="upper-section" className='grid grid-cols-1 md:grid-cols-2 gap-8 w-full'>

                            <div id='eligibility' className='flex flex-col gap-4 bg-pip-dark p-6 rounded-xl border border-gray-100'>

                                <h2 className='text-xl font-bold text-pip-bg border-b border-gray-200 pb-2'>Eligibility</h2>

                                <div className='flex items-center flex-wrap gap-2'>
                                    <span className='text-sm text-pip-bg opacity-80'>Year:</span>
                                    {companyDetails.criteria.eligibleYears.map((year, idx) => (
                                        <span className='bg-pip-bg text-pip-dark px-3 py-1 rounded-full text-xs font-bold shadow-sm' key={idx}>
                                            {year}
                                        </span>
                                    ))}
                                </div>
                                <div className='flex items-center flex-wrap gap-2'>
                                    <span className='text-sm text-pip-bg opacity-80'>Branches:</span>
                                    {companyDetails.criteria.eligibleBranches.map((branch, idx) => (
                                        <span className='bg-pip-bg text-pip-dark px-3 py-1 rounded-full text-xs font-bold shadow-sm' key={idx}>
                                            {branch}
                                        </span>
                                    ))}
                                </div>
                                <div className='flex items-center flex-wrap gap-2'>
                                    <span className='text-sm text-pip-bg opacity-80'>CGPA:</span>
                                    <span className='bg-green-400 text-pip-dark px-3 py-1 rounded-full text-xs font-bold shadow-sm'>{companyDetails.criteria.minCGPA}</span>
                                </div>

                            </div>

                            <div id='second menu' className='flex flex-col gap-4 bg-pip-border p-6 rounded-xl border border-gray-100'>

                                <div className='flex items-center flex-wrap gap-2'>
                                    <span className='text-sm text-pip-dark font-medium'>Deadline:</span>
                                    <span className='bg-red-50 text-red-600 border border-red-200 px-3 py-1 rounded-full text-xs font-bold shadow-sm'>
                                        {new Date(companyDetails.deadline).toLocaleDateString('en-IN', {
                                            day: 'numeric',
                                            month: 'short',
                                            year: 'numeric'
                                        })}
                                    </span>
                                    <span className='bg-red-50 text-red-600 border border-red-200 px-3 py-1 rounded-full text-xs font-bold shadow-sm'>
                                        {Math.ceil((new Date(companyDetails.deadline) - new Date()) / (1000 * 60 * 60 * 24))} days left
                                    </span>
                                </div>

                                <div className='flex items-center flex-wrap gap-2'>
                                    <span className='text-sm text-pip-dark font-medium'>Process:</span>
                                    {companyDetails.process.map((stage, idx) => (
                                        <span className='bg-white text-gray-800 border border-gray-200 px-3 py-1 rounded-full text-xs font-bold shadow-sm' key={idx}>
                                            {stage}
                                        </span>
                                    ))}
                                </div>
                                <div className='flex items-center flex-wrap gap-2'>
                                    <span className='text-sm text-pip-dark font-medium'>Location:</span>
                                    {companyDetails.location.map((loc, idx) => (
                                        <span className='bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 rounded-full text-xs font-bold shadow-sm' key={idx}>
                                            <i className="fa-solid fa-location-dot mr-1"></i> {loc}
                                        </span>
                                    ))}
                                </div>
                                <div className='flex items-center flex-wrap gap-2'>
                                    <span className='text-sm text-pip-dark font-medium'>Stipend:</span>
                                    <span className='bg-green-400 text-pip-dark px-3 py-1 rounded-full text-xs font-bold shadow-sm'>{companyDetails.stipend}</span>
                                </div>
                            </div>

                        </div>


                        <div id="lower-section" className='w-full pt-8 border-t border-gray-200 mt-2'>

                            <div id="job-description" className='flex flex-col gap-4'>

                                <h2 className='text-2xl font-bold text-gray-900'>Job Description</h2>
                                <p className='text-base leading-relaxed text-gray-700 bg-gray-50 p-6 rounded-xl border border-gray-100'>{companyDetails.jobDescription}</p>

                            </div>

                        </div>
                        
                    </div>


                </div>
            </div>
    )
}

export default AppliedCompanyPage