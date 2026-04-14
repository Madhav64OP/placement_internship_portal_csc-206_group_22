const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    studentId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    companyId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Company', 
        required: true 
    },
    resumeLink: { type: String },
    status: { 
        type: String, 
        enum: ['Applied', 'Shortlisted', 'Rejected', 'Selected', 'Waitlist'], 
        default: 'Applied' 
    },
    currentRound: { type: Number, default: 1 },
    attendanceStatus: { type: String, enum: ['Absent', 'Present'], default: 'Absent' }
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);