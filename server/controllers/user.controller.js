const cloudinary = require("../configs/cloudinary");
const User = require("../models/user.model");

const updateProfile = async(req, res) => {
    try{
        const fullName = req.body?.fullName;
        const profilePic = req.body?.profilePic;
        const userId = req.user._id;

        if(fullName && profilePic) {
            const uploadResponse = await cloudinary.uploader.upload(profilePic);
            if(!uploadResponse){
                return res.status(500).send({message: "Error while uploading profile picture."});
            }

            const updatedUser = await User.findByIdAndUpdate(userId, {fullName,  profilePic: uploadResponse.secure_url}, {new: true});

            if(!updatedUser){
                return res.status(500).send({message: "Error while uploading profile picture."});
            }

            return res.send({message: "User profile updated successfully.", user: updatedUser});
        }else if(fullName) {
            const updatedUser = await User.findByIdAndUpdate(userId, {fullName}, {new: true});

            if(!updatedUser){
                return res.status(500).send({message: "Error while uploading profile picture."});
            }

            return res.send({message: "User profile updated successfully.", user: updatedUser});
        }else if (profilePic) {
            const uploadResponse = await cloudinary.uploader.upload(profilePic);
            if(!uploadResponse){
                return res.status(500).send({message: "Error while uploading profile picture."});
            }

            const updatedUser = await User.findByIdAndUpdate(userId, {profilePic: uploadResponse.secure_url}, {new: true});

            if(!updatedUser){
                return res.status(500).send({message: "Error while uploading profile picture."});
            }

            return res.send({message: "User profile updated successfully.", user: updatedUser});
        }else {
        }
    }catch(e) {
        res.status(500).send({message: "Internal Server Error while updating user profile."});
    }
}

const checkAuth = async(req, res) => {
    try {
        res.status(200).send(req.user);
    } catch(error) {
        res.status(500).send({message: "Internal Server Error while checking auth."})
    }
}

const UserController = {
  updateProfile,
  checkAuth,
};

module.exports = UserController;