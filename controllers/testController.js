const RoutineTest = require('../models/RoutineTest');
const TypeTest = require('../models/TypeTest');
const ReCertification = require('../models/ReCertification');
// const passport = require('passport');
const {
    routineTestSchema,
    typeTestSchema,
    reCertificationSchema
} = require('./validation');

const TestControls = {
    routineTest: (req, res) => {
        routineTestSchema
            .validate(req.body, {
                abortEarly: false
            }).then(validatedCredentials => {
                const {
                    radio,
                    country,
                    vendorName,
                    vendorEmail,
                    vendorPhone,
                    yom,
                    state,
                    meterModel,
                    meterType,
                    meterClass,
                    meterSerialNumber,
                    dateRoutineTest,
                    expDate,
                    tariffCharge,
                    staffID,
                    staffEmail,
                    observation
                } = validatedCredentials;

                const routineTest = new RoutineTest({
                    vendorType: radio,
                    country: country,
                    vendorName: vendorName,
                    vendorEmail: vendorEmail,
                    vendorPhone: vendorPhone,
                    yom: yom,
                    state: state,
                    meterModel: meterModel,
                    meterType: meterType,
                    meterClass: meterClass,
                    meterSerialNumber: meterSerialNumber,
                    dateRoutineTest: dateRoutineTest,
                    expDate: expDate,
                    tariffCharge: tariffCharge,
                    staffID: staffID,
                    staffEmail: staffEmail,
                    observation: observation
                });

                RoutineTest.findOne({
                    meterSerialNumber: meterSerialNumber
                }).then(meter => {
                    if (meter !== null) {
                        return res.status(200).send({
                            msg: `This meter number has already been registered`
                        });
                    } else {
                        routineTest
                            .save()
                            .then(() => {
                               // msg: `Seal NEMSA\/${state.replace(/\s/g,'')}\/${meter._id} generated successfully` 
                                return res.status(200).send({
                                    msg: `Routine Test has been added successfully`
                                });
                            })
                            .catch(err => {
                                    console.log(err);
                                    res.status(401).send({
                                        msg: 'Please try again'
                                    });
                                }

                            );
                    }
                }).catch(err =>
                    res.status(401).send({
                        msg: 'Please try again later'
                    }));

            }).catch(validationError => {
                const errorMessage = validationError.details.map(d => d.message);
                return res.status(400).send({
                    msg: `${errorMessage[0]}`
                });
            });

    },

    typeTest: (req, res) => {
        typeTestSchema
            .validate(req.body, {
                abortEarly: false
            }).then(validatedCredentials => {
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
                } = validatedCredentials;
                const typeTest = new TypeTest({
                    vendorName: vendorName,
                    country: country,
                    typeDesign: typeDesign,
                    meterMake: meterMake,
                    meterRating: meterRating,
                    testCertificationNumber: testCertificationNumber,
                    dateCertified: dateCertified,
                    expDate: expDate,
                    vendorEmail: vendorEmail,
                    vendorPhone: vendorPhone,
                    staffID: staffID,
                    staffEmail: staffEmail,
                    observation: observation,
                    remark: radio,
                });
                TypeTest.findOne({
                    meterSerialNumber: meterSerialNumber
                }).then(meter => {
                    if (meter !== null) {
                        return res.status(200).send({
                            msg: `This meter number has already been registered`
                        });
                    } else {
                        typeTest
                            .save()
                            .then(() => {
                                return res.status(200).send({
                                    msg: `Type Test has been added successfully`
                                });
                            })
                            .catch(err => {
                                    console.log(err);
                                    res.status(401).send({
                                        msg: 'Please try again'
                                    });
                                }

                            );
                    }
                }).catch(err =>
                    res.status(401).send({
                        msg: 'Please try again later'
                    }));

            }).catch(validationError => {
                const errorMessage = validationError.details.map(d => d.message);
                return res.status(400).send({
                    msg: `${errorMessage[0]}`
                });
            });

    },

    reCertification: (req, res) => {
        reCertificationSchema
            .validate(req.body, {
                abortEarly: false
            }).then(validatedCredentials => {
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
                    dateRoutineTest,
                    routineTestExpDate,
                    dateLastRecertification,
                    expDateAfterRecertification,
                    tariffCharges,
                    testMeasurement,
                    observation
                } = validatedCredentials;
                const reCertification = new ReCertification({
                    disco: disco,
                    state: state,
                    businessUnitName: businessUnitName,
                    customerName: customerName,
                    customerAddress: customerAddress,
                    customerPhone: customerPhone,
                    customerEmail: customerEmail,
                    yom: yom,
                    country: country,
                    tariffClass: tariffClass,
                    meterSerialNumber: meterSerialNumber,
                    dateRoutineTest: dateRoutineTest,
                    routineTestExpDate: routineTestExpDate,
                    dateLastRecertification: dateLastRecertification,
                    expDateAfterRecertification: expDateAfterRecertification,
                    tariffCharges: tariffCharges,
                    testMeasurement: testMeasurement,
                    observation: observation,
                });
                ReCertification.findOne({
                    meterSerialNumber: meterSerialNumber
                }).then(meter => {
                    if (meter !== null) {
                        return res.status(200).send({
                            msg: `This meter number has already been registered`
                        });
                    } else {
                        reCertification
                            .save()
                            .then(() => {
                                return res.status(200).send({
                                    msg: `Recertification has been done successfully`
                                });
                            })
                            .catch(err => {
                                    console.log(err);
                                    res.status(401).send({
                                        msg: 'Please try again'
                                    });
                                }

                            );
                    }
                }).catch(err =>
                    res.status(401).send({
                        msg: 'Please try again later'
                    }));

            }).catch(validationError => {
                const errorMessage = validationError.details.map(d => d.message);
                return res.status(400).send({
                    msg: `${errorMessage[0]}`
                });
            });

    },

};
module.exports = TestControls;