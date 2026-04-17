// minor_code_folder/server/models/User.js
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
        enum: ['Student', 'PIC', 'HR'], // The 3 roles from your design doc
        required: true
    },
    cgpa:{
        type: Number,
    },
    branch:{
        type: String,
    },
    currentYear:{
        type: Number,
    },
    resumeLink: {
        type: String,
    },
    // Channeli OAuth will provide an ID, we store it here
    channeliId: {
        type: String,
        required: function() { return this.role !== 'HR'; } // HR might not use Channeli
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);