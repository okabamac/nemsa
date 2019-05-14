import express from 'express';
import LoginControls from '../controllers/loginController';
import VerificationControls from '../controllers/verificationController';
import UserControls from '../controllers/userController';
import TestControls from '../controllers/testController';
import ReportControls from '../controllers/reportController';
import joiHelper from '../controllers/joiHelper';
import {
  ensureAuthenticatedOffice,
  ensureAuthenticatedAdmin,
} from '../config/auth';

import {
  routineTestSchema,
  typeTestSchema,
  reCertificationSchema,
} from '../controllers/validation';

const router = express.Router();


router.get('/', LoginControls.getHomePage);
router.get('/login', LoginControls.loginOffice);
router.get('/adminLogin', LoginControls.loginAdmin);
router.get('/resetPassword', LoginControls.resetPassword);

router.get('/verify/:serial', VerificationControls.verify);
router.get('/image/:id', LoginControls.getImage);

router.get('/officersDashboard', ensureAuthenticatedOffice, LoginControls.officerHome);
router.get('/adminDashboard', ensureAuthenticatedAdmin, LoginControls.adminHome);

router.post('/loginOffice', LoginControls.officerLoginPost);
router.post('/loginAdmin', LoginControls.adminLoginPost);

router.post('/addUser', ensureAuthenticatedAdmin, UserControls.addUser);
router.post('/editUser', ensureAuthenticatedAdmin, UserControls.editUser);

router.post('/routineTest', ensureAuthenticatedOffice, joiHelper(undefined, routineTestSchema), TestControls.routineTest);
router.post('/typeTest', ensureAuthenticatedOffice, joiHelper(undefined, typeTestSchema), TestControls.typeTest);
router.post('/reCertification', ensureAuthenticatedOffice, joiHelper(undefined, reCertificationSchema), TestControls.reCertification);


router.post('/byState', ensureAuthenticatedAdmin, ReportControls.byState);
router.post('/byDate', ensureAuthenticatedAdmin, ReportControls.byDate);
router.post('/byBatch', ensureAuthenticatedAdmin, ReportControls.byBatch);


export default router;
