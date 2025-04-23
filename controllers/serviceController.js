const asyncHandler = require('express-async-handler');
const Service = require('../models/serviceModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 

//@desc Register a new user
//@route post /api/service/register
//@access Public
const registerService= asyncHandler(async (req, res) => {
    const { spname, email, phone ,addres, service, password } = req.body;
    console.log(req.body)
  if (!spname || !email || !phone || !addres || !service || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }
  const spAvailable = await Service.findOne({ email });
  if (spAvailable) {
    res.status(400);
    throw new Error("Service provider already registered");
  }
  //hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // console.log("hash password", hashedPassword);
    const spuser = await Service.create({
      spname,
      email,
      phone,
      addres,
      service,
      password: hashedPassword,
    });
     if (spuser) {
      res.status(201).json({ _id: spuser.id, email: spuser.email, phone: spuser.phone, addres: spuser.addres, service: spuser.service });
     }else{
        res.status(400);
        throw new Error("User data is not valid");
     }
});
  
const Findsp = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { id } = req.body;
  const spuser = await Service.findOne({ _id: id });
  if (spuser) {
    res.status(200).json({ data: spuser });
  } else {
    res.status(401);
    throw new Error('service provider User Not Found');
  }
});


//@desc login a user
//@route post /api/service/login
//@access Public
const loginService= asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    //check for user email and password 
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are required");
        }
    const spuser = await Service.findOne({ email });
    const key = "secretkey2"; // replace with your secret key
    if (spuser && (await bcrypt.compare(password, spuser.password))) {
        //generate token
      const accessToken = jwt.sign({
        spuser: {
            username: user.username,
            email: user.email,
            id: user.id,
        },
      }, key, // replace with your secret key
        
      { expiresIn: "15m" });  
       res.status(200).json({ accessToken }); 
    } else {
        res.status(401);
        throw new Error("Invalid credentia  ls");
    }
  });

//@desc current user info
//@route get  /api/service/current
//@access Private
const currentService = asyncHandler(async (req, res) => {
    res.status(200).json(req.spuser);
  });

module.exports = {
    registerService,
    loginService,
    currentService,
    Findsp,
}