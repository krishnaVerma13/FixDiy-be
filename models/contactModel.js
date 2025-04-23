const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    username: {
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
    subject:{
        type: String,
        required: [true, "Please add a subject"],
    },
    message:{
        type: String,
        required: [true, "Please add a message"],
    }
},
    {
        timestamps: true,
});

module.exports = mongoose.model("Contact", contactSchema);