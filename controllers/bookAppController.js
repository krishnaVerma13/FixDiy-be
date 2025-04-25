const asyncHandler = require('express-async-handler');
const Appoi = require('../models/bookAppModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 

//@desc create a new appointment
//@route post /api/bookappointment/createnew
//@access Public
const newAppointment= asyncHandler(async (req, res) => {
    const { name, email, phone , service, date, time, addres } = req.body;
    console.log(req.body)
  if (!name || !email || !phone || !service || !date || !time || !addres) {
    res.status(400);
    throw new Error("All fields are required");
  }
 
 
    const appoi = await Appoi.create({
      name,
      email,
      phone,
      service,
      date,
      time,
      addres,
    });
     if (appoi) {
      res.status(201).json({ _id: appoi.id, email: appoi.email, phone: appoi.phone, addres: appoi.addres, service: appoi.service });
     }else{
        res.status(400);
        throw new Error("Appointment data is not valid");
     }
});
  
const Findbooking = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { id } = req.body;
  const appoi = await Appoi.findOne({ _id: id });
  if (appoi) {
    res.status(200).json({ data: appoi });
  } else {
    res.status(401);
    throw new Error('Appointment Not Found');
  }
});

const FindAllBookings = asyncHandler(async (req, res) => {
  const Appoins = await Appoi.find({  });
  if (Appoins) {
    res.status(200).json({ data: Appoins });
  } else {
    res.status(401);
    throw new Error(' Not Found');
  }
});






module.exports = {
    newAppointment,
    Findbooking,
    FindAllBookings
}