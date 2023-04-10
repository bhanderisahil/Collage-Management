const { default: mongoose } = require("mongoose");

 const staffscema = mongoose.Schema({
    name : {
        type : String,
    },
    email : {
        type : String,
    },
    password : {
        type : String
    },
    phone : {
        type : String,
    },
    employeetype : {
        type : String,
    },
   
 })

 const staff = mongoose.model("staff",staffscema);


 module.exports = staff;