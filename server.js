const express = require('express')
const mongoose = require('mongoose')
const app =express();

//concection DB with server
const mongoURI ='mongodb+srv://ahmed:ahmed@cluster0.fl6qk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongoose.connect(mongoURI,(err)=>{
    err ? console.log(err) : console.log("data base is connected");
})

//parse the data
app.use(express.json());
app.use("/person",require("./routers/Router"))



const port=5000;
app.listen(port,(err)=>{
    err ? console.log(err) : console.log("server is running on port :",port)
})