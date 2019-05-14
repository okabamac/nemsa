import RoutineTest from '../models/RoutineTest';
import TypeTest from '../models/TypeTest';
import Recertification from '../models/ReCertification';

const Tests = [RoutineTest, TypeTest, Recertification];
const options = ['RoutineTest', 'TypeTest', 'ReCertification'];
const ReportControls = {
  byState: (req, res) => {
    for (let i = 0; i < options.length; i++) {
      if (options[i] === req.body.test) {
        Tests[i].find({
          state: req.body.state,
        }).then((data) => {
          res.status(200).send({
            data,
          });
        }).catch(() => {
          res.status(400).send({
            status: 'Error',
            message: 'Please try again later',
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
            $lt: `${req.body.to}`,
          },
        }).then((data) => {
          res.status(200).send({
            data,
          });
        }).catch(() => {
          res.status(400).send({
            status: 'Error',
            message: 'Please try again later',
          });
        });
      }
    }
  },
  byBatch: async (req, res) => {
    try {
      const data = await Tests[0].find({
        batchID: req.body.batchID,
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
