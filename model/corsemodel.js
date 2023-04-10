const { default: mongoose } = require("mongoose");

 const corsescema = mongoose.Schema({
    name : {
        type : String,
    },
    time : {
        type : String,
    },
    fees : {
        type : String,
    },
    professer : {
        type : String,
    },
 })

 const corse = mongoose.model("corse",corsescema);


 module.exports = corse;