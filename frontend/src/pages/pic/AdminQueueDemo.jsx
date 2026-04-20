import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { useCompanies } from '../../hooks/useCompanies';
import { use } from 'react';

const socket = io(import.meta.env.VITE_BACKEND || "http://localhost:5000");

function AdminQueueDemo() {
    const [selectedCompanyId, setSelectedCompanyId] = useState('');
    
    const [liveQueue, setLiveQueue] = useState([]);
    const navigate = useNavigate();

    const { companies, loading: companiesLoading } = useCompanies();

    const interviewingCompanies = companies?.filter(comp => comp.currentStage === 'Interview') || [];

    useEffect(() => {
        socket.emit('trigger_algorithm');

        socket.on('queue_updated', (allQueues) => {
            if (selectedCompanyId && allQueues[selectedCompanyId]) {
                setLiveQueue(allQueues[selectedCompanyId]);
            } 
            else {
                setLiveQueue([]);
            }
        });

        return () => socket.off('queue_updated');
    }, [selectedCompanyId]);

    const handleProcessCandidate = (applicationId, action) => {
        socket.emit('update_student_status', {
            applicationId: applicationId,
            action: action
        });
    };

    const handleCompanySwitch = (e) => {
        setSelectedCompanyId(e.target.value);
    }


    return (
        <div className="p-8 max-w-5xl mx-auto font-sans fade-in">
            {!companiesLoading && interviewingCompanies.length > 0 && (
                <select
                    value={selectedCompanyId || ''}
                    onChange={handleCompanySwitch}
                    className="bg-white border-2 border-gray-300 text-gray-700 font-bold py-2 px-4 rounded-xl shadow-sm focus:outline-none focus:border-pip-primary focus:ring-1 focus:ring-pip-dark transition-colors cursor-pointer w-64 my-3"
                >
                    <option value="" disabled>Select a Company...</option>
                    {interviewingCompanies.map((comp) => (
                        <option key={comp._id} value={comp._id}>
                            {comp.companyName} ({comp.role})
                        </option>
                    ))}
                </select>
            )}

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
                                            className="bg-green-100 text-green-700 hover:bg-green-200 font-bold py-2 px-4 rounded-lg transition-colors text-sm hover:cursor-pointer"
                                        >
                                            <i className="fa-solid fa-check mr-1"></i> Pass to Next Round
                                        </button>
                                        <button
                                            onClick={() => handleProcessCandidate(student.appId, 'Select')}
                                            className="bg-pip-primary text-white hover:bg-blue-900 font-bold py-2 px-4 rounded-lg transition-colors text-sm ml-2 hover:cursor-pointer "
                                        >
                                            <i className="fa-solid fa-trophy mr-1"></i> Final Hire
                                        </button>
                                        <button
                                            onClick={() => handleProcessCandidate(student.appId, 'Reject')}
                                            className="bg-red-100 text-red-700 hover:bg-red-200 font-bold py-2 px-4 rounded-lg transition-colors text-sm ml-2 hover:cursor-pointer "
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