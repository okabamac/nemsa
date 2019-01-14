const PagesControls =  require('../controllers/routesControllers');
const express = require('express');
const router = express.Router();


router.get('/', PagesControls.getHomePage);
router.get('/admin-login', PagesControls.adminLogin);
router.get('/registration', PagesControls.registration);
router.post('/login', PagesControls.login);
router.post('/admin-panel', PagesControls.adminPanel);

router.post('/addUser', PagesControls.addUser);
module.exports = router;
