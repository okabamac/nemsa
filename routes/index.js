const PagesControls = require('../controllers/routesControllers');
const express = require('express');
const router = express.Router();


router.get('/', PagesControls.getHomePage);
router.get('/login', PagesControls.login);


router.get('/admin-login', PagesControls.adminLogin);
router.get('/verify/:serial', PagesControls.verify);

router.post('/login', PagesControls.officeDashboard);
router.post('/admin-dashboard', PagesControls.adminDashboard);

router.post('/addUser', PagesControls.addUser);
router.post('/routineTest', PagesControls.routineTest);
router.post('/typeTest', PagesControls.typeTest);
router.post('/reCertification', PagesControls.reCertification);

router.get('/image/:id', PagesControls.getImage);


module.exports = router;