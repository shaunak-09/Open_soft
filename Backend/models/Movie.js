const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    plot: {
        type: String,
    },
    genres: {
        type: [String],
    },
    runtime: {
        type: Number,
    },
    rated: {
        type: String
    },
    cast: {
        type: [String],
    },
    num_mflix_comments: {
        type: Number,
    },
    poster: {
        type: String,
    },
    title: {
        type: String,
    },
    lastupdated: {
        type: Date,
    },
    languages: {
        type: [String]
    },
    released: {
        type: Date,
    },
    directors: {
        type: [String],
    },
    writers: {
        type: [String]
    },
    awards: {
        wins: {
            type: Number
        },
        nominations: {
            type: Number
        },
        text: {
            type: String
        }
    },
    year: {
        type: Number,
    },
    imdb: {
        rating: {
            type: Number,
        },
        votes: {
            type: Number,
            
        },
        id: {
            type: Number,
        }
    },
    countries: {
        type: [String],
    },
    type: {
        type: String,
    },
    tomatoes: {
        viewer: {
            rating: {
                type: Number,
            },
            numReviews: {
                type: Number,
            },
            meter: {
                type: Number
            }
        },
        dvd: {
            type: Date
        },
        critic: {
            rating: {
                type: Number
            },
            numReviews: {
                type: Number
            },
            meter: {
                type: Number
            }
        },
        lastUpdated: {
            type: Date
        },
        rotten: {
            type: Number
        },
        production: {
            type: String
        },
        fresh: {
            type: Number
        }
    },
    plot_embedding: {
        type: [Number],
    },
    type:{
        type:String,
        default:"S",
    },
    premium:{
        type:Boolean,
        default:false
    },
    poster_details:{
        type:String
    }
});

module.exports = mongoose.model('Movie', MovieSchema);