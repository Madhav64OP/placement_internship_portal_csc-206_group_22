import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';

const socket = io(import.meta.env.VITE_BACKEND || "http://localhost:5000");

function AdminQueueDemo() {
    const { companyId } = useParams();
    const [liveQueue, setLiveQueue] = useState([]);

    useEffect(() => {
        socket.emit('trigger_algorithm');

        socket.on('queue_updated', (allQueues) => {
            if (allQueues[companyId]) {
                setLiveQueue(allQueues[companyId]);
            } else {
                setLiveQueue([]);
            }
        });

        return () => socket.off('queue_updated');
    }, [companyId]);

    const handleProcessCandidate = (applicationId, action) => {
        socket.emit('update_student_status', {
            applicationId: applicationId,
            action: action
        });
    };

    return (
        <div className="p-8 max-w-5xl mx-auto font-sans fade-in">
            <div className="mb-8 border-b pb-4 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-800">PIC Admin Control Room</h1>
                    <p className="text-gray-500 mt-1">Live Queue Management Interface</p>
                </div>
                <div className="bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider flex items-center gap-2 animate-pulse">
                    <div className="w-3 h-3 bg-red-600 rounded-full"></div> Live System Active
                </div>
            </div>

            <div className="bg-white shadow-lg rounded-2xl border border-gray-200 overflow-hidden">
                <div className="bg-pip-dark text-white p-4 font-bold text-lg flex justify-between">
                    <span>Interviewing Queue</span>
                    <span>Total Waiting: {liveQueue.length}</span>
                </div>
                
                <div className="p-0">
                    {liveQueue.length === 0 ? (
                        <p className="p-8 text-center text-gray-500 font-medium">No candidates in queue.</p>
                    ) : (
                        <ul className="divide-y divide-gray-100">
                            {liveQueue.map((student, idx) => (
                                <li key={student.id} className={`p-4 flex items-center justify-between hover:bg-gray-50 transition-colors
                                    ${idx === 0 ? 'bg-blue-50 border-l-4 border-blue-500' : ''}`}>
                                    
                                    <div className="flex items-center gap-4">
                                        <div className={`h-10 w-10 flex items-center justify-center rounded-full font-bold text-white
                                            ${idx === 0 ? 'bg-blue-600' : 'bg-gray-400'}`}>
                                            {idx + 1}
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-800 text-lg">{student.name}</p>
                                            <p className="text-sm text-gray-500">
                                                CGPA: {student.cgpa} • App ID: <span className="font-mono text-xs">{student.appId.slice(-6)}</span>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        {idx === 0 && (
                                            <span className="mr-4 text-blue-600 font-bold flex items-center gap-2">
                                                <i className="fa-solid fa-microphone-lines"></i> In Interview
                                            </span>
                                        )}
                                        <button 
                                            onClick={() => handleProcessCandidate(student.appId, 'Pass')}
                                            className="bg-green-100 text-green-700 hover:bg-green-200 font-bold py-2 px-4 rounded-lg transition-colors text-sm"
                                        >
                                            <i className="fa-solid fa-check mr-1"></i> Pass to Next Round
                                        </button>
                                        <button 
                                            onClick={() => handleProcessCandidate(student.appId, 'Select')}
                                            className="bg-pip-primary text-white hover:bg-blue-700 font-bold py-2 px-4 rounded-lg transition-colors text-sm ml-2"
                                        >
                                            <i className="fa-solid fa-trophy mr-1"></i> Final Hire
                                        </button>
                                        <button 
                                            onClick={() => handleProcessCandidate(student.appId, 'Reject')}
                                            className="bg-red-100 text-red-700 hover:bg-red-200 font-bold py-2 px-4 rounded-lg transition-colors text-sm ml-2"
                                        >
                                            <i className="fa-solid fa-xmark mr-1"></i> Reject
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AdminQueueDemo;