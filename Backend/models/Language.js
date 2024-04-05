const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LanguageSchema = new Schema({
    language: {
        type: String,
        required: true
    },
    movieIds: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Movie',
          }],
        required: true
    }
});

module.exports = mongoose.model('Language', LanguageSchema);
