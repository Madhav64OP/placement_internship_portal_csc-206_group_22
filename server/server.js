const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

// 1. IMPORT ROUTES
const applicationRoutes = require('./routes/applicationRoutes'); 
const companyRoutes = require('./routes/companyRoutes'); // <--- Added Company Import

const app = express();

const PORT = process.env.PORT || 5000; 

connectDB();

// 2. MIDDLEWARES
app.use(cors());
app.use(express.json());

// 3. USE ROUTES
app.use('/api/applications', applicationRoutes);
app.use('/api/companies', companyRoutes); // <--- Added Company Route Usage

app.get('/api/health', (req, res) => {
    res.json({ status: 'active', message: 'PIP Backend is running smoothly!' });
});

// 4. START SERVER
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});