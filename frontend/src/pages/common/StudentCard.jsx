import React from 'react'

function StudentCard({ student, isCurrentUser, position }) {
    return (
        <div className={`flex flex-col items-center justify-center min-w-[140px] h-[150px] p-4 rounded-xl border-2 transition-all flex-shrink-0 shadow-sm relative
            ${isCurrentUser ? 'bg-green-50 border-green-500 ring-2 ring-green-100' : 'bg-white border-gray-200 hover:bg-gray-100'}`}
        >
            <div className={`absolute -top-3 -right-3 h-8 w-8 flex items-center justify-center rounded-full text-sm font-bold shadow-sm
                ${isCurrentUser ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600 border border-gray-300'}`}
            >
                {position}
            </div>

            <i className={`fa-solid fa-user text-4xl mb-3 
            ${isCurrentUser ? 'text-green-600' : 'text-gray-400'}`}
            ></i>

            <p className={`font-bold text-sm text-center px-1 truncate w-full 
                ${isCurrentUser ? 'text-green-900' : 'text-gray-700'}`}
            >
                {isCurrentUser ? student.name : 'Anonymous'}
            </p>

            {!isCurrentUser ? (
                <p className="text-xs text-gray-400 font-medium mt-1 uppercase tracking-wider">Candidate</p>
                ) : (
                <p className="text-xs text-green-700 font-extrabold mt-1 uppercase tracking-wider">You</p>
            )}
        </div>
    )
}

export default StudentCard