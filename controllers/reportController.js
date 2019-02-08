const RoutineTest = require('../models/RoutineTest');
const ReportControls = {
    byState: (req, res) => {
        console.log(req.body);
        RoutineTest.find({
            state: req.body.state
        }).then((data) => {  
            console.log(data);
        }).catch(err => console.log(err));
    },
    byDate: (req, res) => {
        console.log(req.body);
        RoutineTest.find({
            date: {
                $gte: `${req.body.from}`,
                $lt: `${req.body.to}`
            }
        }).then((data) => {
            console.log(data);
        }).catch(err => console.log(err));
    }
};

module.exports = ReportControls;