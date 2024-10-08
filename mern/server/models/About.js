const mongoose= require('mongoose');

const aboutSchema = new mongoose.Schema({
    language: {
        type: String,
        required: true,
        unique: true,
    },
    title: {
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
    text3: {
        type: String,
        required: true,
    },
}, {
    timestamps: false
});

const About = mongoose.model('About', aboutSchema);

module.exports = About;