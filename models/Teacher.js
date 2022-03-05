const mongoose = require('mongoose');



const TeacherScheme = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    degree: {
        type: String,
        required: true,
    },
    courseLeads: {
        type: mongoose.Types.ObjectId,
        ref: 'Course'
    }
})


module.exports = mongoose.model('Teacher', TeacherScheme);