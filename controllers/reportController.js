const RoutineTest = require('../models/RoutineTest');
const TypeTest = require('../models/TypeTest');
const Recertification = require('../models/ReCertification');
const Tests = [RoutineTest, TypeTest, Recertification];
const options = ['RoutineTest', 'TypeTest', 'ReCertification'];
const ReportControls = {
    byState: (req, res) => {
        for (let i = 0; i < options.length; i++) {
            if (options[i] === req.body.test) {
                Tests[i].find({
                    state: req.body.state
                }).then((data) => {
                    res.status(200).send({
                        data
                    });
                }).catch((err) => {
                    console.log(err);
                    res.status(400).send({
                        status: 'Error',
                        message: 'Please try again later'
                    });
                });
            }
        }
    },

    byDate: (req, res) => {
        for (let i = 0; i < options.length; i++) {
            if (options[i] === req.body.test) {
                Tests[i].find({
                    date: {
                        $gte: `${req.body.from}`,
                        $lt: `${req.body.to}`
                    }
                }).then((data) => {
                    res.status(200).send({
                        data
                    });
                }).catch((err) => {
                    console.log(err);
                    res.status(400).send({
                        status: 'Error',
                        message: 'Please try again later'
                    });
                });
            }
        }
    }
};

module.exports = ReportControls;