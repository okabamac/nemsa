import RoutineTest from '../models/RoutineTest';
import TypeTest from '../models/TypeTest';
import Recertification from '../models/ReCertification';

const Tests = [RoutineTest, TypeTest, Recertification];
const options = ['RoutineTest', 'TypeTest', 'ReCertification'];
const ReportControls = {
  byState: async (req, res, next) => {
    for (let i = 0; i < options.length; i++) {
      if (options[i] === req.body.test) {
        try {
          const data = Tests[i].find({
            state: req.body.state,
          });
          return res.status(200).send({
            data,
          });
        } catch (err) {
          return res.status(400).send({
            status: 'Error',
            message: 'Please try again later',
          });
        }
      }
    }
  },

  byDate: async (req, res,) => {
    for (let i = 0; i < options.length; i++) {
      if (options[i] === req.body.test) {
        try {
          const data = Tests[i].find({
            date: {
              $gte: `${req.body.from}`,
              $lt: `${req.body.to}`,
            },
          });
          return res.status(200).send({
            data,
          });
        } catch (err) {
          res.status(500).send({
            status: 'Error',
            message: 'Please try again later',
          });
        }
      }
    }
  },
  byBatch: async (req, res) => {
    try {
      const data = await Tests[0].find({
        batchId: req.body.batchId,
      });
      return res.status(200).send({
        data,
      });
    } catch (err) {
      return res.status(500).send({
        status: 'Error',
        message: 'Please try again later',
      });
    }
  },
};
export default ReportControls;
