const LoginControls = require('../controllers/loginController');
const VerificationControls = require('../controllers/verificationController');
const UserControls = require('../controllers/userController');
const TestControls = require('../controllers/testController');
const express = require('express');
const router = express.Router();
const {
    ensureAuthenticatedOffice,
    ensureAuthenticatedAdmin
} = require('../config/auth');

router.get('/', LoginControls.getHomePage);
router.get('/login', LoginControls.loginOffice);
router.get('/adminLogin', LoginControls.loginAdmin);

router.get('/verify/:serial', VerificationControls.verify);
router.get('/image/:id', LoginControls.getImage);

router.get('/officersDashboard', ensureAuthenticatedOffice, LoginControls.officerHome);
router.get('/adminDashboard', ensureAuthenticatedAdmin, LoginControls.adminHome);

router.post('/loginOffice', LoginControls.officerLoginPost);
router.post('/loginAdmin', LoginControls.adminLoginPost);

router.post('/addUser', UserControls.addUser);
router.post('/editUser', UserControls.editUser);

router.post('/routineTest', TestControls.routineTest);
router.post('/typeTest', TestControls.typeTest);
router.post('/reCertification', TestControls.reCertification);




module.exports = router;