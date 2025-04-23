const mongoose = require('mongoose');

const bookappSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a name"],
    },
    email: {
        type: String,
        required: [true, "Please add an email"],
        unique: true,
    },
    phone: {
        type: String,
        required: [true, "Please add a phone number"],
        unique: true,
    },
    service: {
        type: String,
        required: [true, "Please add a service"],
    },
    date:{
        type: String,
        required: [true, "Please add a date"],
    },
    time:{
        type: String,
        required: [true, "Please add a time"],
    },
    addres: {
        type: String,
        required: [true, "Please add a address"],
    },
   
   
},
{
    timestamps: true,
});

module.exports = mongoose.model("BookApp", bookappSchema);