const express = require('express');
const ProjectsController = require('../controllers/projects');
const router = express.Router();

router.get('/projects', ProjectsController.getProjects);
router.post('/projects', ProjectsController.createProject);

module.exports = router;
