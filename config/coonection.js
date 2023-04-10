const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
mongoose.connect("mongodb://127.0.0.1:27017/collage").then(()=>{
    console.log("connection is successful");
}).catch((error)=>{
    console.log(error);
});