const mongoose= require('mongoose');

const counterSchema = new mongoose.Schema({
    total: {
        type: Number,
        required: true,
    },
    count: {
        type: Number,
        required: true,
    },
}, {
    timestamps: false
});

const Counter = mongoose.model('Counter', counterSchema);

module.exports = Counter;