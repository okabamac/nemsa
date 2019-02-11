const RoutineTest = require('../models/RoutineTest');
const ReportControls = {
    byState: (req, res) => {
        RoutineTest.find({
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
    },

    byDate: (req, res) => {
        console.log(req.body);
        RoutineTest.find({
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
};

module.exports = ReportControls;