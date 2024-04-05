const express = require('express');
const router = express.Router();
const Movie=require('../../models/Movie');
const auth=require('../../middleware/auth');
const Language = require('../../models/Language');
const Genre = require('../../models/Genre');
const Profile = require('../../models/Profile');


// POST endpoint to create a new movie
router.post('/create',auth, async (req, res) => {
    if(!req.isAdmin)
    {
        res.status(404).json("Not Allowed")
    }
    try {
        const {
            title,                  // 1
            year,                   // 2
            runtime,                // 3
            released,               // 4
            poster,                 // 5
            plot,                   // 6
            fullplot,               // 7
            lastupdated,            // 8
            type,                   // 9
            directors,              // 10
            writers,                // 11
            awards,                 // 12
            imdb,                   // 13
            cast,                   // 14
            countries,              // 15
            languages,              // 16
            genres,                 // 17
            tomatoes,               // 18
            num_mflix_comments,     // 19
            plot_embedding          // 20
        } = req.body;

        const newMovie = new Movie({
            title,
            year,
            runtime,
            released,
            poster,
            plot,
            fullplot,
            lastupdated,
            type,
            directors,
            writers,
            awards,
            imdb,
            cast,
            countries,
            languages,
            genres,
            tomatoes,
            num_mflix_comments,
            plot_embedding
        });

        const savedMovie = await newMovie.save();

        res.status(201).json(savedMovie);
    } catch (error) {
        res.status(500).json({ message: 'Error creating movie', error: error.message });
    }
});



// Search for movies,
router.get('/search', async (req, res) => {
    try{
       const movie= await Movie.find({"title":req.body.title})
       if (!movie) {
        return res.status(404).json({ error: 'Movie not found' });
    }
    res.status(200).json(movie);

    }
    catch(err)
    {
       res.status(500).json({ message: 'Error fetching movies',error:err })
    }
});

// Get a movie by its ID
router.get('/id/:id', async (req, res) => {
    // console.log(req.query.id)
    try{
        const movie= await Movie.findById(req.params.id)
        if (!movie) {
         return res.status(404).json({ error: 'Movie not found' });
     }
     res.status(200).json(movie);
 
     }
     catch(err){
        res.status(500).json({ message: 'Error fetching movies',error:err })
     }
});

router.post('/language',async (req, res) => {
    const language=req.body.language
    // console.log(language)
    // to do => create language model and store movie id list in it
    try{
       
        const movies = await Language.findOne({ language: language});
        if (!movies) {
            return res.status(404).json({ error: 'No movie for this language' });
        }
        await movies.populate('movieIds')
        res.status(200).json(movies.movieIds);
    }
    catch(err){
        console.log(err);
        res.status(500).json({ error: 'Error fetching movie' })
    }
})

router.post('/genres',async(req,res)=>{
    const genre=req.body.genre
    try{
        const movies = await Genre.findOne({ genre:genre});
        if (!movies) {
            return res.status(404).json({ error: 'No movie for this genre' });
        }
        await movies.populate('movieIds')
        res.status(200).json(movies.movieIds);
    }
    catch(err){
        res.status(500).json({ error: 'Error fetching movie' })
    }


})

router.get('/gethits',async(req,res)=>{
    try{
        
    //     const fourtithMovie = await Movie.findOne().sort({ _id: 1 }).skip(40); // Skip 19 documents (0-based index)
    //     const twentiethMovie = await Movie.findOne().sort({ _id: 1 }).skip(20); 
    //     await Movie.updateMany({ _id: { $gt: twentiethMovie._id, $lt:fourtithMovie._id } }, { $set: { type: 'R' } });
        // const movies=await Movie.countDocuments({type:'S'})
        
        const movies=await Movie.find().sort({ "imdb.rating": -1 }).limit(20)
        if (!movies) {
            return res.status(404).json({ error: 'Movie not found' });
        }
        res.status(200).json(movies);
    }
    catch(err){
        res.status(500).json({ error: 'Error fetching movies' })
    }
})

router.get('/latest',async(req,res)=>{
    try{
        const movies=await Movie.find().sort({ released: -1 }).limit(10)
        if (!movies) {
            return res.json([]);
        }
        res.status(200).json(movies);
    }
    catch(err){
        res.status(500).json({ error: 'Error fetching movies' })
    }
})




// Update a movie by its ID
router.put('/:id',auth,async (req, res) => {
    if(!req.isAdmin)
    {
        res.status(404).json("Not Allowed")
    }
    try{

        const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!movie) {
         return res.status(404).json({ error: 'Movie not found' });
        }
        res.status(200).json(movie);
 
    }
    catch(err){
        res.status(500).json({ message: 'Error updating movies',error:err })
    }
});

router.get('/getProfileDetails',auth,async(req,res)=>{

    const userId = req.userId;

    try{
        const profile = await Profile.findOne({userId:userId}).populate('history').populate('watchlist').populate('favorites');
        if (!profile) {
          return res.status(404).json({ error: 'Profile not found' });
        }  

        res.status(200).json(profile);
    }
    catch(err){
        res.status(500).json({ msg: 'Error fetching profile',error:err })
    }
})

// Delete a movie by its ID
router.delete('/:id',auth, async (req, res) => {
    try{
        if(!req.isAdmin){
            res.status(403).json({"error":"Not Allowed"})
        }

        const movie= await Movie.findByIdAndDelete(req.params.id)
        if (!movie) {
         return res.status(404).json({ error: 'Movie not found' })
        }

        res.status(200).json(movie);
 
     }
     catch(err)
     {
        res.status(500).json({ message: 'Error deleting movies',error:err })
     }
});

// add a movie to history
router.post('/history',auth,async(req,res)=>{
    const userId = req.userId;
    const movieId = req.body.movieId;
    try{
        const profile = await Profile.findOne({userId:userId});
        if(!profile) return res.status(404).json({msg: 'Profile not found'});
        
        if(!profile.history.includes(movieId)){
            profile.history.push(movieId);
            await profile.save();
        }
        res.status(200).json({msg: 'Movie added to history'});
    }
    catch(err){
        res.status(500).json({msg: 'Internal Server Error'});
        console.log(err);
    }
})

// add a movie to watchlist
router.post('/watchlist',auth,async(req,res)=>{
    const userId = req.userId;
    const movieId = req.body.movieId;
    try{
        const profile = await Profile.findOne({userId:userId});
        if(!profile) return res.status(404).json({msg: 'Profile not found'});
        
        if(!profile.watchlist.includes(movieId)){
            profile.watchlist.push(movieId);
            await profile.save();
        }
        res.status(200).json({msg: 'Movie added to watchlist'});
    }
    catch(err){
        res.status(500).json({msg: 'Internal Server Error'});
        console.log(err);
    }
})

// add a movie to favorites
router.post('/favorites',auth,async(req,res)=>{
    const userId = req.userId;
    const movieId = req.body.movieId;
    try{
        const profile = await Profile.findOne({userId:userId});
        if(!profile) return res.status(404).json({msg: 'Profile not found'});
        
        if(!profile.favorites.includes(movieId)){   
            profile.favorites.push(movieId);
            await profile.save();
        }
        res.status(200).json({msg: 'Movie added to favorites'});
    }
    catch(err){
        res.status(500).json({msg: 'Internal Server Error'});
        console.log(err);
    }
})

//scrtipt to add movie to language
//use once only
router.get('/update-language-and-genre-models', async (req, res) => {
    try {
        const movies = await Movie.find({});

        for (const movie of movies) {
            const languages = movie.languages;
            const genres = movie.genres;

            // Update language model
            for (const language of languages) {
                let languageRecord = await Language.findOne({ language });

                if (languageRecord) {
                    if(languageRecord.movieIds.length<20)
                    {languageRecord.movieIds.push(movie._id);
                    await languageRecord.save();}
                } else {
                    languageRecord = new Language({
                        language,
                        movieIds: [movie._id]
                    });
                    await languageRecord.save();
                }
            }

            // Update genre model
            for (const genre of genres) {
                let genreRecord = await Genre.findOne({ genre });

                if (genreRecord) {
                    if(genreRecord.movieIds.length<20)
                    {
                        genreRecord.movieIds.push(movie._id);
                    await genreRecord.save();
                    }
                } else {
                    genreRecord = new Genre({
                        genre,
                        movieIds: [movie._id]
                    });
                    await genreRecord.save();
                }
            }
        }

        res.status(200).json({ message: movies.length });
    } catch (error) {
        console.error('Error updating language and genre models:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
router.get('/rent', async (req, res) => {
    try {
        const rentedMovies = await Movie.find({ rent: true });
        res.status(200).json({ rentedMovies: rentedMovies });
    } catch (error) {
        console.error('Error retrieving rented movies:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
