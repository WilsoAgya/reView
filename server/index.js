const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel = require('./models/NewUser.js')

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect('mongodb://localhost:27017/reView');



app.post('/signup', (req, res) => {
    UserModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.post("/login", (req, res) =>{
    const {name, password} = req.body;
    UserModel.findOne({name:name})
    .then(user => {
     if(user){
        if(user.password === password){
            res.json('Success')
        } else{
            res.json('Password is incorrect')
        }
    } else{
        res.json('No record existed')
    }
        
    })
})

app.listen(8001, () => {
    console.log('server is running')
})