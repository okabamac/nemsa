const RoutineTest = require('../models/RoutineTest');
const TypeTest = require('../models/TypeTest');
const ReCertification = require('../models/ReCertification');
// const passport = require('passport');
const {
    userSchema
} = require('./validation');

const TestControls = {
    routineTest: (req, res) => {
        const {
            radio,
            country,
            vendorName,
            vendorEmail,
            vendorPhone,
            yom,
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
        } = req.body;

        const routineTest = new RoutineTest({
            vendorType: radio,
            country: country,
            vendorName: vendorName,
            vendorEmail: vendorEmail,
            vendorPhone: vendorPhone,
            yom: yom,
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
            dateRoutineTest,
            routineTestExpDate,
            dateLastRecertification,
            expDateAfterRecertification,
            tariffCharges,
            testMeasurement,
            observation
        } = req.body;

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
};
module.exports = TestControls;