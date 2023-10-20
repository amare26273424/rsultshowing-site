const express = require("express")
const app = express()
const fs = require('fs')
const bodyParser = require('body-parser')
const resultcollection = require("./server")
require('dotenv').config();




const htmlcontent = fs.readFileSync('./public/get.html','utf-8')
const getHtml = fs.readFileSync('./public/index.html','utf-8')

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());







app.get('/',(req,res)=>{

      res.send(getHtml)
})





async function get(req,res){

  const id = req.query.idnumber

const data = await resultcollection.findOne({idnumber:id});

 console.log(data)

 if(data){

const totalresult =  data.bio + data.che + data.math + data.eng

  let allhtmlcontent =  htmlcontent.replace('{{%bio%}}',data.bio)
          allhtmlcontent = allhtmlcontent.replace('{{%che%}}',data.che)
          allhtmlcontent = allhtmlcontent.replace('{{%math%}}',data.math)
          allhtmlcontent = allhtmlcontent.replace('{{%eng%}}',data.eng)
          allhtmlcontent = allhtmlcontent.replace('{{%total%}}',(totalresult))
     if(totalresult < 200)
     allhtmlcontent = allhtmlcontent.replace('{{}}',`haha you got ${totalresult} /400 you are stupid`)
   else
   allhtmlcontent = allhtmlcontent.replace('{{}}',``)




          res.send(allhtmlcontent)
 }
 else{
   res.send('id is not found')
 }
}



async function getAll(req,res){
const data = await resultcollection.find({});


//  console.log(data)

//  if(data){

// const totalresult =  data.bio + data.che + data.math + data.eng

//   let allhtmlcontent =  htmlcontent.replace('{{%bio%}}',data.bio)
//           allhtmlcontent = allhtmlcontent.replace('{{%che%}}',data.che)
//           allhtmlcontent = allhtmlcontent.replace('{{%math%}}',data.math)
//           allhtmlcontent = allhtmlcontent.replace('{{%eng%}}',data.eng)
//           allhtmlcontent = allhtmlcontent.replace('{{%total%}}',(totalresult))
//      if(totalresult < 200)
//      allhtmlcontent = allhtmlcontent.replace('{{}}',`haha you got ${totalresult} /400 you are stupid`)
//    else
//    allhtmlcontent = allhtmlcontent.replace('{{}}',``)




          res.send(data.length)
//  }
//  else{
//    res.send('id is not found')
//  }
}


app.use(express.static('./public'))

app.get("/get",get)
app.get('/get/all',getAll)


async function post(req,res){


  const data = req.body
  const id = req.body.idnumber


const check = await resultcollection.findOne({idnumber:id});
console.log(check)

if(check){
res.send('this id is already registered');
}
else{
resultcollection.insertMany(data)
 .then(() => {
   console.log("entered");
   res.send("you have suucessfully entered to database");
 })
 .catch(err => console.log(err));
}
}






app.post('/post',post)








app.listen(5000,()=>{
    console.log(`srver is running ${5000}`)
})