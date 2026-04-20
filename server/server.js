import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import applicationRoutes from './routes/applicationRoutes.js';
import companyRoutes from './routes/companyRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { Server } from 'socket.io';
import {createServer} from 'http'

dotenv.config();
import { initializeSocketEvents } from './services/dynamicQueue.js';
const app = express();
const PORT = process.env.PORT || 5000; 

connectDB();

app.use(cors());
app.use(express.json());

const httpServer = createServer(app)
const io = new Server(httpServer,{
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
})

initializeSocketEvents(io);

app.use('/api/applications', applicationRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/users', userRoutes);

httpServer.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});