const express = require('express');
app = express();
const port  = 7000;
require("./config/coonection")
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