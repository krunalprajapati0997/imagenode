const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    profile_file: { type: String },
    profile_path: { type: String } 
})

const User = mongoose.model('User',userSchema)

module.exports = User