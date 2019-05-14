
import RoutineTest from '../models/RoutineTest';
import TypeTest from '../models/TypeTest';
import ReCertification from '../models/ReCertification';

const Verification = {
  verify: async (req, res, next) => {
    try {
      const res1 = RoutineTest.findOne({
        meterSerialNumber: req.params.serial,
      });
      const res2 = TypeTest.findOne({
        meterSerialNumber: req.params.serial,
      });
      const res3 = ReCertification.findOne({
        meterSerialNumber: req.params.serial,
      });
      const [meter1, meter2, meter3] = await Promise.all([res1, res2, res3]);
      if (meter1 !== null) {
        return res.status(200).json({
          meter: meter1,
        });
      }
      if (meter2 !== null) {
        return res.status(200).json({
          meter: meter2,
        });
      }
      if (meter3 !== null) {
        return res.status(200).json({
          meter: meter3,
        });
      }
      return res.status(400).send({
        status: 'Error',
        message: 'This meter does not exist in our database, please contact the nearest DISCO',
      });
    } catch (err) {
      res.status(500);
      return next(new Error('Please try again later'));
    }
  },
};
export default Verification;
