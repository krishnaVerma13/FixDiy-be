const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 

//@desc Register a new user
//@route post /api/users/register
//@access Public
const registerUser= asyncHandler(async (req, res) => {
    const { username, email, phone , password } = req.body;
    console.log(req.body)
  if (!username || !email || !phone || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered");
  }
  //hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // console.log("hash password", hashedPassword);
    const user = await User.create({
      username,
      email,
      phone,
      password: hashedPassword,
    });
     if (user) {
      res.status(201).json({ _id: user.id, email: user.email, phone: user.phone });
     }else{
        res.status(400);
        throw new Error("User data is not valid");
     }
});
  
const FindUser = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { id } = req.body;
  const user = await User.findOne({ _id: id });
  if (user) {
    res.status(200).json({ data: user });
  } else {
    res.status(401);
    throw new Error('User Not Found');
  }
});


//@desc login a user
//@route post /api/users/login
//@access Public
const loginUser= asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    //check for user email and password 
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are required");
        }
    const user = await User.findOne({ email });
    const key = "secretkey"; // replace with your secret key
    if (user && (await bcrypt.compare(password, user.password))) {
        //generate token
      const accessToken = jwt.sign({
        user: {
            username: user.username,
            email: user.email,
            id: user.id,
        },
      }, key, // replace with your secret key
        
      { expiresIn: "15m" });  
       res.status(200).json({ tkn:accessToken,data:user }); 
    } else {
        res.status(401);
        throw new Error("Invalid credentia  ls");
    }
  });

//@desc current user info
//@route get  /api/users/current
//@access Private
const currentUser = asyncHandler(async (req, res) => {
    res.status(200).json(req.user);
  });

  const FindAllUser = asyncHandler(async (req, res) => {
    const user = await User.find({});
    if (user) {
      res.status(200).json({ data: user });
    } else {
      res.status(401);
      throw new Error('User Not Found');
    }
  });

module.exports = {
    registerUser,
    loginUser,
    currentUser,
    FindUser,
    FindAllUser
}