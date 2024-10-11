const Project = require('../models/Project');
const path = require('path');
const fs = require('fs');

exports.getProject = async (req, res) => {
    const language = req.params.language;

    try {
        let query = {};

        if (language) {
            query = { language: language };
        }

        const projects = await Project.find(query);

        if (projects.length > 0) {
            res.status(200).json(projects);
        } else {
            res.status(404).json({ error: 'No projects found' });
        }
    } catch (err) {
        console.error('Error fetching projects:', err);
        res.status(500).json({ error: 'Failed to fetch projects' });
    }
};

exports.createProject = async (req, res) => {
    const { language, title, description, duration, technologies, link } = req.body;
    const picturePath = req.file ? req.file.path : null;

    try {
        const project = new Project({
            language,
            title,
            description,
            duration,
            technologies,
            link,
            picture: picturePath
        });
        await project.save();
        res.status(201).json({ success: true, project });
    } catch (err) {
        console.error('Error during project creation:', err);
        res.status(500).json({ success: false, error: 'Failed to create project' });
    }
};

exports.updateProject = async (req, res) => {
    const projectId = req.params.id;
    const { language, title, description, duration, technologies, link } = req.body;
    const picturePath = req.file ? req.file.filename : null; // Store just the filename

    try {
        const project = await Project.findById(projectId);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // Update project fields
        project.language = language || project.language;
        project.title = title || project.title;
        project.description = description || project.description;
        project.duration = duration || project.duration;
        project.technologies = technologies || project.technologies;
        project.link = link || project.link;

        // If there's a new picture, delete the old one
        if (picturePath) {
            if (project.picture) {
                const oldPicturePath = path.join(__dirname, '../uploads', path.basename(project.picture));
                try {
                    console.log(`Deleting old image at: ${oldPicturePath}`);
                    await fs.promises.unlink(oldPicturePath);
                } catch (err) {
                    console.error('Failed to delete old image:', err);
                    return res.status(500).json({ message: 'Error deleting old image', error: err.message });
                }
            }
            project.picture = "uploads/"+picturePath; // Save the new filename
        }

        await project.save();
        res.status(200).json({ success: true, project });
    } catch (err) {
        console.error('Error during project update:', err);
        res.status(500).json({ success: false, error: 'Failed to update project' });
    }
};

exports.deleteProject = async (req, res) => {
    try {
        const projectId = req.params.id;
        const project = await Project.findByIdAndDelete(projectId);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // Delete the picture if it exists
        if (project.picture) {
            const picturePath = path.join(__dirname, '../uploads', path.basename(project.picture));
            console.log('Deleting picture at:', picturePath);

            if (fs.existsSync(picturePath)) {
                try {
                    await fs.promises.unlink(picturePath);
                    console.log('Image deleted successfully');
                } catch (err) {
                    console.error('Failed to delete image:', err);
                    return res.status(500).json({ message: 'Error deleting image', error: err.message });
                }
            } else {
                console.warn('Image file not found for deletion');
            }
        }

        res.json({ message: 'Project deleted successfully' });
    } catch (error) {
        console.error('Error deleting project:', error);
        res.status(500).json({ message: 'Error deleting project', error });
    }
};

