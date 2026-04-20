import React, { useState } from 'react';
import { useUser } from '../../hooks/useUser';
import { useNavigate } from 'react-router-dom';

const AssociatePortal = () => {
  const { logout } = useUser();
  const navigate = useNavigate();
  const [scanStatus, setScanStatus] = useState('idle'); // idle, scanning, success, error
  const [errorMessage, setErrorMessage] = useState('');
  const [studentData, setStudentData] = useState(null);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  const handleSimulateScan = (scenario) => {
    setScanStatus('scanning');
    
    setTimeout(() => {
      if (scenario === 'valid') {
        setStudentData({ id: '23112040', name: 'Gourab Gupta', venue: 'LHC-102' });
        setScanStatus('success');
      } else if (scenario === 'duplicate') {
        setErrorMessage('Duplicate Scan: Attendance already marked');
        setScanStatus('error');
      } else {
        setErrorMessage('Invalid QR Code or wrong Test Venue');
        setScanStatus('error');
      }
    }, 1500);
  };

  const resetScanner = () => {
    setScanStatus('idle');
    setStudentData(null);
    setErrorMessage('');
  };

  return (
    <div className="min-h-screen bg-pip-bg p-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl">
        
        
        <div className="bg-pip-dark p-6 text-center text-white">
          <h1 className="text-2xl font-black tracking-wide">SCANNER NODE</h1>
          <p className="text-sm font-medium opacity-80 mt-1">Associate Coordinator Access</p>
          <div className="mt-4 inline-block bg-pip-primary px-3 py-1 rounded-full text-xs font-mono">
            VENUE: LHC-102 | TEST: NATWEST_SDE
          </div>
        </div>

        <button 
            onClick={handleLogout}
            className="absolute top-4 right-4 bg-pip-primary hover:bg-blue-900 text-white text-xs font-bold py-2 px-3 rounded-lg transition-colors border border-blue-700 shadow-sm flex items-center gap-2 cursor-pointer"
          >
            <i className="fa-solid fa-right-from-bracket"></i> Logout
          </button>

        {/* SCANNER INTERFACE */}
        <div className="p-8 flex flex-col items-center">
          
          {scanStatus === 'idle' && (
            <div className="w-64 h-64 border-4 border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center bg-slate-50 relative overflow-hidden">
              {/* Animated scanning line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-blue-400 opacity-50 animate-[ping_2s_ease-in-out_infinite]"></div>
              <span className="text-6xl mb-4">📷</span>
              <p className="text-slate-500 font-bold text-sm">Awaiting QR Token...</p>
            </div>
          )}

          {scanStatus === 'scanning' && (
            <div className="w-64 h-64 border-4 border-blue-500 rounded-2xl flex flex-col items-center justify-center bg-blue-50">
              <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-blue-800 font-bold text-sm">Processing Payload...</p>
            </div>
          )}

          {scanStatus === 'success' && (
            <div className="w-64 h-64 border-4 border-green-500 rounded-2xl flex flex-col items-center justify-center bg-green-50 text-center p-4">
              <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center text-3xl font-bold mb-4">✓</div>
              <p className="text-pip-success font-black text-lg">ACCESS GRANTED</p>
              <p className="text-green-700 font-medium text-sm mt-1">{studentData.name}</p>
              <p className="text-green-600 font-mono text-xs">{studentData.id}</p>
              <p className="text-[10px] text-green-500 mt-2 uppercase font-bold">Link Dispatched to Student Portal</p>
            </div>
          )}

          {scanStatus === 'error' && (
            <div className="w-64 h-64 border-4 border-red-500 rounded-2xl flex flex-col items-center justify-center bg-red-50 text-center p-4">
              <div className="w-16 h-16 bg-red-500 text-white rounded-full flex items-center justify-center text-3xl font-bold mb-4">✕</div>
              <p className="text-pip-error font-black text-lg">ACCESS DENIED</p>
              <p className="text-red-600 font-medium text-xs mt-2">{errorMessage}</p>
            </div>
          )}

          {/* SIMULATION CONTROLS */}
          <div className="mt-8 w-full border-t pt-6">
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-3 text-center">Test Scenarios</p>
            <div className="grid grid-cols-1 gap-2">
              <button 
                onClick={() => handleSimulateScan('valid')}
                disabled={scanStatus === 'scanning'}
                className="bg-slate-100 text-slate-700 font-bold py-2 rounded-lg hover:bg-slate-200 text-sm border border-slate-200"
              >
                Trigger: Valid QR Code
              </button>
              <button 
                onClick={() => handleSimulateScan('duplicate')}
                disabled={scanStatus === 'scanning'}
                className="bg-slate-100 text-slate-700 font-bold py-2 rounded-lg hover:bg-slate-200 text-sm border border-slate-200"
              >
                Trigger: Duplicate Scan
              </button>
              <button 
                onClick={() => handleSimulateScan('invalid')}
                disabled={scanStatus === 'scanning'}
                className="bg-slate-100 text-slate-700 font-bold py-2 rounded-lg hover:bg-slate-200 text-sm border border-slate-200"
              >
                Trigger: Invalid Venue/Code
              </button>
            </div>
            
            {scanStatus !== 'idle' && scanStatus !== 'scanning' && (
              <button 
                onClick={resetScanner}
                className="mt-4 w-full bg-pip-bg text-white font-bold py-3 rounded-lg hover:bg-slate-800 shadow-md"
              >
                Ready for Next Scan
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default AssociatePortal;