/**
* Placement and Internship Portal.
* File: HomePage.jsx
* Description: Main landing page for students after login, showing an overview of their application status, notifications, and blogs
*/
import React from 'react'
import { useUser } from '../../hooks/useUser';
import { useApplications } from '../../hooks/useApplications';
import { NavLink } from 'react-router-dom';

function HomePage() {
    const { user, loading: userLoading, error: userError } = useUser();
    const { applications, loading: appsLoading } = useApplications();
    const totalApplied = applications.length;
    const rejectedCount = applications.filter(app=>app.status==='Rejected').length;

    const activeApplications = applications.filter(app=>['Applied', 'Shortlisted', 'Waitlist'].includes(app.status));
    const activeCount =activeApplications.length;

    if (userLoading || appsLoading) return <div className='text-center py-12 text-gray-500 font-medium'>Loading your dashboard...</div>;
    if (userError) return <div className='text-center py-12 text-red-500 font-medium'>Error: {userError}</div>;
    if (!user) return <div className='text-center py-12 text-gray-500 font-medium'>Please log in to view your dashboard.</div>;

    return (
        <div id='homepage-body' className='py-8 px-16'>
            <div className='flex flex-col justify-center gap-4'>
                <h1 className='text-pip-dark text-5xl font-medium'>Welcome, {user.name.split(' ')[0]}</h1>
                <p className='text-pip-dark text-sm font-mono'>Here's what's happening with your {user.mySeason?.toLowerCase() || 'carrer'} drive</p>
            </div>

            <div  className='grid lg:grid-cols-3 gap-6 mt-8'>
                <div className='lg:col-span-2 flex flex-col gap-4'>

                    <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                        <div className='bg-white shadow-sm border border-gray-200 rounded-xl p-6'>
                            <p className='text-gray-500 text-sm font-medium'>Applied</p>
                            <p className='text-3xl font-bold text-pip-dark mt-2'>{totalApplied}</p>
                        </div>
                        <div className='bg-white shadow-sm border border-gray-200 rounded-xl p-6'>
                            <p className='text-gray-500 text-sm font-medium'>Rejected</p>
                            <p className='text-3xl font-bold text-red-500 mt-2'>{rejectedCount}</p>
                        </div>
                        <div className='bg-white shadow-sm border border-gray-200 rounded-xl p-6'>
                            <p className='text-gray-500 text-sm font-medium'>Current</p>
                            <p className='text-3xl font-bold text-green-500 mt-2'>{activeCount}</p>
                        </div>
                    </div>
                    
                    <div className='bg-white shadow-sm border border-gray-200 rounded-xl p-6 min-h-[300px]'>
                        <div className='flex flex-col justify-start items-start mb-6'>
                            <h2 className='text-xl font-bold text-gray-800 mb-4'>Active Applications</h2>
                            <NavLink to="/track" className="text-sm font-bold text-pip-primary hover:text-pip-primary-hover">View All <i className="fa-solid fa-arrow-right ml-1"></i></NavLink>
                        </div>

                        <div className='flex flex-col gap-4'>
                            {activeApplications.length === 0 ? (
                                <div className='flex items-center justify-center h-48 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300'>
                                    <p className='text-gray-500 font-medium'>No active applications currently.</p>
                                </div>
                            ) : (
                                activeApplications.slice(0, 4).map((app) => ( 
                                    <NavLink to={`/company-track/${user._id}/${app.companyId?._id}`} key={app._id} className='flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:bg-gray-200 hover:cursor-pointer transition-colors'>
                                        <div>
                                            <p className='font-bold text-gray-900 text-lg'>
                                                {app.companyId?.companyName || 'Unknown Company'}
                                            </p>
                                            <p className='text-sm text-gray-500 mt-0.5'>
                                                Company Stage: <span className="font-semibold text-gray-700">{app.companyId?.currentStage || 'Upcoming'}</span>
                                            </p>
                                        </div>
                                        <div className='flex flex-col items-end gap-2'>
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider
                                                ${app.status === 'Applied' ? 'bg-yellow-100 text-yellow-800' : ''}
                                                ${app.status === 'Shortlisted' ? 'bg-green-100 text-green-800' : ''}
                                                ${app.status === 'Waitlist' ? 'bg-orange-100 text-orange-800' : ''}
                                            `}>
                                                {app.status}
                                            </span>
                                        </div>
                                    </NavLink>
                                ))
                            )}
                        </div>
                    </div>
                </div>



                <div className='flex flex-col gap-6'>
                    
                    <div className='bg-pip-dark text-pip-bg shadow-sm rounded-xl p-6 min-h-[200px]'>
                        <h2 className='text-lg font-bold text-pip-bg mb-4'>Notifications</h2>
                        <p className='text-sm opacity-80'>No new updates.</p>
                    </div>
                    
                    <div className='bg-white shadow-sm border border-gray-200 rounded-xl p-6 min-h-[200px]'>
                        <h2 className='text-lg font-bold text-gray-800 mb-4'>Blogs</h2>
                        <p className='text-sm text-gray-500'>Recent experiences will show here.</p>
                    </div>
                    
                </div>  
            </div>
            

        </div>
    )
}

export default HomePage