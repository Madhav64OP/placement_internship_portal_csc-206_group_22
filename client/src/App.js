import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';

function App() {
  const [serverStatus, setServerStatus] = useState('Checking connection to backend...');

  useEffect(() => {
    axios.get('http://localhost:5000/api/health')
      .then(response => setServerStatus(response.data.message))
      .catch(error => setServerStatus('Backend disconnected. Please start the server.'));
  }, []);

  return (
    <Router>
      <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '1200px', margin: '0 auto' }}>
        <header style={{ borderBottom: '2px solid #ccc', paddingBottom: '10px', marginBottom: '20px' }}>
          <h1>Placement and Internship Portal (PIP)</h1>
          <p>Backend Status: <strong style={{ color: serverStatus.includes('smoothly') ? 'green' : 'red' }}>{serverStatus}</strong></p>
        </header>
        
        <nav style={{ marginBottom: '30px', padding: '15px', backgroundColor: '#f4f4f9', borderRadius: '8px', display: 'flex', gap: '20px' }}>
          <Link to="/" style={{ textDecoration: 'none', color: '#0056b3', fontWeight: 'bold' }}>Login (Home)</Link>
          <Link to="/student" style={{ textDecoration: 'none', color: '#333' }}>Student Portal</Link>
          <Link to="/pic" style={{ textDecoration: 'none', color: '#333' }}>PIC Dashboard</Link>
          <Link to="/hr" style={{ textDecoration: 'none', color: '#333' }}>Company HR</Link>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={<h2>Welcome to PIP - Login placeholder</h2>} />
            <Route path="/student" element={<h2>Student Dashboard</h2>} />
            <Route path="/pic" element={<h2>PIC Dashboard</h2>} />
            <Route path="/hr" element={<h2>Company HR Dashboard</h2>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
