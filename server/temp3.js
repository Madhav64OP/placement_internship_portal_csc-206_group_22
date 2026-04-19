import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Company from './models/Company.js';
import Application from './models/Application.js';

dotenv.config();

const seedInterviewQueue = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected. Seeding Interview Queue...');

        // 1. Find the target company (e.g., Microsoft which we set to 'Interview' stage)
        const targetCompany = await Company.findOne({ companyName: "Microsoft" });
        if (!targetCompany) {
            console.log("Microsoft not found in DB. Please run temp.js first!");
            process.exit(1);
        }

        // 2. Create Dummy Students with different CGPAs (to test the sorting algorithm)
        const dummyStudents = [
            { name: "Aarav Sharma", email: "aarav@iitr.ac.in", role: "Student", mySeason: "Placement", cgpa: 9.2, branchName: "CSE", program: "B.Tech" },
            { name: "Riya Singh", email: "riya@iitr.ac.in", role: "Student", mySeason: "Placement", cgpa: 8.8, branchName: "ECE", program: "B.Tech" },
            { name: "Kabir Das", email: "kabir@iitr.ac.in", role: "Student", mySeason: "Placement", cgpa: 7.9, branchName: "ME", program: "B.Tech" },
            { name: "Ananya Patel", email: "ananya@iitr.ac.in", role: "Student", mySeason: "Placement", cgpa: 8.5, branchName: "EE", program: "B.Tech" },
            { name: "Rohan Gupta", email: "rohan@iitr.ac.in", role: "Student", mySeason: "Placement", cgpa: 9.5, branchName: "CSE", program: "B.Tech" },
            { name: "Neha Verma", email: "neha@iitr.ac.in", role: "Student", mySeason: "Placement", cgpa: 8.1, branchName: "GT", program: "B.Tech" },
            { name: "Vikram Malhotra", email: "vikram@iitr.ac.in", role: "Student", mySeason: "Placement", cgpa: 7.5, branchName: "CH", program: "B.Tech" },
            { name: "Sneha Reddy", email: "sneha@iitr.ac.in", role: "Student", mySeason: "Placement", cgpa: 9.0, branchName: "MNC", program: "B.Tech" }
        ];

        const savedStudents = await User.insertMany(dummyStudents);
        console.log(`Created ${savedStudents.length} dummy students.`);

        // 3. Create Applications for these students (Status: 'Shortlisted')
        const dummyApplications = savedStudents.map(student => ({
            studentId: student._id,
            companyId: targetCompany._id, // Notice this is a String ID because of nanoid
            resumeLink: "https://drive.google.com/dummy-resume",
            status: "Shortlisted" // They MUST be shortlisted to be in the interview queue
        }));

        await Application.insertMany(dummyApplications);
        console.log(`Created ${dummyApplications.length} shortlisted applications for ${targetCompany.companyName}.`);

        console.log("Seeding Complete! You can now test the Interview UI.");
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

seedInterviewQueue();