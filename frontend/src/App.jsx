import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import all your pages
import Login from './pages/Login';
import PicHeadDashboard from './pages/pic/PicHeadDashboard';
import AssociatePortal from './pages/pic/AssociatePortal';
// If you have a Student Dashboard, import it here:
// import StudentDashboard from './pages/student/StudentDashboard';

function App() {
  // Global state to track who is logged in and what their role is
  const [user, setUser] = useState(null); 

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        
        {/* Dynamic Navigation Bar based on Role */}
        {user && (
          <nav className="bg-[#0055a4] text-white p-4 shadow-md flex justify-between items-center px-10">
            <div className="font-bold text-lg tracking-wider">IITR PIP</div>
            <div className="flex gap-6 items-center">
              <span className="text-sm font-medium opacity-80">Logged in as: {user.name}</span>
              <button 
                onClick={() => setUser(null)}
                className="bg-blue-800 px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-900 transition"
              >
                Logout
              </button>
            </div>
          </nav>
        )}

        <Routes>
          {/* Public Login Route */}
          <Route path="/login" element={<Login setUser={setUser} />} />

          {/* Protected Route: PIC HEAD ONLY */}
          <Route 
            path="/pic-admin" 
            element={user?.role === 'PIC_HEAD' ? <PicHeadDashboard /> : <Navigate to="/login" />} 
          />

          {/* Protected Route: ASSOCIATE ONLY */}
          <Route 
            path="/associate-scan" 
            element={user?.role === 'ASSOCIATE' ? <AssociatePortal /> : <Navigate to="/login" />} 
          />

          {/* Default Route: Redirects everything to Login if not authenticated */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
