const { default: mongoose, Mongoose } = require("mongoose");

const studdata = mongoose.Schema({
    StaffId: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'staff'
    },
    CorseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'corse'
    },
    name: {
        type: String,
    },
    date: {
        type: String,
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    phone: {
        type: Number,
    },
    city: {
        type: String,
    },
    token :{
        type: String,
        default :" "
    }
    // corse: {
    //     type: mongoose.Schema.Types.String, 
    // }

})

const student = mongoose.model("student", studdata);


module.exports = student;