const Counter = require('../models/Counter');

exports.getCounter = async (req, res) => {
    try {
        const counter = await Counter.findOne();

        if (!counter) {
            return res.status(404).json({ error: 'Counter not found' });
        }

        res.status(200).json(counter);
    } catch (err) {
        console.error('Error fetching counter:', err);
        res.status(500).json({ error: 'Failed to fetch counter' });
    }
};


exports.incrementCounter = async (req, res) => {
    try {
        const counter = await Counter.findOne();

        if (!counter) {
            return res.status(404).json({ error: 'Counter not found' });
        }

        counter.count += 1;
        counter.total += 1;
        await counter.save();

        res.status(200).json(counter);
    } catch (err) {
        console.error('Error incrementing counter:', err);
        res.status(500).json({ error: 'Failed to increment counter' });
    }
};

exports.resetCount = async (req, res) => {
    try {
        const counter = await Counter.findOne();

        if (!counter) {
            return res.status(404).json({ error: 'Counter not found' });
        }

        counter.count = 0;
        await counter.save();

        res.status(200).json(counter);
    } catch (err) {
        console.error('Error resetting count:', err);
        res.status(500).json({ error: 'Failed to reset count' });
    }
};
