const Competencies = require('../models/Competencies');

exports.getCompetencies = async (req, res) => {
    const language = req.params.language;
    try {
        const competencies = await Competencies.findOne({ language: language });
        if (competencies) {
            res.status(200).json(competencies);
        } else {
            res.status(404).json({ error: 'Competencies not found' });
        }
    } catch (err) {
        console.error('Error fetching competencies:', err);
        res.status(500).json({ error: 'Failed to fetch competencies' });
    }
};

exports.createCompetencies = async (req, res) => {
    const body = req.body;
    try {
        const existingCompetencies = await Competencies.findOne({ language: body.language });
        if (existingCompetencies) {
            return res.status(400).json({ error: 'Competencies with this language already exists' });
        }
        const competencies = new Competencies(body);
        await competencies.save();
        res.status(201).json(competencies);
    } catch (err) {
        console.error('Error during competencies creation:', err);
        res.status(500).json({ error: err.message });
    }
};