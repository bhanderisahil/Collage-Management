const { default: mongoose } = require("mongoose");

 const staffscema = mongoose.Schema({
    CorseId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'corse',
        require : true
    },
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
    isactive :{
        type : Number,
        required : true
    }
   
 })

 const staff = mongoose.model("staff",staffscema);


 module.exports = staff;