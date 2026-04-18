const User = require('../models/User');

const getUserProfile = async (req, res) =>{
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

module.exports ={getUserProfile};