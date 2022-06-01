const mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
    username: {
        type : String,
        unique : true,
        required : true
    },
    password: {
        type: String,
        required: true
    }
})

mongoose.model('User',userSchema)