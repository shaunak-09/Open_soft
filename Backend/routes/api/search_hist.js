const express = require('express');
const router = express.Router();
const SearchHistory = require('../../models/Search_Hist');
const auth = require("../../middleware/auth");


router.post('/', auth,async (req, res) => {
  try {
    const userId=req.userId
    const {query } = req.body;
    if (!query || query.trim().length === 0) {
        return res.status(400).json({ msg: 'Please provide a search query.' });
    }


    const user=await SearchHistory.findOne({userId:userId})
    if(user)
    {
        user.history.push(query)
        await user.save();
        res.status(201).json(user);
    }
    else{
    const newuser = await SearchHistory.create({ userId, history: [query] });
    res.status(201).json(newuser);

    }
    

  } catch (error) {
    console.error('Error creating search history:', error);
    res.status(500).json({ error: 'Error creating search history' });
  }
});

// GET route to retrieve search history by userId
router.get('/',auth,async (req, res) => {
  try {
    const userId = req.userId;
    const searchHistory = await SearchHistory.findOne({ userId:userId });
    if(!searchHistory)
    res.status(200).json([])
    else
    res.status(200).json(searchHistory);
  } catch (error) {
    console.error('Error fetching search history:', error);
    res.status(500).json({ error: 'Error fetching search history' });
  }
});

module.exports = router;
