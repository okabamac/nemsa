const User = require('../models/User');
const RoutineTest = require('../models/RoutineTest');
const TypeTest = require('../models/TypeTest');
const ReCertification = require('../models/ReCertification');
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

const upload = multer({
    storage
}).single('avatar');

const PagesControls = {
    getHomePage: function (req, res) {
        res.render('login');
    },

    adminLogin: function (req, res) {
        res.render('admin-login');
    },

    login: function (req, res) {
        res.render('officers-panel', {
            user: req.body.email
        });
    },

    adminPanel: function (req, res) {
        res.render('admin-panel', {
            user: "Administrator "
        });
    },

    admin: function (req, res) {
        res.render('admin-panel');
    },

    addUser: function (req, res) {
        upload(req, res, (err) => {
            if (err) {
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

    },

    routineTest: function (req, res) {
        const {
            radio,
            vendorName,
            vendorEmail,
            vendorPhone,
            yom,
            meterModel,
            meterType,
            meterClass,
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
        routineTest.dateRoutineTest = dateRoutineTest;
        routineTest.expDate = expDate;
        routineTest.tariffCharges = tariffCharges;
        routineTest.observation = observation;
        if (seal1 == "") {
            routineTest.crimpSeal = seal2;
        } else {
            routineTest.crimpSeal = seal1;
        }
        routineTest.save()
            .then(() => {
                res.status(200).send({
                    msg: `Routine Test has been added successfully`
                });
            })
            .catch(err => res.status(401).send({
                msg: err
            }));
    },
    typeTest: function (req, res) {
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
        typeTest.save()
            .then(() => {
                res.status(200).send({
                    msg: `Type Test has been added successfully`
                });
            })
            .catch(err => res.status(401).send({
                msg: err
            }));
    },
    reCertification: function (req, res) {
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
        if (seal1 == "") {
            crimpSeal = seal2;
        } else {
            crimpSeal = seal1;
        }
        reCertification.save()
            .then(() => {
                res.status(200).send({
                    msg: `Recertification has been added successfully`
                });
            })
            .catch(err => res.status(401).send({
                msg: err
            }));
    }

};
module.exports = PagesControls;