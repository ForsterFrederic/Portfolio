const Settings = require('../models/Settings');

module.exports.toggleDevelopment = async (req, res) => {
    try {
        let settings = await Settings.findOne();

        if (!settings) {
            settings = new Settings({
                development: false,
            });
        }

        settings.development = !settings.development;

        await settings.save();

        res.status(200).json({
            message: 'Development environment toggled successfully',
            development: settings.development,
        });
    } catch (err) {
        console.error('Error toggling development environment:', err);
        res.status(500).json({ error: 'Failed to toggle development environment' });
    }
};

exports.getSettings = async (req, res) => {
    try {
        const settings = await Settings.findOne();

        if (!settings) {
            return res.status(404).json({ error: 'Settings not found' });
        }

        res.status(200).json(settings);
    } catch (err) {
        console.error('Error fetching settings:', err);
        res.status(500).json({ error: 'Failed to fetch settings' });
    }
};