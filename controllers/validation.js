const Joi = require('joi');

const userSchema = Joi.object().keys({
    firstName: Joi.string().min(3).max(30).required(),
    lastName: Joi.string().min(3).max(30).required(),
    staffEmail: Joi.string().email({
        minDomainAtoms: 2
    }).required(),
    staffID: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(6).max(30).regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    confirmPassword: Joi.any().valid(Joi.ref('password')).required().options({
        language: {
            any: {
                allowOnly: 'must match password'
            }
        }
    }),
    admin: Joi.string().min(2).max(3).required(),
});

const routineTestSchema = Joi.object().keys({
    radio: Joi.string().min(2).max(15).required(),
    country: Joi.string().min(2).max(30).required(),
    vendorName: Joi.string().min(3).max(30).required(),
    vendorEmail: Joi.string().email({
        minDomainAtoms: 2
    }).required(),
    vendorPhone: Joi.string().min(3).max(30).required(),
    yom: Joi.date().iso(),
    state: Joi.string().min(3).max(30).required(),
    meterModel: Joi.string().min(3).max(30).required(),
    meterType: Joi.string().min(3).max(30).required(),
    meterClass: Joi.string().min(3).max(30).required(),
    meterSerialNumber: Joi.string().min(3).max(30).required(),
    dateRoutineTest: Joi.date().iso(),
    expDate: Joi.date().iso(),
    tariffCharge: Joi.string().min(3).max(30).required(),
    staffID: Joi.string().min(3).max(30).required(),
    staffEmail: Joi.string().email({
        minDomainAtoms: 2
    }).required(),
    observation: Joi.string().min(3).max(3000).required()
});

const typeTestSchema = Joi.object().keys({
    vendorName: Joi.string().min(3).max(30).required(),
    country: Joi.string().min(2).max(30).required(),
    typeDesign: Joi.string().min(3).max(30).required(),
    meterMake: Joi.string().min(3).max(30).required(),
    meterRating: Joi.string().min(3).max(30).required(),
    testCertificationNumber: Joi.string().min(3).max(30).required(),
    dateCertified: Joi.date().iso(),
    expDate: Joi.date().iso(),
    vendorEmail: Joi.string().email({
        minDomainAtoms: 2
    }).required(),
    vendorPhone: Joi.string().min(3).max(30).required(),
    staffID: Joi.string().min(3).max(30).required(),
    staffEmail: Joi.string().email({
        minDomainAtoms: 2
    }).required(),
    observation: Joi.string().min(3).max(30).required(),
    radio: Joi.string().min(3).max(15).required()
});
const reCertificationSchema = Joi.object().keys({
    disco: Joi.string().min(3).max(30).required(),
    state: Joi.string().min(3).max(30).required(),
    businessUnitName: Joi.string().min(3).max(30).required(),
    customerName: Joi.string().min(3).max(30).required(),
    customerAddress: Joi.string().min(3).max(300).required(),
    customerPhone: Joi.string().min(3).max(30).required(),
    customerEmail: Joi.string().email({
        minDomainAtoms: 2
    }).required(),
    yom: Joi.date().iso(),
    country: Joi.string().min(2).max(30).required(),
    tariffClass: Joi.string().min(3).max(30).required(),
    meterSerialNumber: Joi.string().min(3).max(30).required(),
    dateRoutineTest: Joi.date().iso(),
    routineTestExpDate: Joi.date().iso(),
    dateLastRecertification: Joi.date().iso(),
    expDateAfterRecertification: Joi.date().iso(),
    tariffCharges: Joi.string().min(3).max(30).required(),
    testMeasurement: Joi.string().min(3).max(30).required(),
    observation: Joi.string().min(3).max(300).required(),
});
module.exports = {
    userSchema,
    routineTestSchema,
    typeTestSchema,
    reCertificationSchema
};