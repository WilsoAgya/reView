const mongoose = require('mongoose');
const { MovieSchema } = require('./Movie');



const UserSchema = new mongoose.Schema({
    
    name: String,
    password: String,
    reviews:[
        MovieSchema
    ]
    
   
});

// Create the User model
const UserModel = mongoose.model('User', UserSchema);


module.exports = {
    UserModel
   
};
