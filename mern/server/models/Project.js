const mongoose= require('mongoose');

const projectSchema = new mongoose.Schema({
    language: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    technologies: {
        type: String,
        required: false,
    },
    link: {
        type: String,
        required: false,
    },
    picture: {
        type: String,
        required: false,
    },
}, {
    timestamps: false
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;