const mongoose= require('mongoose');

const presentationSchema = new mongoose.Schema({
    language: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    freelance: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: true,
    },
    numberYearsExperience: {
        type: String,
        required: true,
    },
    textYearsExperience: {
        type: String,
        required: true,
    },
    numberSuccessfulProjects: {
        type: String,
        required: true,
    },
    textSuccessfulProjects: {
        type: String,
        required: true,
    },
    downloadCV: {
        type: String,
        required: true,
    },
    goToCompetencies: {
        type: String,
        required: true,
    }
}, {
    timestamps: false
});

const Presentation = mongoose.model('Presentation', presentationSchema);

module.exports = Presentation;