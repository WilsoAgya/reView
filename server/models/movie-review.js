const mongoose = require('mongoose');


const movieReview = mongoose.Schema({
    
    name: String,
    img_path: String,
    rating: Number,
    overview: String,
    review: String,
    
});

const ReviewModel = mongoose.model('Review', movieReview);

// Export the models
module.exports = {
    
    ReviewModel
};
