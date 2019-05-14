import objectid from 'objectid';
import RoutineTest from '../models/RoutineTest';
import TypeTest from '../models/TypeTest';
import ReCertification from '../models/ReCertification';
// import {
//   routineTestSchema,
//   typeTestSchema,
//   reCertificationSchema,
// } from './validation';

const TestControls = {
  routineTest: async (req, res, next) => {
    const {
      radio,
      country,
      vendorName,
      vendorEmail,
      vendorPhone,
      yom,
      batchID,
      batchQty,
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
      observation,
    } = req.body;
    const id = objectid();
    const routineTest = new RoutineTest({
      vendorType: radio,
      country,
      vendorName,
      vendorEmail,
      vendorPhone,
      yom,
      batchID,
      batchQty,
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
      seal: `nemsa\/${state.replace(/\s/g, '').toLowerCase()}\/${id}`,
      observation,
    });
    try {
      const meter = await RoutineTest.findOne({
        meterSerialNumber,
      });
      if (meter !== null) {
        return res.status(200).send({
          message: 'This meter number has already been registered',
        });
      }
      routineTest
        .save()
        .then(() => res.status(200).send({
          message: 'Routine Test has been added successfully',
        }));
    } catch (err) {
      res.status(500);
      return next(new Error('Please try again later'));
    }
  },

  typeTest: async (req, res, next) => {
    const {
      vendorName,
      country,
      typeDesign,
      meterSerialNumber,
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
      radio,
    } = req.body;
    const typeTest = new TypeTest({
      vendorName,
      country,
      typeDesign,
      meterSerialNumber,
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
      remark: radio,
    });
    try {
      const meter = await TypeTest.findOne({
        meterSerialNumber,
      });
      if (meter !== null) {
        return res.status(200).send({
          message: 'This meter number has already been registered',
        });
      }
      typeTest
        .save()
        .then(() => res.status(200).send({
          message: 'Type Test has been added successfully',
        }));
    } catch (err) {
      res.status(500);
      return next(new Error('Please try again later'));
    }
  },

  reCertification: async (req, res, next) => {
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
      meterClass,
      meterModel,
      meterSerialNumber,
      dateRoutineTest,
      routineTestExpDate,
      dateLastRecertification,
      expDateAfterRecertification,
      tariffCharges,
      testMeasurement,
      observation,
    } = req.body;
    const reCertification = new ReCertification({
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
      meterClass,
      meterModel,
      dateRoutineTest,
      routineTestExpDate,
      dateLastRecertification,
      expDateAfterRecertification,
      tariffCharges,
      testMeasurement,
      observation,
    });
    try {
      const meter = await ReCertification.findOne({
        meterSerialNumber,
      });
      if (meter !== null) {
        return res.status(200).send({
          message: 'This meter number has already been registered',
        });
      }
      reCertification.save().then(() => res.status(200).send({
        message: 'Recertification done successfully',
      }));
    } catch (err) {
      res.status(500);
      return next(new Error('Please try again later'));
    }
  },

};
export default TestControls;
