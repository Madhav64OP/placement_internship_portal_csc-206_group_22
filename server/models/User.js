const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        // Aligns with the 3 primary actors + Associate Coordinator for QR [cite: 596, 649]
        enum: ['Student', 'PIC', 'Associate', 'HR'], 
        required: true
    },
    // Used for the institute's Omniport/Channeli OAuth [cite: 503, 604]
    channeliId: {
        type: String,
        required: function() { return this.role !== 'HR'; }
    },
    // Data points required for PIC "Student Master & Filtering" [cite: 138]
    branch: { 
        type: String 
    },
    cgpa: { 
        type: Number 
    },
    enrollmentNo: { 
        type: String, 
        unique: true,
        required: function() { return this.role === 'Student'; }
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);