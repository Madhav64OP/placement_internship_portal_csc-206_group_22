/**
* Placement and Internship Portal.
* File: ProfilePage.jsx
* Description: Component for displaying student profile information and allowing edits
*/
import React, { useState } from 'react'

function ProfilePage() {
  // We will add a meathod to fetch student details, or get it from global state
  const [user, setUser] = useState({
    name: 'John Price',
    email: 'captainprice@abc.com',
    phoneNo: '+yz-xxx xxx xxxx',
    rollNumber: '210123456',
    branchName: 'Computer Science and Engineering',
    program: 'B.Tech',
    branchTag: 'CSE',
    year: '4th Year',
    cgpa: 9.2,
    resumeURL: '',
    photoURL: '',
  })

  const [resumeLink, setResumeLink] = useState(user.resumeURL);

  const handleSave = () => {
    setUser({...user,resumeURL: resumeLink});
    // setResumeLink(resumeLink);
    setEditMode(false);
  }

  const handleCancel = () => {
    setResumeLink(user.resumeURL);
    setEditMode(false);
  }

  const [editMode, setEditMode] = useState(false);

  return (
    <div className='max-w-4xl mx-auto py-8 px-6 lg:px-8 font-sans'>
      <div className='bg-white shadow-sm border border-gray-200 rounded-2xl p-6 lg:p-10 flex flex-col gap-8'>
        <div id="upper-part" className='flex justify-between items-center border-b border-gray-200 pb-8'>

          <div className='flex flex-col gap-1.5'>
            <h1 className='text-3xl font-extrabold text-pip-dark tracking-tight'>{user.name}</h1>
            <h1 className='text-lg font-medium text-gray-600'>{user.program} {user.branchName}</h1>
          </div>

          <div className='h-24 w-24 rounded-full bg-pip-bg border-4 border-gray-50 shadow-sm flex items-center justify-center overflow-hidden text-pip-primary text-4xl flex-shrink-0 '>
            {user.photoURL ? (
              <img className='h-full w-full object-cover' src={user.photoURL} alt="Profile" />
            ) : (
              <i className="fas fa-user"></i>
            )}
          </div>

        </div>

        <div id="lower-part" className='flex flex-col gap-6'>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-xl border border-gray-100'>
            <p className='text-base font-semibold text-gray-800'>Email: <span className='text-sm text-gray-500 font-normal block mb-1'>{user.email}</span></p>
            <p className='text-base font-semibold text-gray-800'>Phone: <span className='text-sm text-gray-500 font-normal block mb-1'>{user.phoneNo}</span></p>
            <p className='text-base font-semibold text-gray-800'>Roll Number: {user.rollNumber}</p>
            <p className='text-base font-semibold text-gray-800'>Year: {user.year}</p>
            <p className='text-base font-semibold text-gray-800'>CGPA: {user.cgpa}</p>
          </div>

          <div className='flex flex-col gap-3 bg-gray-50 p-6 rounded-xl border border-gray-100'>
            <h2 className='text-lg font-bold text-gray-900 border-b border-gray-200 pb-2'>Resume</h2>
            {user.resumeLink ? (
              <a href={user.resumeURL} target="_blank" rel="noopener noreferrer" className='text-pip-primary font-semibold hover:text-pip-primary-hover hover:underline transition-colors inline-flex items-center gap-2'>View Resume</a>
            ) : (
              <p className='text-gray-500 font-medium italic'>No resume uploaded</p>
            )}
            {editMode ? (
              <button className='self-start bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg py-2 px-6 transition-colors duration-300 shadow-sm'>Save Changes</button>
            ) : (
              <button className='self-start bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg py-2 px-6 transition-colors duration-300 shadow-sm' onClick={() => setEditMode(true)}>
                Edit Resume
              </button>
            )}
          </div>

        </div>
      </div>

    </div>
  )
}

export default ProfilePage