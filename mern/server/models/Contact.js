const mongoose= require('mongoose');

const contactSchema = new mongoose.Schema({
    language: {
        type: String,
        required: true,
        unique: true,
    },
    title1: {
        type: String,
        required: true,
    },
    title2: {
        type: String,
        required: true,
    },
    getInTouch: {
        type: String,
        required: true,
    },
    text1: {
        type: String,
        required: true,
    },
    text2: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    mail: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    send: {
        type: String,
        required: true,
    },
}, {
    timestamps: false
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;