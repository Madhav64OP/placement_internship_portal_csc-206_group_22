import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Import your page components (ensure these paths match your friend's folders)
import PicDashboard from './pages/pic/PicDashboard'; 

// Import CSS
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Simple Navigation for now */}
        <nav style={{ padding: '1rem', background: '#0055a4', color: 'white', display: 'flex', gap: '20px' }}>
          <Link to="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Student Portal</Link>
          <Link to="/pic" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>PIC Admin</Link>
        </nav>

        <Routes>
          {/* 1. PIC DASHBOARD ROUTE */}
          <Route path="/pic" element={<PicDashboard />} />

          {/* 2. STUDENT DASHBOARD (Home) */}
          <Route path="/" element={
            <section id="center">
              <h1>IITR Placement & Internship Portal</h1>
              <p>Welcome to the central hub for recruitment at IIT Roorkee.</p>
              <div className="status-card">
                <h3>Student Status</h3>
                <p>Please navigate to a company page to apply.</p>
              </div>
            </section>
          } />

          {/* 3. CATCH-ALL ERROR PAGE */}
          <Route path="*" element={<h2>404: Page Not Found</h2>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
