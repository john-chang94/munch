const mongoose = require('mongoose');
const { Schema } = mongoose;

const reviewSchema = new Schema({
    restaurant_id: {
        type: Number,
        required: true
    },
    user_id: {
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
        image_url: String
    }],
    updated_at: Date
})

module.exports = mongoose.model('Review', reviewSchema);