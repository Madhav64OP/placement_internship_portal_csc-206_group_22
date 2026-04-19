/**
* Placement and Internship Portal.
* File: ProfilePage.jsx
* Description: Component for displaying student profile information and allowing edits
*/
import React, { useEffect, useState } from 'react'
import { useUser } from '../../hooks/useUser';
import axios from 'axios';

function ProfilePage() {
  // We will add a meathod to fetch student details, or get it from global state
  const { user, loading, error, setUser } = useUser();
  const [resumeLink, setResumeLink] = useState('');
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (user?.resumeLink) {
      setResumeLink(user.resumeLink)
    }
  }, [user])

  const handleSave = async() => {
    try {
      await axios.put(`/api/users/${user.id}`, {
        resumeLink
      });
      setUser({ ...user, resumeLink });
      setEditMode(false);
    } catch (error) {
      console.error(`Failed to update resume - ${error}`);
    }
  }

  const handleCancel = () => {
    setResumeLink(user.resumeLink || '');
    setEditMode(false);
  }

  if (loading) return <div className='text-center py-12 font-medium text-gray-600'>Loading profile...</div>;
  if (error) return <div className='text-center py-12 font-medium text-red-500'>{error}</div>;
  if (!user) return <div className='text-center py-12 font-medium text-gray-600'>User not found.</div>;


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
              <a
                href={user.resumeLink}
                target="_blank"
                rel="noopener noreferrer"
                className='text-pip-primary font-semibold hover:underline'
              >
                View Resume
              </a>
            ) : (
              <p className='text-gray-500 italic'>No resume uploaded</p>
            )}
            {editMode ? (
              <div className='flex flex-col gap-3'>
                <input
                  type="text"
                  value={resumeLink}
                  onChange={(e) => setResumeLink(e.target.value)}
                  placeholder="Paste resume link (Drive / PDF URL)"
                  className='border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400'
                />

                <div className='flex gap-3'>
                  <button
                    onClick={handleSave}
                    className='bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg py-2 px-4'
                  >
                    Save
                  </button>

                  <button
                    onClick={handleCancel}
                    className='bg-gray-400 hover:bg-gray-500 text-white font-semibold rounded-lg py-2 px-4'
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setEditMode(true)}
                className='self-start bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg py-2 px-6'
              >
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