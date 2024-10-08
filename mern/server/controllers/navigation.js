const Navigation = require('../models/Navigation');

exports.getNavigation = async (req, res) => {
    const language = req.params.language;
    try {
        const navigation = await Navigation.findOne({ language: language });
        if (navigation) {
            res.status(200).json(navigation);
        } else {
            res.status(404).json({ error: 'Navigation not found' });
        }
    } catch (err) {
        console.error('Error fetching navigation:', err);
        res.status(500).json({ error: 'Failed to fetch navigation' });
    }
};

exports.createNavigation = async (req, res) => {
    const body = req.body;
    try {
        const existingNavigation = await Navigation.findOne({ language: body.language });
        if (existingNavigation) {
            return res.status(400).json({ error: 'Navigation with this language already exists' });
        }
        const navigation = new Navigation(body);
        await navigation.save();
        res.status(201).json(navigation);
    } catch (err) {
        console.error('Error during navigation creation:', err);
        res.status(500).json({ error: err.message });
    }
};