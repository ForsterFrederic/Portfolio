const mongoose = require('mongoose');

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
    top: {
        type: String,
        required: true,
    },
    resume: {
        type: String,
        required: true,
    },
    call: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
        required: true,
    },
    info: {
        type: String,
        required: true,
    },
    menu: {
        type: String,
        required: true,
    },
    social: {
        type: String,
        required: true,
    },
    mernTitle: {
        type: String,
        required: true,
    },
    about: {
        type: String,
        required: true,
    },
    competencies: {
        type: String,
        required: true,
    },
    experiences: {
        type: String,
        required: true,
    },
    home: {
        type: String,
        required: true,
    },
    mail: {
        type: String,
        required: true,
    },
    privacy: {
        type: String,
        required: true,
    },
    projects: {
        type: String,
        required: true,
    },
    terms: {
        type: String,
        required: true,
    },
}, {
    timestamps: false
});

const Footer = mongoose.model('Footer', footerSchema);

module.exports = Footer;