const express = require('express');
const passport = require('passport');
const router = express.Router();
const keys = require('../../config/keys');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require("../../models/User");
const profile = require('../../models/Profile');


function isLoggedIn(req,res,next){
    req.user ? next() : res.sendStatus(401);
}


router.get('/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

router.get( '/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/auth/protected',
        failureRedirect: '/auth/google/failure'
}));

router.get('/google/failure',(req,res)=>{
    res.send("Something went wrong");
});

router.get('/protected', isLoggedIn, async (req, res) => {
    try {
    
        let user = await User.findOne({ email: req.user.email });
        
        if (user) {
            const payload = { userId: user._id, isAdmin: user.isAdmin };
            jwt.sign(payload, keys.secretOrKey, { expiresIn: "2d" }, (err, token) => {
                if (err) throw err;
                res.json({
                    success: true,
                    token,
                });
            });
        } else {
            const newUser = new User({
                name: req.user.displayName,
                email: req.user.email,
                password: req.user.id,
            });

            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(newUser.password, salt);
            newUser.password = hash;
            const savedUser = await newUser.save();

            const newProfile = new profile({
                userId:savedUser._id,
                imageUrl: req.user.photos[0].value,
                history:[],
                suggestions:[],
                watchlist:[],
                favorites:[],
                subscription:null,
                rentals:[],
            })

            await newProfile.save();

            const payload = { userId: savedUser._id, isAdmin: savedUser.isAdmin };
            jwt.sign(payload, keys.secretOrKey, { expiresIn: "2d" }, (err, token) => {
                if (err) throw err;
                res.json({
                    success: true,
                    token,
                });
            });

            res.send(`hello ${req.user.displayName}`);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
});


module.exports = router;
