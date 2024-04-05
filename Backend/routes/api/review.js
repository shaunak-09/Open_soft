// Schema ==> {UserID, Ratings, CommentID, MovieID}
// API list ==> CRUD
// Create
// Read - [GetByMovieID, GetByUserID]
// Update - [Ratings, Comments]
// Delete - [DeleteByCommentID (Admin + User)]
const Review = require("../../models/Review");
const router=require("express").Router();
const authMiddleware = require("../../middleware/auth");
// const auth=require('../../middleware/auth')
//route to create a new Review
router.post('/create',authMiddleware,async (req,res)=>{
    const newReview = new Review({
        userId: req.userId,
        ratings: req.body.ratings,
        comment: req.body.comment?req.body.comment:'',
        movieId: req.body.movieId,
    });
    try{
        const savedReview = await newReview.save();
        res.status(201).json(savedReview);
    }catch(err){
        res.status(500).json(err);
    }
})

//search by movieId
router.get('/search/movie/:id',authMiddleware,async (req,res)=>{
    const movieId=req.params.id;
    try{
        const reviews = await Review.find({movieId: movieId});
        res.status(200).json(reviews);
    }catch(err){
        res.status(500).json(err);
    }
})

//search by userId
router.get('/search/user',authMiddleware,async (req,res)=>{
    const userId = req.userId;

    try{
        const reviews = await Review.find({userId: userId});
        res.status(200).json(reviews);
    }catch(err){
        res.status(500).json(err);
    }
})

//update review
router.put('/:id',authMiddleware,async(req,res)=>{
    const reviewId=req.body.id;
    try{

        // TODO: 
        // 1. Validate the user is the owner of the review
        // 2. OR Validate the user is an admin 
        // 3. If not, return 401
        // 4. If yes, update the review
        const review = await Review.findById(reviewId);
        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }
        if (req.userId !== review.userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const updatedReview = await Review.findByIdAndUpdate(reviewId,
            {
                $set: {
                    userId: req.userId,
                    ratings: req.body.ratings,
                    commentId: req.body.commentId,
                    movieId: req.body.movieId,
                }
            },{new: true});
            res.status(200).json(updatedReview);
    }catch(err){
        res.status(500).json(err);
    }
})

//Delete review
router.delete(":/id",authMiddleware,async(req,res)=>{
    const reviewId=req.body.id;
    if(!req.isAdmin)
    {
        res.status(404).json("Not Allowed")
    }
    try{
        // TODO: 
        // 1. Validate the user is the owner of the review
        // 2. OR Validate the user is an admin 
        // 3. If not, return 401
        // 4. If yes, delete the 
        const review = await Review.findById(reviewId);
        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }
        if (req.userId !== review.userId && !req.isAdmin) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        await Review.findByIdAndDelete(reviewId)
        res.status(200).json("Review has been deleted!");
    }catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;