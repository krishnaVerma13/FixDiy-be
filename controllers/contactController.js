const asyncHandler = require('express-async-handler');
const Mesg = require('../models/contactModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 

//@desc create a new message
//@route post /api/contact/
//@access Public
const newMessage= asyncHandler(async (req, res) => {
  console.log(req.body)
    const { username, email, phone , subject, message } = req.body;
  if (!username || !email || !phone || !subject || !message ) {
    res.status(400);
    throw new Error("All fields are required");
  }
 
 
    const mesg = await Mesg.create({
      username,
      email,
      phone,
      subject,
      message,
    });
     if (mesg) {
      res.status(201).json({ _id: mesg.id, email: mesg.email, phone: mesg.phone, subject: mesg.subject, message: mesg.message });
     }else{
        res.status(400);
        throw new Error("message is not valid");
     }
});
  
const Findmessage = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { id } = req.body;
  const mesg = await Mesg.findOne({ _id: id });
  if (mesg) {
    res.status(200).json({ data: mesg });
  } else {
    res.status(401);
    throw new Error('message Not Found');
  }
});

const getallmwssage = asyncHandler(async (req, res) => {
  
  const mesg = await Mesg.find({});
  if (mesg) {
    res.status(200).json({ data: mesg });
  } else {
    res.status(401);
    throw new Error('message Not Found');
  }
});






module.exports = {
    newMessage,
    Findmessage,
    getallmwssage
}