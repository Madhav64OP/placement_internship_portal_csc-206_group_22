import Company from '../models/Company.js';

// 1. Create a new company posting (For HR/PIC)
export const createCompany = async (req, res) => {
    try {
        const newCompany = new Company(req.body);
        const savedCompany = await newCompany.save();
        res.status(201).json(savedCompany);
    } catch (err) {
        res.status(400).json({ message: "Error creating company", error: err.message });
    }
};

// 2. Get all companies (For Student Dashboard)
export const getCompanies = async (req, res) => {
    try {
        const companies = await Company.find().sort({ createdAt: -1 }); // Newest first
        res.status(200).json({ success: true, data: companies });
    } catch (err) {
        res.status(500).json({ success: false, message: "Error fetching companies", error: err.message });
    }
};

export const getCompanyById = async (req, res) => {
    try {
        const company = await Company.findById(req.params.companyId);
        if(!company){
            return res.status(404).json({success:false,message: "Company not found"});
        }
        return res.status(200).json({success:true,data: company});
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching company details", error: error.message });
    }
}