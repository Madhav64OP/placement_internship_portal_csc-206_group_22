import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
dotenv.config();

// 1. IMPORT ROUTES 
import applicationRoutes from './routes/applicationRoutes.js';
import companyRoutes from './routes/companyRoutes.js';
import userRoutes from './routes/userRoutes.js';

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