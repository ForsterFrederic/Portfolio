const Experience = require('../models/Experience');

exports.getExperience = async (req, res) => {
    const language = req.params.language;
    try {
        const experience = await Experience.find({ language: language });
        if (experience) {
            res.status(200).json(experience);
        } else {
            res.status(404).json({ error: 'Experience not found' });
        }
    } catch (err) {
        console.error('Error fetching experience:', err);
        res.status(500).json({ error: 'Failed to fetch experience' });
    }
};

exports.createExperience = async (req, res) => {
    const body = req.body;
    try {
        const experience = new Experience(body);
        await experience.save();
        res.status(201).json(experience);
    } catch (err) {
        console.error('Error during experience creation:', err);
        res.status(500).json({ error: err.message });
    }
};