import React from 'react'

function HomePage() {
  return (
    <div id='homepage-body' className='py-8 px-16'>
        {/* headers */}
        <div className='flex flex-col justify-center gap-4'>
            <h1 className='text-pip-dark text-5xl font-medium'>Welcome, UserName</h1>
            <p className='text-pip-dark text-sm font-mono'>Here's what's happening with your placements and internships</p>
        </div>

        {/* main content */}
        <div  className='grid lg:grid-cols-3 gap-6 mt-8'>
            {/* left side */}
            <div className='lg:col-span-2 flex flex-col gap-4'>

                
                <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                    <div className='bg-white shadow-sm border border-gray-200 rounded-xl p-6'>
                        <p className='text-gray-500 text-sm font-medium'>Applied</p>
                        <p className='text-3xl font-bold text-pip-dark mt-2'>0</p>
                    </div>
                    <div className='bg-white shadow-sm border border-gray-200 rounded-xl p-6'>
                        <p className='text-gray-500 text-sm font-medium'>Rejected</p>
                        <p className='text-3xl font-bold text-red-500 mt-2'>0</p>
                    </div>
                    <div className='bg-white shadow-sm border border-gray-200 rounded-xl p-6'>
                        <p className='text-gray-500 text-sm font-medium'>Current</p>
                        <p className='text-3xl font-bold text-green-500 mt-2'>0</p>
                    </div>
                </div>
                
                <div className='bg-white shadow-sm border border-gray-200 rounded-xl p-6 min-h-[300px]'>
                    <h2 className='text-xl font-bold text-gray-800 mb-4'>Active Applications</h2>
                    <div className='flex items-center justify-center h-48 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300'>
                        <p className='text-gray-400 font-medium'>Active applications will appear here</p>
                    </div>
                </div>
            </div>

            {/* right side */}

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