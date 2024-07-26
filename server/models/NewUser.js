const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the User schema
const UserSchema = new mongoose.Schema({
    name: String,
    password: String,
    movies: [{
        type: Schema.Types.ObjectId,
        ref: 'Movie'
    }]
});

// Define the Movie schema
const MovieSchema = new mongoose.Schema({
    name: String,
    img_path: String,
    rating: Number,  // Changed from 'int' to 'Number'
    overview: String,
    review: String,
});

// Create the User and Movie models
const UserModel = mongoose.model('User', UserSchema);
const MovieModel = mongoose.model('Movie', MovieSchema);

// Export the models
module.exports = {
    UserModel,
    MovieModel
};
