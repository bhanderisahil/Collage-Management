const { default: mongoose, Mongoose } = require("mongoose");

const studdata = mongoose.Schema({
    // corse_id: {
    //     type: mongoose.Schema.Types.ObjectId
    // },
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
    corse: {
        type: mongoose.Schema.Types.String, 
    }

})

const student = mongoose.model("student", studdata);


module.exports = student;