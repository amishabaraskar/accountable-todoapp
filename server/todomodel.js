const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    user_id:String,
    task_name:String,
    task_desc:String,
    due_date:{
    type: Date, 
    default: Date.now,
    get: (date)=> date.toLocaleDateString("en-US") },
    checked:Boolean
})


const Todo =mongoose.model("Todo",TodoSchema,"test")

module.exports =Todo;
