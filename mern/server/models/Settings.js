const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
    development: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: false,
});

const Settings = mongoose.model('Settings', settingsSchema);

module.exports = Settings;