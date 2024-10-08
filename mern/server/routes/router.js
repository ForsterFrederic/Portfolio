const express = require('express');
const multer = require('multer');
const ProjectController = require('../controllers/project');
const PresentationController = require('../controllers/presentation');
const AboutController = require('../controllers/about');
const ContactController = require('../controllers/contact');
const NavigationController = require('../controllers/navigation');
const FooterController = require('../controllers/footer');
const CompetenciesController = require('../controllers/competencies');
const ExperienceController = require('../controllers/experience');
const CounterController = require('../controllers/counter');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

router.get('/project/:language', ProjectController.getProject);
router.post('/project', upload.single('picture'), ProjectController.createProject);
router.put('/project/:id', upload.single('picture'), ProjectController.updateProject);
router.delete('/project/:id', ProjectController.deleteProject);

router.get('/presentation/:language', PresentationController.getPresentation);
router.post('/presentation', PresentationController.createPresentation);

router.get('/about/:language', AboutController.getAbout);
router.post('/about', AboutController.createAbout);

router.get('/contact/:language', ContactController.getContact);
router.post('/contact', ContactController.createContact);

router.get('/navigation/:language', NavigationController.getNavigation);
router.post('/navigation', NavigationController.createNavigation);

router.get('/footer/:language', FooterController.getFooter);
router.post('/footer', FooterController.createFooter);

router.get('/competencies/:language', CompetenciesController.getCompetencies);
router.post('/competencies', CompetenciesController.createCompetencies);

router.get('/experience/:language', ExperienceController.getExperience);
router.post('/experience', ExperienceController.createExperience);

router.get('/counter', CounterController.getCounter);
router.post('/counter', CounterController.incrementCounter);
router.delete('/counter', CounterController.resetCount);

module.exports = router;
