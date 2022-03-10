const mongoose = require('mongoose')
const personSchema=new mongoose.Schema({
name:{
    required:true,
    type:String
},
age:Number,
favoiriteFoods:[String]

})
module.exports=Person=mongoose.model("person",personSchema)