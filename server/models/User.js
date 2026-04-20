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
    password: {
        type: String,
        required: true 
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