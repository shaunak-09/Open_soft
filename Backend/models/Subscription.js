const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubscriptionSchema = new Schema({
    duration: {
        type: Number,
        required: true,
        validate: {
            validator: function(value) {
                return [1,3,6,12].includes(value);
            },
            message: props => `${props.value} is not a valid duration. Only 1,3,6 and 12 months are allowed.`
        }
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    expiryDate: {
        type: Date,
        required: true
    },
    tier:{
        type:Number,
        enum:[1,2,3],
        required:true,
    }
})

SubscriptionSchema.index({ expiryDate: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('Subscription',SubscriptionSchema);