const express = require('express');
const cors = require('cors');
const todoroutes = require("./todoRoutes.js")
const userroutes = require("./userRoutes")

require("./mongoconnect")
const User = require('./usermodel.js')

const app = express();

app.use(express.json())

app.use(cors());
app.post('/login', async(req, res) => {
    // console.log(req.body.creds.username)
    const usr= await User.find(req.body.creds)
    // console.log(usr)
    if(usr.length !== 0)

    res.send( usr[0]);
    else{
      console.log("wrong creds")
    }
  });

  app.post('/signup', async(req, res) => {
    const usr = await User.insertMany(req.body.creds)
    res.send(usr[0]);
  });

  
app.use(express.json());
app.use(todoroutes)
app.use(userroutes)

module.exports=app;
