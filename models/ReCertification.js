const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const RecertificationSchema = new Schema({
    disco: {
        type: String,
    },
    state: {
        type: String,
    },
    businessUnitName: {
        type: String,
    },
    customerName: {
        type: String,
    },
    seal: {
        type: String,
        required: true
    },
    customerAddress: {
        type: String,
    },
    customerPhoneNumber: {
        type: String,
    },
    customerEmail: {
        type: String,
    },
    yom: {
        type: Date,
    },
    country: {
        type: String,
    },
    tariffClassName: {
        type: String,
    },
    meterType: {
        type: String,
    },
    meterClass: {
        type: String,
    },
    meterSerialNumber: {
        type: String,
    },
    meterModel: {
        type: String,
    },
    dateRoutineTest: {
        type: Date,
    },
    expDate: {
        type: Date,
    },
    dateLastRecertification: {
        type: Date,
    },
    expdateAfterRecertification: {
        type: Date,
    },
    tariffCharges: {
        type: String,
    },
    testMeasurement: {
        type: String,
    },
    observation: {
        type: String,
    },
});

const Recertification = mongoose.model('Recertification', RecertificationSchema);
module.exports = Recertification;