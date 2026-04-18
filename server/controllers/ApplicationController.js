import Application from '../models/Application.js';


// Logic for a student to apply for a company
export const applyToCompany = async (req, res) => {
    try {
        const { studentId, companyId, resumeLink } = req.body;

        // 1. Check if application already exists
        const existingApp = await Application.findOne({ studentId, companyId });
        if (existingApp) {
            return res.status(400).json({ message: "You have already applied for this company." });
        }

        // 2. Create new application
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

// Logic to get all applications for a specific student (For their Dashboard)
export const getStudentApplications = async (req, res) => {
    try {
        const apps = await Application.find({ studentId: req.params.studentId })
            .populate('companyId', 'companyName status'); // Joins company details
        res.status(200).json(apps);
    } catch (err) {
        res.status(500).json({ message: "Error fetching applications", error: err.message });
    }
};