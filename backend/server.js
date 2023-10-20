const mongoose = require("mongoose")
require('dotenv').config();


mongoose.connect(process.env.DB_URL).then(console.log("db connceted")).catch((err)=>{
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