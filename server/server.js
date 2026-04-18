const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

// 1. IMPORT ROUTES
const applicationRoutes = require('./routes/applicationRoutes'); 
const companyRoutes = require('./routes/companyRoutes'); 
const userRoutes = require('./routes/userRoutes');

const app = express();

const PORT = process.env.PORT || 5000; 

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/applications', applicationRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/users', userRoutes);

app.get('/api/health', (req, res) => {
    res.json({ status: 'active', message: 'PIP Backend is running smoothly!' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});