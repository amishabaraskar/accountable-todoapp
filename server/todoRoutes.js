const express = require('express');
 const Todo = require('./todomodel.js')

 

const todosRouter= new express.Router();

todosRouter.get('/todos/:id',async(req,res)=>{
    try {
        const todos = await Todo.find({user_id:req.params.id});
        // console.log(todos)
res.send(todos)    } catch (err) {
        console.error('Error fetching todos:', err);
    }
})

todosRouter.delete('/todos/:id',async(req,res)=>{
    try {
        const todos = await Todo.deleteOne({_id:req.params.id});
        // console.log(todos)
res.send(201)    } catch (err) {
        console.error('Error deleting todos:', err);
    }
})

todosRouter.post('/todos/',async(req,res)=>{
    try {
        const todo = await Todo.insertMany(req.body.todo)
         console.log("post function")

res.send(200)    } catch (err) {
        console.error('Error fetching todos:', err);
    }
})

todosRouter.patch('/todos/:id',async(req,res)=>{
    try {
        console.log("from patch")
        const todo=await Todo.findById(req.params.id)
        if(req.body.attr == "checked")
         await Todo.updateOne({_id: todo._id},{checked: !todo.checked})
        else
                     await Todo.updateOne({_id: todo._id},{important: !todo.important})

res.send(200) } catch (err) {
        console.error('Error fetching todos:', err);
    }
})


module.exports= todosRouter;