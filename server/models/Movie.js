const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Define the Movie schema
const MovieSchema = Schema({
   movieReview: [{
    type:Schema.Types.ObjectId,
    ref: 'Review',
   }],
   user:{
    type:Schema.Types.ObjectId,
    ref:'User',
   },
   dateReviewed:{
    type:Date,
    default:Date.now,
   }
});

const Movie = mongoose.model('Movie', MovieSchema);

// Export using named export
module.exports = {
   Movie,
   MovieSchema
};