const User = require("../models/User");
const RoutineTest = require("../models/RoutineTest");
const TypeTest = require("../models/TypeTest");
const ReCertification = require("../models/ReCertification");
const bcrypt = require("bcryptjs");
const fs = require('fs');
const path = require("path");

const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname + "/../uploads"));
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
    }
});

const upload = multer({
    storage: storage
}).single("avatar");

const PagesControls = {
    getHomePage: function (req, res) {
        res.render("verification");
    },

    login: function (req, res) {
        res.render("login", {
            message: ""
        });
    },
    adminLogin: function (req, res) {
        res.render("admin-login", {
            message: ""
        });
    },

    officeDashboard: function (req, res) {
        User.findOne({
            staffEmail: req.body.email,
        }, function (err, existingUser) {
            if (existingUser !== null) {
                bcrypt.compare(req.body.password, existingUser.password, function (err, response) {
                    if (response == true) {
                        res.render("officers-panel", {
                            user: existingUser.firstName + ' ' + existingUser.lastName,
                            id: existingUser._id
                        });
                    } else {
                        res.render("login", {
                            message: "Invalid credentials"
                        });
                    }
                });
            } else {
                res.render("login", {
                    message: "Invalid credentials"
                });
            }
        });
    },

    adminDashboard: function (req, res) {
        User.findOne({
            staffEmail: req.body.email,
            admin: 'yes'
        }, function (err, existingUser) {
            if (existingUser !== null) {
                bcrypt.compare(req.body.password, existingUser.password, function (err, response) {
                    if (response == true) {
                        res.render("admin-panel", {
                            user: existingUser.firstName + ' ' + existingUser.lastName,
                            id: existingUser._id

                        });
                    } else {
                        res.render("admin-login", {
                            message: "Invalid credentials"
                        });
                    }
                });
            } else {
                res.render("admin-login", {
                    message: "Invalid credentials"
                });
            }
        });
    },

    verify: function (req, res) {
        res.send({
            id: 122369,
            name: "Okaba Mac",
            email: "markokaba99@gmail.com"
        });
    },


    getImage: function(req, res) {
        User.findById(req.params.id,(err,data)=>{
            if(!err){
                res.contentType(data.avatar.contentType);
                res.send(data.avatar.data);
            }
        });
    },
    addUser: function (req, res) {
        upload(req, res, function (err) {
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
                }, function (err, existingUser) {
                    if (existingUser === null) {
                        if (password !== confirmPassword) {
                            errors.push({
                                msg: "Passwords do not match"
                            });
                        }
                        if (password.length < 6) {
                            errors.push({
                                msg: "Password is too weak"
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
                            msg: "Email is not available"
                        }]);
                    }
                });
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
    }
};
module.exports = PagesControls;