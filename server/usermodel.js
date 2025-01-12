const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username:String,
    email:String,
    password:String,
    partner_id:String

})

const User =mongoose.model("user",UserSchema,"users")

module.exports =User;