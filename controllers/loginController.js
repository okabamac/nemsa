const User = require('../models/User');
const passport = require('passport');



const LoginControls = {
    getHomePage: (req, res) => {
        res.render('verification');
    },

    loginOffice: (req, res) => {
        req.logout();
        res.render('login', {
            message: ''
        });
    },
    loginAdmin: (req, res) => {
        req.logout();
        res.render('admin-login', {
            message: ''
        });
    },
    officerHome: (req, res) => {
        res.render('officers-panel', {
            userName: req.user.name.first + ' ' + req.user.name.last,
            userEmail: req.user.staffEmail,
            userID: req.user.staffID,
            id: req.user._id
        });
    },

    adminHome: (req, res) => {
        if (req.user.admin == 'yes') {
            res.render('admin-panel', {
                userName: req.user.name.first + ' ' + req.user.name.last,
                id: req.user._id
            });
        } else {
            res.render('admin-login', {
                message: 'Sorry, you do not have access'
            });
        }
    },

    officerLoginPost: (req, res, next) => {
        passport.authenticate('local', {
            successRedirect: '/officersDashboard',
            failureRedirect: '/login',
            failureFlash: true
        })(req, res, next);
    },

    adminLoginPost: (req, res, next) => {
        passport.authenticate('local', {
            successRedirect: '/adminDashboard',
            failureRedirect: '/adminLogin',
            failureFlash: true
        })(req, res, next);
    },


    getImage: (req, res) => {
        User.findById(req.params.id, (err, data) => {
            if (!err) {
                res.contentType(data.avatar.contentType);
                res.send(data.avatar.data);
            }
        });
    },
};
module.exports = LoginControls;