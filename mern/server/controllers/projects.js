const Project = require('../models/Project');

exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json(projects);
    } catch (err) {
        console.error('Error fetching projects:', err);
        res.status(500).json({ error: 'Failed to fetch projects' });
    }
};

exports.createProject = async (req, res) => {
    const { name } = req.body;
    try {
        const project = new Project({ name });
        await project.save();
        res.status(201).json(project);
    } catch (err) {
        console.error('Error during project creation:', err);
        res.status(500).json({ error: err.message });
    }
};
