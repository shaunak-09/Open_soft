// Schema:
//     UserID
//     Image URL
//     History
//     Suggestions: Dynamic + Real-Time
//     Watchlist : Array[MovieObjId]
//     Favorites
//     Subscription
//     Rentals: Array[MovieObjId]
// API list ==> CRUD
// Create - [Profile create]
// Read - [getbyUserID]
// Update -
// Delete - [Favorites, Watchlist, History, Subscription, Account Deletion]

const express = require("express");
const mongoose = require("mongoose");
const Profile = require("../../models/Profile");
const auth=require('../../middleware/auth')

const router = require("express").Router();


//route to create a new Profile
router.post('/create',auth,async (req,res)=>{
    const newProfile = new Profile({
        userId: req.body.userId,
        imageURL: req.body.imageURL,
        history: req.body.history,
        suggestions: req.body.suggestions,
        watchlist: req.body.watchlist,
        favorites: req.body.favorites,
        subscription: req.body.subscription,
        rentals: req.body.rentals,
    });
    try{
        const savedProfile = await newProfile.save();
        res.status(201).json(savedProfile);
    }catch(err){
        res.status(500).json(err);
    }
})

//search by userID
router.get('/',auth,async (req,res)=>{
  // const userId=req.params.id;
  try{
      const profile = await Profile.find({});
      res.status(200).json(profile);
  }catch(err){
      res.status(500).json(err);
  }

})
router.get('/search/:id',auth,async (req,res)=>{
    const userId=req.params.id;
    try{
        const profile = await Profile.find({userId: userId});
        res.status(200).json(profile);
    }catch(err){
        res.status(500).json(err);
    }

})

//update profile
router.put('/history/:id',auth,async (req,res)=>{
  const userId=req.userId
  const movieId=req.body.movieId
  try{

    const profile = await Profile.findOne({userId: userId});
    profile.history.push(movieId)
    await profile.save()
    res.status(200).json("Profile updated successfully");
  }
  catch(err)
  {
    res.status(500).json(err);
  }
})

router.put('/watchlist/:id',auth,async (req,res)=>{
    const userId=req.userId
    const movieId=req.body.movieId
    try{
  
      const profile = await Profile.findOne({userId: userId});
      profile.watchlist.push(movieId)
      await profile.save()
      res.status(200).json("Profile updated successfully");
    }
    catch(err)
    {
      res.status(500).json(err);
    }
  })

  router.put('/favorites/:id',auth,async (req,res)=>{
    const userId=req.userId
    const movieId=req.body.movieId
    try{
  
      const profile = await Profile.findOne({userId: userId});
      profile.favorites.push(movieId)
      await profile.save()
      res.status(200).json("Profile updated successfully");
    }
    catch(err)
    {
      res.status(500).json(err);
    }
  })

// router.put('/:id',auth,async(req,res)=>{
//     const userId=req.body.id;
//     try{
//         const profile = await Profile.find({userId: userId});
//         const updatedProfile = await Profile.findByIdAndUpdate(profile._id,
//             {
//                 $set: {
//                     userId: req.body.userId,
//                     imageURL: req.body.imageURL,
//                     history: req.body.history,
//                     suggestions: req.body.suggestions,
//                     watchlist: req.body.watchlist,
//                     favorites: req.body.favorites,
//                     subscription: req.body.subscription,
//                     rentals: req.body.rentals,
//                 }
//             },{new: true});
//             res.status(200).json(updatedProfile);
//     }catch(err){
//         res.status(500).json(err);
//     }
// })

//delete profile
router.delete("/:id",auth,async(req,res)=>{
    if(!req.isAdmin)
    {
        res.status(404).json("Not Allowed")
    }
    const userId=req.body.id;
    try{
        const profile = await Profile.find({userId: userId});
        await Profile.findByIdAndDelete(profile._id)
        res.status(200).json("Profile has been deleted!");
    }catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;