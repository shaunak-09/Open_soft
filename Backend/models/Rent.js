const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RentSchema = new Schema({
    duration: {
        type: Number,
        required: true,
        validate: {
            validator: function(value) {
                return [2, 4, 7].includes(value);
            },
            message: props => `${props.value} is not a valid duration. Only 2, 4, or 7 days are allowed.`
        }
    },
    movieId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie', 
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    expiryDate: {
        type: Date,
        required: true
    }
});
RentSchema.index({ expiryDate: 1 }, { expireAfterSeconds: 0 })              // Set the expiryDate as the TTL index
module.exports = Rent = mongoose.model('Rent', RentSchema);
