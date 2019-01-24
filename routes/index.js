const PagesControls = require('../controllers/routesControllers');
const express = require('express');
const router = express.Router();
const {ensureAuthenticatedOffice, ensureAuthenticatedAdmin } = require('../config/auth');

router.get('/', PagesControls.getHomePage);
router.get('/login', PagesControls.loginOffice);
router.get('/adminLogin', PagesControls.loginAdmin);

router.get('/verify/:serial', PagesControls.verify);
router.get('/image/:id', PagesControls.getImage);

router.get('/officersDashboard', ensureAuthenticatedOffice, PagesControls.officerHome);
router.get('/adminDashboard', ensureAuthenticatedAdmin, PagesControls.adminHome);

router.post('/loginOffice', PagesControls.officerLoginPost);
router.post('/loginAdmin', PagesControls.adminLoginPost);

router.post('/addUser',  PagesControls.addUser);


router.post('/routineTest', PagesControls.routineTest);
router.post('/typeTest', PagesControls.typeTest);
router.post('/reCertification', PagesControls.reCertification);




module.exports = router;