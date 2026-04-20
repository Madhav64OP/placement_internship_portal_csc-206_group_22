import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setUser }) => {
  const navigate = useNavigate();
  const [role, setRole] = useState('PIC_HEAD'); // Coordinator/Manager

  const handleLogin = () => {
    // Mimicking Channeli OAuth integration from your SRS [cite: 503, 604]
    const mockUser = { 
      name: role === 'PIC_HEAD' ? 'Head Coordinator' : 'Associate Team',
      role: role 
    };
    
    setUser(mockUser);

    // Navigate to the specific portal based on your DFD [cite: 163]
    if (role === 'PIC_HEAD') navigate('/pic-admin');
    else navigate('/associate-scan');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md border border-gray-100">
        <h2 className="text-3xl font-extrabold text-[#0055a4] text-center mb-8 italic">IITR PIP</h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Designation</label>
            <select 
              value={role} 
              onChange={(e) => setRole(e.target.value)}
              className="w-full border-2 border-gray-100 p-4 rounded-xl focus:border-blue-500 outline-none bg-gray-50 transition-all font-medium"
            >
              <option value="PIC_HEAD">PIC Head (Coordinator/Manager)</option>
              <option value="ASSOCIATE">Associate Coordinator (AC)</option>
            </select>
          </div>

          <button 
            onClick={handleLogin}
            className="w-full bg-[#0055a4] text-white font-bold py-4 rounded-xl hover:bg-blue-800 transform active:scale-95 transition-all shadow-lg shadow-blue-200"
          >
            Authenticate via Channeli
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;