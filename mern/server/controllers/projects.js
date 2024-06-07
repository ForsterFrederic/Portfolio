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
    console.log('Request body:', req.body); // Debugging line
    try {
        const project = new Project({ name });
        await project.save();
        console.log('Project created:', project); // Debugging line
        res.status(201).json(project);
    } catch (err) {
        console.error('Error during project creation:', err); // Debugging line
        res.status(500).json({ error: err.message });
    }
};
