const Interview = require('../models/Interview');

exports.scheduleInterview = async (req, res) => {
    try {
        const { companyId, studentId, startTime, endTime, meetingLink } = req.body;

        // Convert incoming strings into actual Date objects for math
        const newStart = new Date(startTime);
        const newEnd = new Date(endTime);

        // ---------------------------------------------------------
        // THE "BRAIN": CLASH DETECTION ALGORITHM
        // We ask MongoDB: "Find ANY existing interview for this student 
        // where the times crash into our proposed times."
        // ---------------------------------------------------------
        const conflictingInterview = await Interview.findOne({
            studentId: studentId,
            $or: [
                // Case A: New interview starts DURING an existing one
                { startTime: { $lte: newStart }, endTime: { $gt: newStart } },
                
                // Case B: New interview ends DURING an existing one
                { startTime: { $lt: newEnd }, endTime: { $gte: newEnd } },
                
                // Case C: New interview completely SWALLOWS an existing one
                { startTime: { $gte: newStart }, endTime: { $lte: newEnd } }
            ]
        }).populate('companyId', 'companyName'); // Grabs the other company's name for the error msg

        // If the database finds a match, we STOP and throw an error to the PIC
        if (conflictingInterview) {
            return res.status(400).json({
                message: "Scheduling Clash Detected!",
                conflictDetails: `This student is already scheduled with ${conflictingInterview.companyId.companyName} from ${conflictingInterview.startTime.toLocaleTimeString()} to ${conflictingInterview.endTime.toLocaleTimeString()}.`
            });
        }

        // ---------------------------------------------------------
        // GREEN LIGHT: NO CLASHES FOUND. SAVE IT.
        // ---------------------------------------------------------
        const newInterview = new Interview({
            companyId,
            studentId,
            startTime: newStart,
            endTime: newEnd,
            meetingLink
        });

        await newInterview.save();
        res.status(201).json({ 
            message: "Success! Interview scheduled.", 
            interview: newInterview 
        });

    } catch (error) {
        console.error("Scheduling Error:", error);
        res.status(500).json({ message: "Server error while scheduling interview" });
    }
};