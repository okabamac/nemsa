const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const RoutineTestSchema = new Schema({
    vendor: {
        type: String
    },
    vendorName: {
        type: String,
    },
    vendorEmail: {
        type: String
    },
    vendorPhone: {
        type: String
    },
    CrimpSeal: {
        type: String
    },
    yom: {
        type: Date
    },
    meterModel: {
        type: String
    },
    meterType: {
        type: String
    },
    meterClass: {
        type: String
    },
    meterNumber: {
        type: String
    },
    dateRoutineTest: {
        type: Date
    },
    expDate: {
        type: Date
    },
    tariffCharge: {
        type: String
    },
    observation: {
        type: String
    }
});

const RoutineTest = mongoose.model('RoutineTest', RoutineTestSchema);
module.exports = RoutineTest;