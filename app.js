const express = require('express');
app = express();
const port  = 7000;

const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://bhanderisahil:sahil%40123@cluster0.vttnglj.mongodb.net/collage",{
    useNewUrlParser : true,
    useUnifiedTopology : true
}).then(()=>{
    console.log("coonection successful");
}).catch((err)=>{
    console.log("connection failed",err);
})





var cookieParser = require('cookie-parser')

const adminrouter = require("./router/adminrouter")
const staffrouter = require("./router/staffrouter")
const studentrouter = require("./router/studentrouter")
const path = require('path');
const { urlencoded } = require('express');
app.use(express.json());


app.set('view engine', 'ejs');
app.set(path.join(__dirname, "views"));
app.use(urlencoded())


app.use(cookieParser())
app.use(adminrouter)
app.use(studentrouter)
app.use(staffrouter)
app.get("/",function(req,res){
    return res.render("index") 
})
app.listen(port,(()=>{
    console.log(`server is running port ${port}`);
}))