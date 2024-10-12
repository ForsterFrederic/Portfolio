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
    createdAt: {
        type: Date,
        default: Date.now,
    },
    lastResetAt: {
        type: Date,
        default: null,
    },
}, {
    timestamps: false
});

const Counter = mongoose.model('Counter', counterSchema);

module.exports = Counter;
