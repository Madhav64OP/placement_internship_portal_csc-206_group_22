import mongoose from 'mongoose';
import { nanoid } from 'nanoid';

const companySchema = new mongoose.Schema({
    _id: { 
        type: String, 
        default: () => nanoid(10)
    },
    companyName: { type: String, required: true },
    role:{ type: String, required: true },
    season: { type: String,enum:['Intern','Placement'] ,required: true },
    jobDescription: { type: String },
    stipend: { type: String },
    location:[{ type: String }],
    deadline: { type: Date },
    criteria: {
        minCGPA: { type: Number, default: 0 },
        eligibleBranches: [{ type: String }],
        eligibleYears:[{type: String}]
    },
    process:[{
        type: String
    }],
    currentStage:{
        type: String,
        enum: ['Upcoming','PPT','OA','Interview','Completed'],
        default: 'Upcoming'
    }
}, { timestamps: true });

export default mongoose.model('CompanyProfile', companySchema);