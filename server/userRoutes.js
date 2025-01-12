const express = require('express');
 const User = require('./usermodel.js')

 const Request = require('./requestmodel.js')


const userRouter= new express.Router();

userRouter.get('/users',async(req,res)=>{
    try {
        const users = await User.find();
        // console.log(todos)
res.send(users)    } catch (err) {
        console.error('Error fetching users:', err);
    }
})

userRouter.get('/users/:id',async(req,res)=>{
    try {
        console.log(req.params.id)
        const user = await User.findById(req.params.id);
        console.log(user)
res.send(user)   
 } catch (err) {
        console.error('Error fetching user:', err);
    }
})

userRouter.get('/requests/:id',async(req,res)=>{
    try {
        const requests = await Request.find({to_user_id:req.params.id});
        // console.log(todos)
res.send(requests)    } catch (err) {
        console.error('Error fetching users:', err);
    }
})

userRouter.patch('/requests/',async(req,res)=>{
    try {
        console.log("from delete")
        console.log(req.body)
        Promise.all([
        await Request.deleteMany({from_user_id:req.body.request.to}),
        await Request.deleteMany({from_user_id:req.body.request.from})] )

        // console.log(todos)
res.send(200)    } catch (err) {
        console.error('Error deleting requests:', err);
    }
})

userRouter.patch('/user/',async(req,res)=>{
    try {
        console.log("from patch")
       // console.log(req)
        Promise.all([
        await User.updateOne({_id:req.body.request.from},{$set:{partner_id:req.body.request.to}}),
        await User.updateOne({_id:req.body.request.to},{$set:{partner_id:req.body.request.from}})])
        // console.log(todos)
res.send(200)    } catch (err) {
        console.error('Error deleting requests:', err);
    }
})


userRouter.post('/users/request/',async(req,res)=>{
    try {
        const request = await Request.insertMany(req.body.request)
         console.log(req.body.request)

res.send(200)    } catch (err) {
        console.error('Error fetching todos:', err);
    }
})

// todosRouter.patch('/todos/:id',async(req,res)=>{
//     try {
//         console.log("from patch")
//         const todo=await Todo.findById(req.params.id)
//         const updatedtodo = await Todo.updateOne({_id: todo._id},{checked: !todo.checked})
//         const todos=await Todo.find()
// res.sendStatus(200).json(updatedtodo)   } catch (err) {
//         console.error('Error fetching todos:', err);
//     }
// })


module.exports= userRouter;