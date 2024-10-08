const mongoose= require('mongoose');

const navigationSchema = new mongoose.Schema({
    language: {
        type: String,
        required: true,
        unique: true,
    },
    home: {
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
    experience: {
        type: String,
        required: true,
    },
    projects: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
        required: true,
    },
}, {
    timestamps: false
});

const Navigation = mongoose.model('Navigation', navigationSchema);

module.exports = Navigation;