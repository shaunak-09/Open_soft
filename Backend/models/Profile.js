const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    imageUrl: {
        type: String,
        required: true
    },
    history: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Movie',
          }],
        required: true
    },
    suggestions: {
        type: Array,
        required: true
    },
    watchlist: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Movie',
          }],
        required: true
    },
    favorites: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Movie',
          }],
        required: true
    },
    subscription: {
        
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Subscription',
            // required: true

    },
    rentals: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Rent',
            required: true
          }],
        required: true
    }
});

module.exports = mongoose.model('Profile',profileSchema);
