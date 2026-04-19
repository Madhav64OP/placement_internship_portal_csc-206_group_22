// minor_code_folder/server/models/User.js
import mongoose from 'mongoose';

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
    phoneNo:{
        type: String,
    },
    rollNumber:{
        type: String,
    },
    mySeason: { 
        type: String, 
        enum: ['Intern', 'Placement'], 
        required: function() { return this.role === 'Student'; }
    },
    branchName:{
        type: String,
    },
    program:{
        type: String,
    },
    branchTag:{
        type: String,
    },
    year:{
        type: Number,
    },
    resumeLink: {
        type: String,
    },
    photoURL: {
        type: String,
    },
}, { timestamps: true });

export default mongoose.model('User', userSchema);