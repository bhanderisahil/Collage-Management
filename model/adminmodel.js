const { default: mongoose } = require("mongoose");

 const adminscema = mongoose.Schema({
    name : {
        type : String,
    },
    email : {
        type : String,
    },
    password : {
        type : String,
    },
    confirmpassword : {
        type : String,
    },
 })

 const admin = mongoose.model("admin",adminscema);


 module.exports = admin;