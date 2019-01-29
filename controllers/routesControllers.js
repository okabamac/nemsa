const User = require('../models/User');
const RoutineTest = require('../models/RoutineTest');
const TypeTest = require('../models/TypeTest');
const ReCertification = require('../models/ReCertification');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const passport = require('passport');

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
    storage: storage
}).single('avatar');


const PagesControls = {
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
            userName: req.user.firstName + ' ' + req.user.lastName,
            userEmail: req.user.staffEmail,
            userID: req.user.staffID,
            id: req.user._id
        });
    },

    adminHome: (req, res) => {
        if (req.user.admin == 'yes') {
            res.render('admin-panel', {
                userName: req.user.firstName + ' ' + req.user.lastName,
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
    addUser: (req, res) => {
        upload(req, res, (err) => {
            if (err instanceof multer.MulterError) {
                console.log(err);
            } else if (err) {
                res.send({
                    msg: `There is an error: ${err}`
                });
            } else {
                const {
                    firstName,
                    lastName,
                    staffEmail,
                    staffID,
                    password,
                    confirmPassword,
                    admin
                } = req.body;

                const errors = [];
                User.findOne({
                    staffEmail: staffEmail
                }, (err, existingUser) => {
                    if (existingUser === null) {
                        if (password !== confirmPassword) {
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
                        }
                        const user = new User();
                        user.firstName = firstName;
                        user.lastName = lastName;
                        user.staffEmail = staffEmail;
                        user.password = password;
                        user.staffID = staffID;
                        user.admin = admin;
                        user.avatar.data = fs.readFileSync(req.file.path);
                        user.avatar.contentType = req.file.mimetype;
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
                                    .catch(err =>
                                        res.status(401).send([{
                                            msg: err
                                        }])
                                    );
                            })
                        );
                    } else {
                        res.status(400).send([{
                            msg: 'Email is not available'
                        }]);
                    }
                });
            }
        });
    },

    editUser: (req, res) => {
        User.findOne({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            staffID: req.body.staffID
        }).then((staff) => {
            if (staff !== null) {
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

    routineTest: (req, res) => {
        const {
            radio,
            vendorName,
            vendorEmail,
            vendorPhone,
            yom,
            meterModel,
            meterType,
            meterClass,
            meterSerialNumber,
            seal1,
            seal2,
            dateRoutineTest,
            expDate,
            tariffCharges,
            observation
        } = req.body;

        const routineTest = new RoutineTest();
        routineTest.vendor = radio;
        routineTest.vendorName = vendorName;
        routineTest.vendorEmail = vendorEmail;
        routineTest.vendorPhone = vendorPhone;
        routineTest.yom = yom;
        routineTest.meterModel = meterModel;
        routineTest.meterType = meterType;
        routineTest.meterClass = meterClass;
        routineTest.meterSerialNumber = meterSerialNumber;
        routineTest.dateRoutineTest = dateRoutineTest;
        routineTest.expDate = expDate;
        routineTest.tariffCharges = tariffCharges;
        routineTest.observation = observation;
        if (seal1 == '') {
            routineTest.crimpSeal = seal2;
        } else {
            routineTest.crimpSeal = seal1;
        }
        routineTest
            .save()
            .then(() => {
                res.status(200).send({
                    msg: `Routine Test has been added successfully`
                });
            })
            .catch(err =>
                res.status(401).send({
                    msg: err
                })
            );
    },
    typeTest: (req, res) => {
        const {
            vendorName,
            country,
            typeDesign,
            meterMake,
            meterRating,
            testCertificationNumber,
            dateCertified,
            expDate,
            vendorEmail,
            vendorPhone,
            staffID,
            staffEmail,
            observation,
            radio
        } = req.body;
        const typeTest = new TypeTest();
        typeTest.vendorName = vendorName;
        typeTest.country = country;
        typeTest.typeDesign = typeDesign;
        typeTest.meterMake = meterMake;
        typeTest.meterRating = meterRating;
        typeTest.testCertificationNumber = testCertificationNumber;
        typeTest.dateCertified = dateCertified;
        typeTest.expDate = expDate;
        typeTest.vendorEmail = vendorEmail;
        typeTest.vendorPhone = vendorPhone;
        typeTest.staffID = staffID;
        typeDesign.staffEmail = staffEmail;
        typeTest.observation = observation;
        typeTest.remark = radio;
        typeTest
            .save()
            .then(() => {
                res.status(200).send({
                    msg: `Type Test has been added successfully`
                });
            })
            .catch(err =>
                res.status(401).send({
                    msg: err
                })
            );
    },
    reCertification: (req, res) => {
        const {
            disco,
            state,
            businessUnitName,
            customerName,
            customerAddress,
            customerPhone,
            customerEmail,
            yom,
            country,
            tariffClass,
            meterSerialNumber,
            seal1,
            seal2,
            dateRoutineTest,
            routineTestExpDate,
            dateLastRecertification,
            expDateAfterRecertification,
            tariffCharges,
            testMeasurement,
            observation
        } = req.body;

        const reCertification = new ReCertification();
        reCertification.disco = disco;
        reCertification.state = state;
        reCertification.businessUnitName = businessUnitName;
        reCertification.customerName = customerName;
        reCertification.customerAddress = customerAddress;
        reCertification.customerPhone = customerPhone;
        reCertification.customerEmail = customerEmail;
        reCertification.yom = yom;
        reCertification.country = country;
        reCertification.tariffClass = tariffClass;
        reCertification.meterSerialNumber = meterSerialNumber;
        reCertification.dateRoutineTest = dateRoutineTest;
        reCertification.routineTestExpDate = routineTestExpDate;
        reCertification.dateLastRecertification = dateLastRecertification;
        reCertification.expDateAfterRecertification = expDateAfterRecertification;
        reCertification.tariffCharges = tariffCharges;
        reCertification.testMeasurement = testMeasurement;
        reCertification.observation = observation;
        if (seal1 == '') {
            crimpSeal = seal2;
        } else {
            crimpSeal = seal1;
        }
        reCertification
            .save()
            .then(() => {
                res.status(200).send({
                    msg: `Recertification has been added successfully`
                });
            })
            .catch(err =>
                res.status(401).send({
                    msg: err
                })
            );
    },

    verify: (req, res) => {
        RoutineTest.findOne({
            meterSerialNumber: req.params.serial
        }).then(meter => {
            if (meter) {
                return res.status(200).send({
                    meter
                });
            } else {
                return res.status(400).send({
                    message: 'This meter does not exist in our database, please contact the nearest DISCO'
                });
            }
        }).catch(err => console.log(err));
    },
};
module.exports = PagesControls;