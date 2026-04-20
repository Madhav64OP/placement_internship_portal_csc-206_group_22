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
        // Aligns with the 3 primary actors + Associate Coordinator for QR [cite: 596, 649]
        enum: ['Student', 'PIC', 'Associate', 'HR'], 
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
        unique:true,
        required:function() {return this.role === 'Student'}
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