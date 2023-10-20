const mongoose = require("mongoose")
require('dotenv').config();


mongoose.connect('mongodb+srv://amarehagos26273424:26273424@mernproject.ww2aaqx.mongodb.net/resultdb?retryWrites=true&w=majority').then(console.log("db connceted")).catch((err)=>{
    console.log(err)
})

const newschema = new mongoose.Schema({
    idnumber:{
        type:Number,
        unique:true,
    },
    name:{
        type:String
    },
   bio:{
        type:Number
    },
   che:{
        type:Number
    },
   math:{
        type:Number
    },
  eng:{
        type:Number
    },
})
const resultcollections = mongoose.model("resultcollections",newschema)
module.exports= resultcollections