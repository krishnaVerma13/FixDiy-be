const mongoose = require('mongoose');

const serviceSchema = mongoose.Schema({
    spname: {
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
    addres: {
        type: String,
        required: [true, "Please add a address"],
    },
    service: {
        type: String,
        required: [true, "Please add a service"],
    },
    password: {
        type: String,
        required: [true, "Please add a password"],
    },
   
},
{
    timestamps: true,
});

module.exports = mongoose.model("Service", serviceSchema);