const Company = require('../models/Company');

// 1. Create a new company posting (For HR/PIC)
exports.createCompany = async (req, res) => {
    try {
        const newCompany = new Company(req.body);
        const savedCompany = await newCompany.save();
        res.status(201).json(savedCompany);
    } catch (err) {
        res.status(400).json({ message: "Error creating company", error: err.message });
    }
};

// 2. Get all companies (For Student Dashboard)
exports.getCompanies = async (req, res) => {
    try {
        const companies = await Company.find().sort({ createdAt: -1 }); // Newest first
        res.status(200).json(companies);
    } catch (err) {
        res.status(500).json({ message: "Error fetching companies", error: err.message });
    }
};