const mongoose = require('mongoose');

const srchSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  history: {
    type: [String], 
    default: [], 
  },
});

const SearchHistory = mongoose.model('SearchHistory', srchSchema);

module.exports = SearchHistory;
