const mongoose = require('mongoose');

// Complaint Schema

const compSchema = mongoose.Schema({
    descreption: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    compType: {
        type: String,
        required: true,
    },
    createrId: {
        type: String,
        required: true,
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Comp', compSchema);