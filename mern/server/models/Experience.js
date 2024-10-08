const mongoose= require('mongoose');

const experienceSchema = new mongoose.Schema({
    language: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    technologies: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: false,
    },
}, {
    timestamps: false
});

const Experience = mongoose.model('Experience', experienceSchema);

module.exports = Experience;