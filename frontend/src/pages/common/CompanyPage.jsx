/**
* Placement and Internship Portal.
* File: CompanyPage.jsx
* Description: Component for displaying company-specific information and application details
*/
import { useParams } from 'react-router-dom'
import { useCompanyById } from '../../hooks/useCompanyById';
import { checkEligibility } from '../../utils/eligibility';
import { useUser } from '../../hooks/useUser';
import { useApplications } from '../../hooks/useApplications';
import { useState } from 'react';
import axios from 'axios';
import { usePopup } from '../../hooks/usePopup';
import Popup from './Popup';

function CompanyPage() {
    const { user } = useUser();
    const { companyId } = useParams();
    const { companyDetails, loading:companyLoading, error:companyError } = useCompanyById(companyId);
    const { isEligible } = checkEligibility(user, companyDetails);
    const {applications, refetchApps} = useApplications();
    const [isApplying, setisApplying] = useState(false);
    
    const {popup,showPopup,closePopup} = usePopup();

    if (companyLoading) return <div className="text-center py-12 font-medium text-gray-600">Loading details...</div>;
    if (companyError) return <div className="text-center py-12 font-medium text-red-500">{companyError}</div>;
    if (!companyDetails) return <div className="text-center py-12 font-medium text-gray-600">Company not found.</div>;

    const hasApplied = applications.some(app=>app.companyId?._id === companyId);

    const handleApply = async()=>{
        if(!user.resumeLink) {
            showPopup("Resume Required", "Please upload your resume in your profile before applying.", "error");
            return;
        }

        try {
            setisApplying(true);
            await axios.post(`/api/applications/apply`, {
                studentId: user._id,
                companyId: companyId,
                resumeLink: user.resumeLink
            });
            await refetchApps();
        } catch (error) {
            showPopup("Application Failed", error.response?.data?.message || "Failed to submit application. Please try again later.", "error");
        }finally{
            setisApplying(false);
        }
    }

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
                <div id='applypage-container-company' className='bg-white shadow-sm border border-gray-200 rounded-2xl p-6 lg:p-10 flex flex-col gap-8 w-full'>

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
                    {isEligible ?
                    !hasApplied ?
                        (<button className='bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg py-2 px-8 transition-colors duration-300 shadow-sm cursor-pointer w-32 text-center' onClick={handleApply} disabled={isApplying}>
                            {isApplying ? 'Submitting...' : 'Apply'}
                        </button>)
                        :
                        (<button className='bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg py-2 px-8 transition-colors duration-300 shadow-sm cursor-pointer w-32 text-center'>Applied</button>)
                    :
                    (
                        (<button className='bg-pip-error hover:bg-pip-error text-white font-semibold rounded-lg py-2 px-8 transition-colors duration-300 shadow-sm cursor-pointer w-32 text-center'>Not Eligible</button>)
                    )}
                    {/* <button className='bg-green-500 max-w-fit hover:bg-green-600 text-white font-semibold rounded-lg py-2 px-8 transition-colors duration-300 shadow-sm cursor-pointer'>Apply</button> */}
                </div>


            </div>
            {popup.isOpen && (
                <Popup
                    heading={popup.heading}
                    message={popup.message}
                    type={popup.type}
                    onClose={closePopup}
                />
            )}
        </div>
    )
}

export default CompanyPage