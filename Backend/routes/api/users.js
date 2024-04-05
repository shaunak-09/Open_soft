const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const Profile = require("../../models/Profile");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const authMiddleWare = require("../../middleware/auth");

const validateLoginInput = require("../../validation/login");

const fillSpaces = (str) => {
  return str.replace(' ','+');
}

const getURL = (name) => {
  return `https://ui-avatars.com/api/?name=${fillSpaces(name)}&background=random`
}

router.post('/register',async (req,res)=>{
    
  const {name,email,password} = req.body;

  if(!name || !email || !password){
    return res.status(400).json({msg: 'Please enter all fields'});
  }  

  try{

    const user  = await User.findOne({email});
    if(user) return res.status(400).json({msg: 'User already exists'});

    const newUser = new User({
      name,
      email,
      password
    });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    newUser.password = hash;
    const savedUser = await newUser.save();

    const newProfile = new Profile({
      userId: savedUser._id,
      imageUrl: getURL(name),
      history: [],
      suggestions: [],
      watchlist: [],
      favorites: [],
      subscription: null,
      rentals: []
    });
    
    const savedProfile = await newProfile.save();
    res.json(savedUser);

  }
  catch(err){
    return res.status(500).json({msg: 'Internal Server Error'});
    console.log(err);
  }
})

router.post('/login', async (req,res)=>{
  const {email,password} = req.body;

  if(!email || !password){
    return res.status(400).json({msg: 'Please enter all fields'});
  }

  try{

    const user = await User.findOne({email});
    if(!user) return res.status(400).json({msg: 'User does not exist'});

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) return res.status(400).json({msg: 'Invalid credentials'});

    const payload = {userId: user._id, isAdmin: user.isAdmin};
    const token = await jwt.sign(payload, keys.secretOrKey, {expiresIn: '2d'});
    res.json({token});

  }
  catch(err){
    return res.status(500).json({msg: 'Internal Server Error'});
    console.log(err);
  }

})

router.get('/profile',authMiddleWare,async (req,res)=>{

  try{
    const userId = req.userId;

    const user = await User.findById(userId);
    if(!user) return res.status(404).json({msg: 'User not found'});

    const profile = await Profile.findOne({userId});
    profile.email = user.email;
    profile.name = user.name;

    const userData = {
      ...profile._doc,
      email: user.email,
      name: user.name
    }

    res.json({user: userData});
  }
  catch(err){
    return res.status(500).json({msg: 'Internal Server Error'});
    console.log(err);
  }
})


router.delete("/delete", authMiddleWare, async (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) return res.status(400).json(errors);

  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }
    if (user._id != req.userId) {
      if (!req.isAdmin) 
      {res.status(402).json("Not Allowed");}
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      errors.password = "Password Incorrect";
      return res.status(400).json(errors);
    }
    const result = await Movie.deleteOne({ _id: user._id });
    if (result.deletedCount > 0) {
      res.status(200).json("User deleted successfully.");
    } else {
      res.status(404).json("Movie not found or already deleted.");
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.get("/current", authMiddleWare, (req, res) => {
  res.json({
    userId: req.userId,
    isAdmin: req.isAdmin,
  });
});

module.exports = router;
