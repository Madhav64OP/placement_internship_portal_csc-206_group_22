import User from '../models/User.js';

export const getUserProfile = async (req, res) =>{
    try{
        const user = await User.findById(req.params.userId);

        if(!user){
            return res.status(404).json({sucess:false,message: "User not found"});
        }
        return res.status(200).json({sucess:true,data: user});
    }catch(err){
        console.error("Error fetching user profile:", err);
        return res.status(500).json({sucess : false, message: "Error fetching user profile"});
    }
};

export const updateResume = async (req, res) => {
    try {
        const { userId } = req.params;
        const { resumeLink } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            userId, 
            { resumeLink }, 
            { returnDocument: 'after' }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ success: true, data: updatedUser });
    } catch (error) {
        res.status(500).json({ success:false, message: "Error updating resume", error: error.message });
    }
};

