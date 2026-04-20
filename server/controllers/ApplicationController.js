import Application from '../models/Application.js';
import Company from '../models/Company.js';


export const applyToCompany = async (req, res) => {
    try {
        const { studentId, companyId, resumeLink } = req.body;

        const existingApp = await Application.findOne({ studentId, companyId });
        if (existingApp) {
            return res.status(400).json({ message: "You have already applied for this company." });
        }


        const newApp = new Application({
            studentId,
            companyId,
            resumeLink,
            status: 'Applied'
        });

        const savedApp = await newApp.save();
        res.status(201).json({ message: "Application submitted successfully!", data: savedApp });
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};


export const getStudentApplications = async (req, res) => {
    try {
        const apps = await Application.find({ studentId: req.params.studentId })
            .populate('companyId', 'companyName currentStage'); 
        res.status(200).json(apps);
    } catch (err) {
        
        res.status(500).json({ message: "Error fetching applications", error: err.message });
    }
};