// import PagesControls from '../controllers/routesControllers';
const express = require('express');
const router = express.Router();


router.get('/', (req, res) => res.render('login'));
router.get('/admin-login', (req, res) => res.render('admin-login'));
router.get('/registration', (req, res) => res.render('officers-panel'));
router.post('/login', (req, res) => {
    const {email, password } = req.body;
    console.log(req.body);
    res.render('officers-panel');
});
router.post('/admin-panel', (req, res) => 
res.render('admin-panel'));

router.post('/addUser', (req, res) => {
    console.log(req.body);
    res.send('User added successfully');
});
module.exports = router;
