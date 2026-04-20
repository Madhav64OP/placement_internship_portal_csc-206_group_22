import React, { useState } from 'react';
import AdminQueueDemo from './AdminQueueDemo';
import { useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../../hooks/useUser';
import { useNavigate } from 'react-router-dom';

const PicHeadDashboard = () => {
  const { logout } = useUser();
  const [activeTab, setActiveTab] = useState('master-list');
  const [cgpaFilter, setCgpaFilter] = useState(0);

  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [loadingStudents, setLoadingStudents] = useState(true);

  const [logs, setLogs] = useState([
    { id: 1, type: 'TEST_LINK', target: '23112040', status: 'READ', time: '10:15 AM' },
    { id: 2, type: 'QUEUE_UPDATE', target: '23112015', status: 'UNREAD', time: '10:30 AM' },
    { id: 3, type: 'SHORTLIST_RESULT', target: 'ALL_CSE', status: 'FAILED', time: '11:00 AM' },
  ]);

  const [notifyTarget, setNotifyTarget] = useState('ALL');
  const [notifyType, setNotifyType] = useState('QUEUE_UPDATE');
  const [notifyStatus, setNotifyStatus] = useState('idle'); // idle, sending, sent

  const calculatePriority = (shortlistCount) => (5 - shortlistCount) + 1;
  const clashCount = students.filter(s => s.hasClash).length;
  const filteredStudents = students.filter(s => s.cgpa >= cgpaFilter);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users');
        if (response.data.success) {
          const formattedStudents = response.data.data.map(s => ({
            _id: s._id,
            id: s.rollNumber || s._id.substring(s._id.length - 8),
            name: s.name,
            branch: s.branchName || 'N/A',
            cgpa: s.cgpa || 0,
            shortlists: 0,
            hasClash: false
          }));
          setStudents(formattedStudents);
        }
      } catch (error) {
        console.error("Failed to fetch student master list:", error);
      } finally {
        setLoadingStudents(false);
      }
    };
    
    fetchStudents();
  }, []);

  // NOTIFICATION DISPATCHER (Process 4.0)
  const handleDispatch = () => {
    setNotifyStatus('sending');
    setTimeout(() => {
      // Simulate DB write and async dispatch
      const newLog = {
        id: Date.now(),
        type: notifyType,
        target: notifyTarget === 'ALL' ? 'ALL_STUDENTS' : notifyTarget,
        status: 'UNREAD',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setLogs([newLog, ...logs]);
      setNotifyStatus('sent');
      setTimeout(() => setNotifyStatus('idle'), 3000);
    }, 1200);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-pip-bg p-8 font-sans">

      <div className="max-w-7xl mx-auto mb-8 flex font-sans justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-pip-dark tracking-tight">PIC HEAD PORTAL</h1>
          <p className="text-slate-500 font-medium">Placement & Internship Cell | Management Commands</p>
        </div>
        <div className="flex items-center gap-4">
            {clashCount > 0 && (
            <div className="bg-orange-50 border border-orange-200 px-4 py-2 rounded-xl flex items-center gap-3 shadow-sm">
                <div className="h-2 w-2 bg-orange-500 rounded-full animate-pulse"></div>
                <span className="text-orange-800 text-sm font-bold">{clashCount} CLASHES DETECTED</span>
            </div>
            )}
            
            {/* LOGOUT BUTTON ADDED HERE */}
            <button 
                onClick={handleLogout}
                className="bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 font-bold py-2 px-4 rounded-xl transition-colors border border-red-200 shadow-sm cursor-pointer flex items-center gap-2"
            >
                <i className="fa-solid fa-right-from-bracket"></i> Logout
            </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mb-6 flex gap-2">
        <button onClick={() => setActiveTab('master-list')} className={`px-6 py-2 rounded-lg font-bold transition ${activeTab === 'master-list' ? 'bg-pip-primary text-white shadow-lg' : 'bg-white text-pip-text-dim border border-slate-200 hover:bg-slate-50'}`}>Student Master & Filtering</button>
        <button onClick={() => setActiveTab('queue')} className={`px-6 py-2 rounded-lg font-bold transition ${activeTab === 'queue' ? 'bg-pip-primary text-white shadow-lg' : 'bg-white  border text-pip-text-dim border-slate-200 hover:bg-slate-50'}`}>Dynamic Interview Queue</button>
        <button onClick={() => setActiveTab('notify')} className={`px-6 py-2 rounded-lg font-bold transition ${activeTab === 'notify' ? 'bg-pip-primary text-white shadow-lg' : 'bg-white text-pip-text-dim border border-slate-200 hover:bg-slate-50'}`}>Notification Command Center</button>
      </div>

      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden min-h-[600px]">
        
        {/* PROCESS 1.0: MASTER LIST (Same as before) */}
        {activeTab === 'master-list' && (
           <div className="p-8">
            <h2 className="text-xl font-bold text-pip-dark mb-6">Process 1.0: Master List Validation</h2>
            <p className="text-slate-500">Student filtering table goes here...</p>
          </div>
        )}

        {activeTab === 'master-list' && (
           <div className="p-8">
            <h2 className="text-xl font-bold text-pip-dark mb-6">Process 1.0: Master List Validation</h2>
            
            {loadingStudents ? (
               <div className="text-slate-500 font-medium">Loading student records...</div>
            ) : (
               <div className="overflow-x-auto">
                 {/* Quick simple map to visualize the fetched students */}
                 <table className="min-w-full text-left text-sm whitespace-nowrap">
                   <thead className="uppercase tracking-wider border-b-2 border-slate-200 bg-slate-50">
                     <tr>
                       <th scope="col" className="px-6 py-4">Enrollment ID</th>
                       <th scope="col" className="px-6 py-4">Name</th>
                       <th scope="col" className="px-6 py-4">Branch</th>
                       <th scope="col" className="px-6 py-4">CGPA</th>
                     </tr>
                   </thead>
                   <tbody>
                     {filteredStudents.map(student => (
                       <tr key={student._id} className="border-b border-slate-100 hover:bg-slate-50">
                         <td className="px-6 py-4 font-mono text-slate-600">{student.id}</td>
                         <td className="px-6 py-4 font-bold text-pip-dark">{student.name}</td>
                         <td className="px-6 py-4 text-slate-600">{student.branch}</td>
                         <td className="px-6 py-4 font-medium text-green-700">{student.cgpa}</td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
                 {filteredStudents.length === 0 && <p className="mt-4 text-slate-500">No students match current criteria.</p>}
               </div>
            )}
          </div>
        )}

        {/* PROCESS 3.0: DYNAMIC QUEUE (Same as before) */}
        {activeTab === 'queue' && (
           <div className="p-8 bg-slate-50 min-h-full">
            {/* ... (Keep your existing Queue JSX here) ... */}
            <h2 className="text-xl font-bold text-pip-dark mb-6">Process 3.0: Conflict Position & Queue Management</h2>
           <AdminQueueDemo/>
          </div>
        )}

        {/* PROCESS 4.0 & 5.0: NOTIFICATION SYSTEM */}
        {activeTab === 'notify' && (
          <div className="flex min-h-[600px]">
            {/* DISPATCHER (Left Column) */}
            <div className="w-1/2 p-8 border-r border-slate-100">
              <h2 className="text-xl font-bold text-pip-dark mb-6">Process 4.0: Event Dispatcher</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-500 mb-2 uppercase">Action Type</label>
                  <select 
                    value={notifyType} 
                    onChange={(e) => setNotifyType(e.target.value)}
                    className="w-full border-2 border-slate-100 p-3 rounded-xl focus:border-blue-500 outline-none font-bold text-slate-700"
                  >
                    <option value="TEST_LINK">TEST_LINK (Auto-resolve template)</option>
                    <option value="QUEUE_UPDATE">QUEUE_UPDATE (Auto-resolve template)</option>
                    <option value="SHORTLIST_RESULT">SHORTLIST_RESULT (Auto-resolve template)</option>
                    <option value="CUSTOM_ALERT">CUSTOM_ALERT (Manual entry)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-500 mb-2 uppercase">Target Student(s)</label>
                  <select 
                    value={notifyTarget} 
                    onChange={(e) => setNotifyTarget(e.target.value)}
                    className="w-full border-2 border-slate-100 p-3 rounded-xl focus:border-blue-500 outline-none font-bold text-slate-700"
                  >
                    <option value="ALL">Broadcast: All Active Students</option>
                    {students.map(s => <option key={s.id} value={s.id}>{s.name} ({s.id})</option>)}
                  </select>
                </div>

                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-2 h-full bg-pip-primary"></div>
                  <p className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">Template Preview</p>
                  <p className="text-slate-700 font-mono text-sm leading-relaxed">
                    [System_Variable_Name], <br/>
                    A {notifyType} event has been triggered for your profile. Please check your student portal immediately for further instructions.
                  </p>
                </div>

                <button 
                  onClick={handleDispatch}
                  disabled={notifyStatus !== 'idle'}
                  className={`w-full font-bold py-4 rounded-xl transition shadow-lg ${notifyStatus === 'sending' ? 'bg-blue-300 text-blue-800' : notifyStatus === 'sent' ? 'bg-green-500 text-white shadow-green-200' : 'bg-pip-primary hover:bg-blue-800 text-white shadow-blue-200'}`}
                >
                  {notifyStatus === 'sending' ? 'Dispatching to Portal...' : notifyStatus === 'sent' ? '✓ Dispatch Successful' : 'Trigger Notification'}
                </button>
              </div>
            </div>

            {/* STATUS TRACKER (Right Column) */}
            <div className="w-1/2 p-8 bg-slate-50">
              <h2 className="text-xl font-bold text-pip-dark mb-6 flex justify-between items-center">
                <span>Process 5.0: Status Tracker</span>
                <span className="text-xs bg-slate-200 text-slate-600 px-2 py-1 rounded font-mono">Live Logs</span>
              </h2>

              <div className="space-y-3">
                {logs.map((log) => (
                  <div key={log.id} className="bg-white p-4 rounded-xl border border-slate-200 flex justify-between items-center shadow-sm">
                    <div>
                      <p className="font-bold text-slate-700 text-sm">{log.type}</p>
                      <p className="text-xs font-mono text-slate-400 mt-1">Target: {log.target} • {log.time}</p>
                    </div>
                    <div>
                      {log.status === 'READ' && <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full border border-green-200">READ ✓</span>}
                      {log.status === 'UNREAD' && <span className="bg-blue-50 text-blue-600 text-xs font-bold px-3 py-1 rounded-full border border-blue-200">UNREAD</span>}
                      {log.status === 'FAILED' && <span className="bg-red-50 text-red-600 text-xs font-bold px-3 py-1 rounded-full border border-red-200">FAILED ✕</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default PicHeadDashboard;