const express = require('express');
const router = express.Router();
const Movie = require('../../models/Movie');
const axios = require('axios');
const SearchHistory = require('../../models/Search_Hist');
const auth = require("../../middleware/auth");

const hf_token = process.env.HF_TOKEN;
const embedding_url = "https://api-inference.huggingface.co/pipeline/feature-extraction/sentence-transformers/all-MiniLM-L6-v2";

// Function to generate embedding
async function generate_embedding(text) {
    try {
        const response = await axios.post(embedding_url, {
            inputs: text
        }, {
            headers: {
                Authorization: `Bearer ${hf_token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.status !== 200) {
            throw new Error(`Request failed with status code ${response.status}: ${response.data}`);
        }

        return response.data;
    } catch (error) {
        throw new Error(`Error: ${error.message}`);
    }
}



async function getTitle(text) {
    try {
        if (!text || typeof text !== 'string') {
            throw new Error("Text parameter is missing or not a string");
        }

        const queryEmbedding = await generate_embedding(text);

        const results = await Movie.aggregate([
            {
                $vectorSearch: {
                    queryVector: queryEmbedding,
                    path: "title_embedding", // Change path to title_embedding
                    numCandidates: 100,
                    limit: 4,
                    index: "vector_index", // Change index name to vector_index
                }
            },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    // plot: 1
                }
            }
        ]);

        return results; // Return results instead of sending response
    } catch (error) {
        console.error('Error:', error.message); // Log the error message
        throw error; // Propagate the error to the calling function
    }
}




//recommend_movies function
async function recommendMovies(searchHistory) {
    const frequencyMap = new Map();

    // Update frequency map with search results
    for (const searchText of searchHistory) {
        const movieIds = await getTitle(searchText);
        for (const id of movieIds) {
            frequencyMap.set(id, (frequencyMap.get(id) || 0) + 1);
        }
    }
    // console.log(frequencyMap);

    // Sort movies by frequency
    const sortedMovies = Array.from(frequencyMap.entries())
                                .sort((a, b) => b[1] - a[1])
                                .map(([id, _]) => id);

    // Get top 10 movies
    let topMovies = sortedMovies.slice(0, 10);

    // If less than 10 unique movies, fill the rest with random movies from the database
    if (topMovies.length < 10) {
        const remaining = 10 - topMovies.length;
        const allMoviesCursor = Movie.find({}, { '_id': 1 , 'title':1,'released':1,'poster':1,'plot':1});
        let allMovieIds = [];
        for await (const movie of allMoviesCursor) {
            allMovieIds.push(movie._id);
        }
        const shuffledIds = allMovieIds.sort(() => Math.random() - 0.5);
        for (const id of shuffledIds) {
            if (!topMovies.includes(id)) {
                topMovies.push(id);
            }
            if (topMovies.length >= 10) break;
        }
        let data=[]
        for(const id of topMovies)
        {
            const movie=await Movie.findById(id);
            data.push(movie);

        }
    }

    return data;
}




// Route to search for movies based on embeddings
// Route to search for movies based on embeddings
router.get('/plot', async (req, res) => {
    try {
          const {query} = req.query // Change 'query' to 'q'
          if (!query || query.trim().length === 0) {
            return res.status(400).json({ msg: 'Please provide a search query.' });
        }
        const queryEmbedding = await generate_embedding(query);

        const results = await Movie.aggregate([
            {
                $vectorSearch: {
                    queryVector: queryEmbedding,
                    path: "plot_embedding",
                    numCandidates: 100,
                    limit: 12,
                    index: "plot_embedding",
                }
            },
            {
                $project: {
                    '_id': 1,
                    'title': 1,
                    'poster':1,
                    'released':1,
                    "plot":1
                }
            }
        ]);

        // const queryEmbedding1 = await generate_embedding(query);

        const results1 = await Movie.aggregate([
            {
                $vectorSearch: {
                    queryVector: queryEmbedding,
                    path: "poster_details_embedding", // Change path to poster_details_embedding
                    numCandidates: 100,
                    limit: 12,
                    index: "poster_details_embedding", // Assuming the name of the index is "vector_index"
                }
            },
            {
                $project: {
                    '_id': 1,
                'title': 1,
                'poster':1,
                'released':1,
                "plot":1
                }
            }
        ]);
        const results2 = [...results,...results1];
        // result2=[...results,...results1]

        res.json(results2);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});


//semantics title search
router.get('/', async (req, res) => {
    try {
        const {query} = req.query // Change 'query' to 'q'
        if (!query || query.trim().length === 0) {
            return res.status(400).json({ msg: 'Please provide a search query.' });
        }

        const queryEmbedding = await generate_embedding(query);

        const results = await Movie.aggregate([
            {
                $vectorSearch: {
                    queryVector: queryEmbedding,
                    path: "title_embedding", // Change path to title_embedding
                    numCandidates: 100,
                    limit: 12,
                    index: "vector_index", // Change index name to vector_index
                }
            },
            {
                $project: {
                '_id': 1,
                'title': 1,
                'poster':1,
                'released':1,
                "plot":1
                }
            }
        ]);

       
        res.json(results);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/historyRecommendations',auth, async (req, res) => {
    try {
        const userId = req.userId;

        // Retrieve search history for the specified user ID from the database
        const searchHistory = await SearchHistory.findOne({ userId });
        
        if (!searchHistory) {
            return res.status(404).json([]);// send random movies if no search history
        }

        // Call the recommendMovies function with the search history
        const recommendations = await recommendMovies(searchHistory.history);

        // Return the recommendations as JSON
        res.json(recommendations);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});


module.exports = router;