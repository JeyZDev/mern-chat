const Message = require("../models/message.model");
const User = require("../models/user.model");
const cloudinary = require("../configs/cloudinary");

const getUsersForSidebar = async (req, res) => {
    try {
        const loggedUserId = req.user._id;
        const filteredUsers = await User.find({
            _id: {$ne: loggedUserId}
        }).select("-password")
        res.status(200).json(filteredUsers);
    }catch(error) {
        res.status(500).send({message: "Server error while get all users"})
    }
}

const sendMessage = async(req, res) => {
    try {
        const {id: recipientId} = req.params;
        if(!recipientId) {
            return res.status(400).json({message: "Recipient id is required"});
        }
        const  senderId = req.user._id;
        const {text, file} = req.body;
        let fileUrl = "";
        if(file) {
            const uploadReponse = await cloudinary.uploader.upload(file);
            fileUrl = uploadReponse.secure_url;
        }
        // if(text === "" && file === "") {
        //     return res.status(400).json({message: "Msaage is empty"})
        // }

        const newMessage = new Message({
            text,
            file: fileUrl,
            sender: senderId,
            recipient: recipientId
        })
        await newMessage.save();
        res.status(200).json(newMessage);
    } catch (error) {
      res.status(500).send({ message: "Server error while send message" });
    }
}



const getMessage = async(req, res) => {
    try {
        const myId = req.user._id;
        const recipientId = req.params.id;

        const messages = await Message.find({
          $or: [
            {
              sender: myId,
              recipient: recipientId,
            },
            {
              sender: recipientId,
              recipient: myId,
            },
          ],
        });
        res.json(messages);
    } catch (error) {
      res.status(500).send({ message: "Server error while get message" });
    }
}

module.exports = { getUsersForSidebar, sendMessage, getMessage};