const express = require('express');
const multer = require('multer');
const ProjectController = require('../controllers/project');
const PresentationController = require('../controllers/presentation');
const AboutController = require('../controllers/about');
const ContactController = require('../controllers/contact');
const NavigationController = require('../controllers/navigation');
const FooterController = require('../controllers/footer');
const SettingsController = require('../controllers/settings');
const CompetenciesController = require('../controllers/competencies');
const ExperienceController = require('../controllers/experience');
const CounterController = require('../controllers/counter');
const {join, resolve} = require("path");
const {existsSync, mkdirSync, rmdirSync} = require("fs");
const {launch} = require("puppeteer");
const sharp = require("sharp");

const router = express.Router();
const IS_PROD = process.env.IS_PROD;

const uploadPath = IS_PROD === "TRUE" ? join(__dirname, '..', 'uploads') : "uploads";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (!existsSync(uploadPath)) {
            mkdirSync(uploadPath);
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const filePath = `${Date.now()}-${file.originalname}`;
        cb(null, filePath);
    }
});

const upload = multer({ storage });

router.post('/generate-screenshots', async (req, res) => {
    try {
        const { url, projectNumber, login } = req.body;

        if (!url || !projectNumber) {
            return res.status(400).json({ message: 'URL, projectNumber, and login details are required' });
        }

        const devices = [
            { name: 'large-desktop', landscape: { width: 1366, height: 1024 } },
        ];

        const browser = await launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });
        const page = await browser.newPage();

        if (login?.url) {
            await page.goto(login.url, { waitUntil: 'networkidle2' });

            await page.type(login.fields.username, login.credentials.username);
            await page.type(login.fields.password, login.credentials.password);
            const loginButton = await page.$('button');
            if (loginButton) {
                const buttonText = await page.evaluate(button => button.textContent, loginButton);

                if (buttonText.includes("Se connecter")) {
                    await loginButton.click();
                } else {
                    console.error('Login button not found.');
                }
            } else {
                console.error('Login button not found.');
            }

            await page.waitForNavigation({ waitUntil: 'networkidle2' });
        }

        await page.goto(url, { waitUntil: 'networkidle2' });

        await new Promise(resolve => setTimeout(resolve, 6500));

        const outputDir = resolve(__dirname, `../../client/public/screenshots/project${projectNumber}`);
        if (existsSync(outputDir)) {
            rmdirSync(outputDir, { recursive: true });
        }

        mkdirSync(outputDir, { recursive: true });

        for (const device of devices) {
            try {
                if (device.landscape) {
                    await page.setViewport(device.landscape);
                    const landscapeScreenshotPath = join(outputDir, `${device.name}-landscape.webp`);
                    await page.screenshot({ path: landscapeScreenshotPath, type: 'webp', quality: 60 });
                }
            } catch (error) {
                console.error(`Error capturing screenshots for ${device.name}:`, error);
                return res.status(500).json({ message: `Failed to capture screenshot for ${device.name}`, error });
            }

            await page.evaluate(() => {
                return new Promise(resolve => setTimeout(resolve, 6500));
            });
        }

        await browser.close();
        res.status(200).json({ message: `Screenshots for project ${projectNumber} generated and optimized successfully!` });
    } catch (error) {
        console.error('Error generating screenshots:', error);
        res.status(500).json({ message: 'An error occurred while generating screenshots', error });
    }
});

// router.post('/generate-screenshots', async (req, res) => {
//     try {
//         const { url, projectNumber, login } = req.body;
//
//         if (!url || !projectNumber) {
//             return res.status(400).json({ message: 'URL, projectNumber, and login details are required' });
//         }
//
//         const devices = [
//             { name: 'large-desktop', landscape: { width: 1366, height: 1024 } },
//         ];
//
//         const browser = await launch({
//             headless: true,
//             args: ['--no-sandbox', '--disable-setuid-sandbox'],
//         });
//         const page = await browser.newPage();
//
//         if (login?.url) {
//             await page.goto(login.url, { waitUntil: 'networkidle2' });
//
//             await page.type(login.fields.username, login.credentials.username);
//             await page.type(login.fields.password, login.credentials.password);
//             const loginButton = await page.$('button');
//             if (loginButton) {
//                 const buttonText = await page.evaluate(button => button.textContent, loginButton);
//
//                 if (buttonText.includes("Se connecter")) {
//                     await loginButton.click();
//                 } else {
//                     console.error('Login button not found.');
//                 }
//             } else {
//                 console.error('Login button not found.');
//             }
//
//             await page.waitForNavigation({ waitUntil: 'networkidle2' });
//         }
//
//         await page.goto(url, { waitUntil: 'networkidle2' });
//
//         const outputDir = resolve(__dirname, `../../client/public/screenshots/project${projectNumber}`);
//         if (existsSync(outputDir)) {
//             rmdirSync(outputDir, { recursive: true });
//         }
//
//         mkdirSync(outputDir, { recursive: true });
//
//         await page.evaluate(() => {
//             return new Promise(resolve => setTimeout(resolve, 25000));
//         });
//
//         for (const device of devices) {
//             try {
//                 if (device.landscape) {
//                     await page.setViewport(device.landscape);
//                     const landscapeScreenshotPath = join(outputDir, `${device.name}-landscape.webp`);
//                     await page.screenshot({ path: landscapeScreenshotPath, type: 'webp', quality: 80 });
//                 }
//             } catch (error) {
//                 console.error(`Error capturing screenshots for ${device.name}:`, error);
//                 return res.status(500).json({ message: `Failed to capture screenshot for ${device.name}`, error });
//             }
//
//             await page.evaluate(() => {
//                 return new Promise(resolve => setTimeout(resolve, 25000));
//             });
//         }
//
//         await browser.close();
//         res.status(200).json({ message: `Screenshots for project ${projectNumber} generated and optimized successfully!` });
//     } catch (error) {
//         console.error('Error generating screenshots:', error);
//         res.status(500).json({ message: 'An error occurred while generating screenshots', error });
//     }
// });

router.get('/project/:language?', ProjectController.getProject);
router.post('/project', upload.single('picture'), ProjectController.createProject);
router.put('/project/:id', upload.single('picture'), ProjectController.updateProject);
router.delete('/project/:id', ProjectController.deleteProject);

router.get('/presentation/:language?', PresentationController.getPresentation);
router.post('/presentation', PresentationController.createPresentation);

router.get('/about/:language?', AboutController.getAbout);
router.post('/about', AboutController.createAbout);

router.get('/contact/:language?', ContactController.getContact);
router.post('/contact', ContactController.createContact);

router.get('/navigation/:language?', NavigationController.getNavigation);
router.post('/navigation', NavigationController.createNavigation);

router.get('/footer/:language?', FooterController.getFooter);
router.post('/footer', FooterController.createFooter);

router.get('/competencies/:language?', CompetenciesController.getCompetencies);
router.post('/competencies', CompetenciesController.createCompetencies);

router.get('/experience/:language?', ExperienceController.getExperience);
router.post('/experience', ExperienceController.createExperience);
router.put('/experience/:id',  ExperienceController.updateExperience);
router.delete('/experience/:id', ExperienceController.deleteExperience);

router.get('/counter', CounterController.getCounter);
router.post('/counter', CounterController.incrementCounter);
router.delete('/counter', CounterController.resetCount);

router.get('/settings/development', SettingsController.toggleDevelopment);
router.get('/settings', SettingsController.getSettings);

module.exports = router;
