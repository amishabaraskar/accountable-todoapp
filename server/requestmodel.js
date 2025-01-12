const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({
    from_user_id:String,
    from_username:String,
    to_user_id:String,
    to_username:String,

})

const Request =mongoose.model("request",RequestSchema,"requests")

module.exports =Request;