const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    ratings:{
        type: Number,
        required: true
    },
    comment: {
        type: String,
        default: ''
    },
    movieId: {

        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
        required: true
    }
})

module.exports = mongoose.model('Review',ReviewSchema);