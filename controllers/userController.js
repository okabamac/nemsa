const User = require('../models/User');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
// const passport = require('passport');
const {
    userSchema
} = require('./validation');


const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname + '/../uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1 * 256 * 1024 }
}).single('avatar');


const UserControls = {
    addUser: (req, res) => {
        upload(req, res, (err) => {
            if (err instanceof multer.MulterError) {
                console.log(err.message);
               return res.status(400).send({
                    msg: `There is an error: ${err.message}`
                });
            } else if (err) {
               return res.status(400).send({
                    msg: `There is an error: ${err.message}`
                });
            } else {
                console.log(req.file);
                userSchema
                    .validate(req.body, {
                        abortEarly: false
                    })
                    .then(validatedCredentials => {
                        if(req.file.mimetype) {
                             const {
                            firstName,
                            lastName,
                            staffEmail,
                            staffID,
                            password,
                            confirmPassword,
                            admin
                        } = validatedCredentials;
                        
               
                User.findOne({
                    staffEmail: staffEmail
                }, (err, existingUser) => {
                    if (existingUser === null) {
                        // Creating one user.
                        let user = new User({
                            name: {
                                first: firstName,
                                last: lastName
                            },
                            staffID: staffID,
                            staffEmail: staffEmail,
                            password: password,
                            admin: admin,
                            avatar: {
                                data: fs.readFileSync(req.file.path),
                                contentType: req.file.mimetype
                            }
                        });
                        bcrypt.genSalt(10, (err, salt) =>
                            bcrypt.hash(user.password, salt, (err, hash) => {
                                if (err) throw err;
                                user.password = hash;
                                user
                                    .save()
                                    .then(() => {
                                        res.status(200).send([{
                                            msg: `Staff with ID ${staffID} has been added successfully`
                                        }]);
                                    })
                                    .catch(err => {
                                        console.log(err);
                                        res.status(401).send([{
                                            msg: err
                                        }]);
                                    });
                            })
                        );
                    } else {
                      return res.status(400).send([{
                            msg: 'Email is not available'
                        }]);
                    }
                });

                        } else {
                            return res.status(400).send({
                            msg: `Please upload an image`
                        });
                        }
                    })
                    .catch(validationError => {
                        const errorMessage = validationError.details.map(d => d.message);
                        return res.status(400).send({
                            msg: `${errorMessage[0]}`
                        });
                    });
            }
        });
    },

    editUser: (req, res) => {
        User.findOne({
            name: {
                first: req.body.firstName,
                last: req.body.lastName
            },
            staffID: req.body.staffID
        }).then((staff) => {
            if (staff) {
                return res.status(200).send({
                    staff
                });
            } else {
                return res.status(400).send({
                    message: 'One of the fields is incorrect or this staff does not exist'
                });
            }
        }).catch((err) => console.log(err));
    },
};

module.exports = UserControls;