const Footer = require('../models/Footer');

exports.getFooter = async (req, res) => {
    const language = req.params.language;
    try {
        const footer = await Footer.findOne({ language: language });
        if (footer) {
            res.status(200).json(footer);
        } else {
            res.status(404).json({ error: 'Footer not found' });
        }
    } catch (err) {
        console.error('Error fetching footer:', err);
        res.status(500).json({ error: 'Failed to fetch footer' });
    }
};

exports.createFooter = async (req, res) => {
    const body = req.body;
    try {
        const existingFooter = await Footer.findOne({ language: body.language });
        if (existingFooter) {
            return res.status(400).json({ error: 'Footer with this language already exists' });
        }
        const footer = new Footer(body);
        await footer.save();
        res.status(201).json(footer);
    } catch (err) {
        console.error('Error during footer creation:', err);
        res.status(500).json({ error: err.message });
    }
};