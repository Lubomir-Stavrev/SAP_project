const mongoose = require('mongoose');



const StudentScheme = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    credits: {
        type: Number,
        default: 0
    },
    courses: [{
        type: mongoose.Types.ObjectId,
        ref: 'Course'
    }]
})


module.exports = mongoose.model('Student', StudentScheme);