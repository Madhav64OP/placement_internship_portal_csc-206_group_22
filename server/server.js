const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

// 1. IMPORT ROUTES
const applicationRoutes = require('./routes/applicationRoutes'); 
const companyRoutes = require('./routes/companyRoutes'); 
const interviewRoutes = require('./routes/interviewRoutes'); // <--- 1. Added Interview Import

const app = express();

const PORT = process.env.PORT || 5000; 

connectDB();

// 2. MIDDLEWARES
app.use(cors());
app.use(express.json());

// 3. USE ROUTES
app.use('/api/applications', applicationRoutes);
app.use('/api/companies', companyRoutes); 
app.use('/api/interviews', interviewRoutes); // <--- 2. Added Interview Route Usage

app.get('/api/health', (req, res) => {
    res.json({ status: 'active', message: 'PIP Backend is running smoothly!' });
});

// 4. START SERVER
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});