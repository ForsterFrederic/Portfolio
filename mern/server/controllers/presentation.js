const Presentation = require('../models/Presentation');

exports.getPresentation = async (req, res) => {
    const language = req.params.language;
    try {
        const presentation = await Presentation.findOne({ language: language });
        if (presentation) {
            res.status(200).json(presentation);
        } else {
            res.status(404).json({ error: 'Presentation not found' });
        }
    } catch (err) {
        console.error('Error fetching presentation:', err);
        res.status(500).json({ error: 'Failed to fetch presentation' });
    }
};

exports.createPresentation = async (req, res) => {
    const body = req.body;
    try {
        const existingPresentation = await Presentation.findOne({ language: body.language });
        if (existingPresentation) {
            return res.status(400).json({ error: 'Presentation with this language already exists' });
        }
        const presentation = new Presentation(body);
        await presentation.save();
        res.status(201).json(presentation);
    } catch (err) {
        console.error('Error during presentation creation:', err);
        res.status(500).json({ error: err.message });
    }
};