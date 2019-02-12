const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const RoutineTestSchema = new Schema({
    vendorType: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    vendorName: {
        type: String,
        required: true
    },
    vendorEmail: {
        type: String,
        required: true
    },
    vendorPhone: {
        type: String,
        required: true
    },
    yom: {
        type: Date,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    meterModel: {
        type: String,
        required: true
    },
    meterType: {
        type: String,
        required: true
    },
    meterClass: {
        type: String,
        required: true
    },
    meterSerialNumber: {
        type: String,
        required: true
    },
    dateRoutineTest: {
        type: Date,
        required: true
    },
    expDate: {
        type: Date,
        required: true
    },
    tariffCharge: {
        type: String,
        required: true
    },
    staffID: {
        type: String,
        required: true
    },
    staffEmail: {
        type: String,
        required: true
    },
    seal: {
        type: String,
        required: true
    },
    observation: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

const RoutineTest = mongoose.model('RoutineTest', RoutineTestSchema);
module.exports = RoutineTest;