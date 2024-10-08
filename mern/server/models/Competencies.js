const mongoose= require('mongoose');

const competenciesSchema = new mongoose.Schema({
    language: {
        type: String,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
    },
    languages: {
        type: String,
        required: true,
    },
    frameworks: {
        type: String,
        required: true,
    },
    database: {
        type: String,
        required: true,
    },
    tools: {
        type: String,
        required: true,
    },
    jetbrains: {
        type: String,
        required: true,
    },
    adobe: {
        type: String,
        required: true,
    },
}, {
    timestamps: false
});

const Competencies = mongoose.model('Competencies', competenciesSchema);

module.exports = Competencies;