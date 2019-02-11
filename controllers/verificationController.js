
const RoutineTest = require('../models/RoutineTest');
const TypeTest = require('../models/TypeTest');
const ReCertification = require('../models/ReCertification');

const Verification = {
    
    verify: (req, res) => {
        RoutineTest.findOne({
            meterSerialNumber: req.params.serial
        }).then(meter => {
            if (meter) {
                return res.status(200).send({
                    meter
                });
            } else {
                TypeTest.findOne({
                    meterSerialNumber: req.params.serial
                }).then(meter => {
                    if (meter) {
                        return res.status(200).send({
                            meter
                        });
                    } else {
                        ReCertification.findOne({
                            meterSerialNumber: req.params.serial
                        }).then(meter => {
                            if (meter) {
                                return res.status(200).send({
                                    meter
                                });
                            } else {
                                return res.status(400).send({
                                    status: 'Error',
                                    message: 'This meter does not exist in our database, please contact the nearest DISCO'
                                });
                            }
                        }).catch(err => console.log(err));
                    }
                }).catch(err => console.log(err));
            }
        }).catch(err => console.log(err));
    },
};

module.exports = Verification;