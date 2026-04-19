import React from 'react'

function Popup({ heading, message, onClose, type = 'info' }) {
    const isError = type === 'error';

    return (
        // Body at the center of the page with a slight dark overlay 
        <div className='fixed inset-0 z-50 flex justify-center items-center bg-gray-900/40 backdrop-blur-sm px-4'>

            {/* Body */}

            <div className='flex flex-col bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 gap-2'>

                <div className='flex justify-end items-center w-full'>
                    {/* Cross Button */}
                    <button className='text-gray-400 hover:text-gray-700 transition-colors cursor-pointer' onClick={onClose}>
                        <i className='fa-solid fa-xmark text-xl'></i>
                    </button>
                </div>

                <div className='flex flex-col items-center text-center gap-2 pb-4'>
                    <h2 className={`text-2xl font-bold ${isError ? 'text-red-600' : 'text-green-600'}`}>{heading}</h2>
                    <p className='text-gray-600 text-base leading-relaxed'>{message}</p>
                </div>
            </div>
        </div>
    )
}

export default Popup