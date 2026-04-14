const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    companyName: { type: String, required: true },
    jobDescription: { type: String },
    roles: [{ type: String }],
    criteria: {
        minCGPA: { type: Number, default: 0 },
        eligibleBranches: [{ type: String }]
    },
    status: { type: String, enum: ['Upcoming', 'Ongoing', 'Completed'], default: 'Upcoming' }
}, { timestamps: true });

module.exports = mongoose.model('Company', companySchema);