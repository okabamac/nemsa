const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TypeTestSchema = new Schema({
    vendorName: {
        type: String,
    },
    vendorEmail: {
        type: String
    },
    vendorPhone: {
        type: String
    },
    country: {
        type: String
    },
    typeDesign: {
        type: String
    },
    meterRating: {
        type: String
    },
    meterMake: {
        type: String
    },
    testCertifcationNumber: {
        type: String
    },
    dateCertified: {
        type: Date
    },
    expDate: {
        type: Date
    },

    staffID: {
        type: String
    },
    staffEmail: {
        type: String
    },
    observation: {
        type: String
    },
    remark: {
        type: String
    }
});

const TypeTest = mongoose.model('TypeTest', TypeTestSchema);
module.exports = TypeTest;