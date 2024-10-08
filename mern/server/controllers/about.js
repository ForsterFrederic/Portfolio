const About = require('../models/About');

exports.getAbout = async (req, res) => {
    const language = req.params.language;
    try {
        const about = await About.findOne({ language: language });
        if (about) {
            res.status(200).json(about);
        } else {
            res.status(404).json({ error: 'About not found' });
        }
    } catch (err) {
        console.error('Error fetching about:', err);
        res.status(500).json({ error: 'Failed to fetch about' });
    }
};

exports.createAbout = async (req, res) => {
    const body = req.body;
    try {
        const existingAbout = await About.findOne({ language: body.language });
        if (existingAbout) {
            return res.status(400).json({ error: 'About with this language already exists' });
        }
        const about = new About(body);
        await about.save();
        res.status(201).json(about);
    } catch (err) {
        console.error('Error during about creation:', err);
        res.status(500).json({ error: err.message });
    }
};