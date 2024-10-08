const mongoose= require('mongoose');

const footerSchema = new mongoose.Schema({
    language: {
        type: String,
        required: true,
        unique: true,
    },
    rights: {
        type: String,
        required: true,
    },
    mern: {
        type: String,
        required: true,
    },
}, {
    timestamps: false
});

const Footer = mongoose.model('Footer', footerSchema);

module.exports = Footer;