const Interview = require('../models/Interview');

exports.scheduleInterview = async (req, res) => {
    try {
        const { companyId, studentId, startTime, endTime, meetingLink } = req.body;
        const newStart = new Date(startTime);
        const newEnd = new Date(endTime);

        const conflictingInterview = await Interview.findOne({
            studentId: studentId,
            $or: [
                { startTime: { $lte: newStart }, endTime: { $gt: newStart } },
                
                { startTime: { $lt: newEnd }, endTime: { $gte: newEnd } },
                
                { startTime: { $gte: newStart }, endTime: { $lte: newEnd } }
            ]
        }).populate('companyId', 'companyName');

        if (conflictingInterview) {
            return res.status(400).json({
                message: "Scheduling Clash Detected!",
                conflictDetails: `This student is already scheduled with ${conflictingInterview.companyId.companyName} from ${conflictingInterview.startTime.toLocaleTimeString()} to ${conflictingInterview.endTime.toLocaleTimeString()}.`
            });
        }

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