const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { UserModel } = require('./models/NewUser');
const session = require('express-session');
const { Movie } = require('./models/Movie');
const { ReviewModel } = require('./models/movie-review');

const app = express();
app.use(express.json());
app.use(cors());



mongoose.connect('mongodb://localhost:27017/reView');

// User sign-up
app.post('/signup', (req, res) => {
  UserModel.create(req.body)
    .then(user => res.json(user))
    .catch(err => res.json(err));
});

app.post('/login', (req, res) => {
  const { name, password } = req.body;
  
  UserModel.findOne({ name })
    .then(user => {
      if (user) {
        if (user.password === password) {
       
         
          res.json('Success');
          console.log('User ID:', user._id); // Ensure _id is logged
        } else {
          res.json('Password is incorrect');
        }
      } else {
        res.json('No record existed');
      }
    })
    .catch(err => {
      console.error('Error during login:', err);
      res.status(500).json('Internal Server Error');
    });
});

/*app.get('/home', async (req, res) => {
  try {
    const reviewList = await Movie.find().populate('movieReview');
    if (!reviewList.length) {
      return res.status(404).send("No movies found");
    }
    res.send(reviewList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});*/

// Create a new movie entry with reviews
app.post('/home/:userId', async (req, res) => {
  const { userId } = req.params;
  const {name , img_path, rating, overview, review} = req.body;

  try{
    const user = await UserModel.findById(userId);
    if(!user){
      return res.status(404).send('User not found');
    }
  
  // Create the new review object
  const newReview = { name,img_path,overview, rating, review };

  // Add the new review to the user's reviews array
  user.reviews.push(newReview);

  // Save the updated user document
  await user.save();

  // Respond with the updated user object
  res.status(200).json(user);
} catch (err) {
  res.status(500).send('Error adding review');

}
});

app.listen(8001, () => {
  console.log('Server is running on port 8001');
});
