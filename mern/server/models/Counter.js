const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
    total: {
        type: Number,
        required: true,
    },
    count: {
        type: Number,
        required: true,
    },
    localisation: {
        type: [
            {
                date: String,
                city: String,
                country: String,
                ip: String,
                loc: String,
                org: String,
                region: String,
                timezone: String,
                timestamp: { type: Date, default: Date.now },
            },
        ],
        default: [],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    lastResetAt: {
        type: Date,
        default: null,
    },
}, {
    timestamps: false,
});

const Counter = mongoose.model('Counter', counterSchema);

module.exports = Counter;