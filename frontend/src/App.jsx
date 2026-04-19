import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Import your page components
import PicDashboard from './pages/pic/PicDashboard'; 
import StudentDashboard from './pages/student/StudentDashboard'; // <-- 1. IMPORT ADDED

import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Navigation Bar */}
        <nav style={{ padding: '1rem', background: '#0055a4', display: 'flex', gap: '20px' }}>
          <Link to="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Student Portal</Link>
          <Link to="/pic" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>PIC Admin</Link>
        </nav>

        {/* Page Routing */}
        <Routes>
          <Route path="/pic" element={<PicDashboard />} />
          
          {/* 2. ROUTE UPDATED TO SHOW YOUR NEW DASHBOARD */}
          <Route path="/" element={<StudentDashboard />} /> 
          
          <Route path="*" element={<h2>404: Page Not Found</h2>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
