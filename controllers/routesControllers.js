const User = require('../models/User');
const bcrypt = require('bcryptjs');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, '/uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
});

const upload = multer({storage}).single('avatar');

const PagesControls = {
    getHomePage: function (req, res) {
        res.render('login');
    },

    adminLogin: function (req, res) {
        res.render('admin-login');
    },

    login: function (req, res) {
        res.render('officers-panel');
    },

    adminPanel: function (req, res) {
        res.render('admin-panel');
    },

    admin: function (req, res) {
        res.render('admin-panel');
    },

    addUser: function (req, res) {
        upload(req, res, (err) => {
            if(err){
                res.send({
                    msg: err
                });
            } else {
                    const errors = [];
        const {
            first_name,
            last_name,
            email,
            staff_id,
            password,
            confirm_password,
            avatar,
            admin
        } = req.body;
        console.log(req.file);
        if (password !== confirm_password) {
            errors.push({
                msg: 'Passwords do not match'
            });
        }
        if (password.length < 6) {
            errors.push({
                msg: 'Password is too weak'
            });
        }
        if (errors.length > 0) {
            res.status(400).send(errors);
        } else {
            const user = new User();
            user.first_name = first_name;
            user.last_name = last_name;
            user.email = email;
            user.password = password;
            // user.avatar = avatar;
            user.staff_id = staff_id;
            user.admin = admin;
            bcrypt.genSalt(10, (err, salt) => bcrypt.hash(user.password, salt, (err, hash) => {
                if (err) throw err;
                user.password = hash;
                user.save()
                    .then(() => {
                        res.status(200).send([{
                            msg: `Staff with ID ${staff_id} has been added successfully`
                        }]);
                    })
                    .catch(err => res.status(401).send({
                        msg: err
                    }));
            }));
        }
            }
        });
    
  }

};
module.exports = PagesControls;