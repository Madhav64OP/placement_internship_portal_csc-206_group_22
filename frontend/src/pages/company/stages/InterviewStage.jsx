import React, { useEffect, useState } from 'react'
import StudentCard from '../../common/StudentCard'
import { useUser } from '../../../hooks/useUser';
import { useParams } from 'react-router-dom';
import {io} from 'socket.io-client'

const socket = io(import.meta.env.VITE_BACKEND);

function InterviewStage({ currentApplication }) {
  const { user } = useUser();
  const {companyId} = useParams();

  const [cooldown, setCooldown] = useState(0);
  const [liveQueue, setLiveQueue] = useState([]);

  const isProcessOver = currentApplication?.status === "Rejected" ||currentApplication?.status === "Selected";

  useEffect(()=>{
    socket.emit('trigger_algorithm');

    socket.on('queue_updated',(allQueues)=>{
      if (allQueues[companyId]) {
          setLiveQueue(allQueues[companyId]);
      }
    });

    return ()=>{
      socket.off('queue_updated');
    };
  },[companyId]);

  const handleShiftRequest = () =>{ 
    setCooldown(1800);
    socket.emit('request_shift', { studentId: user._id, companyId: companyId });
  }

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  const formatCooldown = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  if (isProcessOver) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-10 text-center flex flex-col items-center justify-center gap-4">
        <i className="fa-solid fa-flag-checkered text-5xl text-gray-400"></i>
        <h2 className="text-2xl font-bold text-gray-800">Your Process is Over</h2>
        <p className="text-gray-600 font-medium">All the best for your other processes.</p>
      </div>
    )
  }

  const myIndex = liveQueue.findIndex(s=>s.id===user?._id);
  const estimatedWait = myIndex!==-1 ? (myIndex*25) : 0;

  return (
    <div className="flex flex-col gap-6 w-full fade-in">

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-blue-50 border border-blue-100 p-5 rounded-xl gap-4">
        <div>
          <h1 className="text-xl font-bold text-pip-dark flex items-center gap-3">
            {myIndex!==-1 ? `Your turn will be in: ~${estimatedWait} mins` : 'Calculating your turn...'}
            <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider animate-pulse flex items-center gap-1.5">
              <div className="w-2 h-2 bg-red-600 rounded-full"></div> Live
            </span>
          </h1>
        </div>
        <div className="md:text-right">
          <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">My Progress</p>
          <p className="font-bold text-gray-900 bg-white px-4 py-1 rounded-lg border border-blue-200 mt-1 inline-block">
            Round {currentApplication?.currentRound || 1}
          </p>
        </div>
      </div>

      <div id="main-box" className="flex items-center gap-4 overflow-x-auto py-6 px-4 bg-gray-50 border border-gray-200 rounded-xl custom-scrollbar shadow-inner">

        <div className="flex flex-col items-center justify-center min-w-[150px] h-[160px] bg-pip-dark text-white rounded-xl shadow-lg border-2 border-pip-primary relative">
          <i className="fa-solid fa-user-tie text-5xl mb-2"></i>
          <h3 className="font-bold text-lg tracking-wide">Interviewer</h3>
          <p className="text-xs text-blue-200 font-medium mt-1">In Session <i className="fa-solid fa-spinner fa-spin ml-1"></i></p>
        </div>

        <div className="text-gray-300 px-2 flex-shrink-0">
          <i className="fa-solid fa-arrow-right-long text-3xl"></i>
        </div>

        {liveQueue.map((student, idx) => (
          <React.Fragment key={student.id}>
            <StudentCard 
              student={student}
              position={idx + 1}
              // isCurrentUser={student.id === user?._id}
              isCurrentUser={true}
            />

            {idx < liveQueue.length - 1 && (
              <div className="text-gray-300 px-2 flex-shrink-0">
                <i className="fa-solid fa-arrow-right-long text-xl"></i>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>


      <div className="flex justify-start">
        <button
          onClick={handleShiftRequest}
          disabled={cooldown > 0}
          className={`px-6 py-3 rounded-xl font-bold text-sm shadow-sm transition-all flex items-center gap-2
            ${cooldown > 0
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed border border-gray-300'
              : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-pip-primary hover:text-pip-primary'
            }`}
        >
          <i className="fa-solid fa-clock-rotate-left"></i>
          {cooldown > 0 ? `Queue Shift Requested (Cooldown: ${formatCooldown(cooldown)})` : 'Request Queue Shift'}
        </button>
      </div>

    </div>
  )
}

export default InterviewStage