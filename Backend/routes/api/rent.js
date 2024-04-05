const express = require('express');
const router = express.Router();
const Rent = require('../../models/Rent');
const auth=require('../../middleware/auth')
const Profile=require('../../models/Profile')
// Create a rent
router.post('/create', auth,async (req, res) => {
    try {

        const { movieId, duration} = req.body;
        const userId=req.userId
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + duration);
        
        const rent = new Rent({
            duration,
            movieId,
            userId,
            expiryDate
        });

        const saved_rent=await rent.save();
        const profile = await Profile.findOne({userId: userId});
        profile.rentals.push(saved_rent._id)
        await profile.save()
        console.log(profile);
        // res.status(201).json("Rental successfull");
        res.status(201).json(saved_rent);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Read rents by userID
router.get('/user/:userId', auth,async (req, res) => {
    try {
        const userId = req.userId;
        const rents = await Rent.find({ userId });
        res.json(rents);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Read a single rent by ID
router.get('/:id', auth,async (req, res) => {
    try {
        const rent = await Rent.findById(req.params.id);
        if (!rent) {
            return res.status(404).json({ message: 'Rent not found' });
        }
        res.json(rent);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Delete expired rents
router.delete('/user/:userId', auth,async (req, res) => {
    try {
        const userId = req.params.userId;
        await Rent.deleteMany({ userId });
        res.json({ message: 'Rents deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
