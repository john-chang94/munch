const mongoose = require('mongoose');
const { Schema } = mongoose;

const reviewSchema = new Schema({
    restaurantId: {
        type: Number,
        required: true
    },
    userId: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    details: {
        type: String,
        required: true,
        maxlength: 2000
    },
    rating: {
        type: Number,
        required: true
    },
    images: [{
        url: String,
        pinned: {
            type: Boolean,
            default: false
        }
    }]
})

module.exports = mongoose.model('Review', reviewSchema);