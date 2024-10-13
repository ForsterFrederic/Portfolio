const Experience = require('../models/Experience');
const path = require("path");
const fs = require("fs");

exports.getExperience = async (req, res) => {
    const language = req.params.language;

    try {
        let query = {};

        if (language) {
            query = { language: language };
        }

        const experiences = await Experience.find(query);

        if (experiences.length > 0) {
            res.status(200).json(experiences);
        } else {
            res.status(404).json({ error: 'No experiences found' });
        }
    } catch (err) {
        console.error('Error fetching experiences:', err);
        res.status(500).json({ error: 'Failed to fetch experiences' });
    }
};

exports.createExperience = async (req, res) => {
    const { language, company, title, duration, description, technologies, url, position } = req.body;

    try {
        const experience = new Experience({
            language,
            company,
            title,
            duration,
            description,
            technologies,
            url,
            position
        });
        await experience.save();
        res.status(201).json({ success: true, experience });
    } catch (err) {
        console.error('Error during experience creation:', err);
        res.status(500).json({ success: false, error: 'Failed to create experience' });
    }
};

exports.updateExperience = async (req, res) => {
    const experienceId = req.params.id;
    const { language, company, title, duration, description,technologies, url, position } = req.body;

    try {
        const experience = await Experience.findById(experienceId);

        if (!experience) {
            return res.status(404).json({ message: 'Experience not found' });
        }

        experience.language = language || experience.language;
        experience.company = company || company.company;
        experience.title = title || experience.title;
        experience.duration = duration || experience.duration;
        experience.description = description || experience.description;
        experience.technologies = technologies || experience.technologies;
        experience.url = url || experience.url;
        experience.position = position !== undefined ? position : experience.position;



        await experience.save();
        res.status(200).json({ success: true, experience });
    } catch (err) {
        console.error('Error during experience update:', err);
        res.status(500).json({ success: false, error: 'Failed to update experience' });
    }
};

exports.deleteExperience = async (req, res) => {
    try {
        const experienceId = req.params.id;
        const experience = await Experience.findByIdAndDelete(experienceId);

        if (!experience) {
            return res.status(404).json({ message: 'Experience not found' });
        }

        res.json({ message: 'Experience deleted successfully' });
    } catch (error) {
        console.error('Error deleting experience:', error);
        res.status(500).json({ message: 'Error deleting experience', error });
    }
};