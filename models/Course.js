const mongoose = require('mongoose');



const CourseScheme = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    courseLead: {
        type: mongoose.Types.ObjectId,
        ref: 'Teacher',
        required: true,
    },
    creditAward: {
        type: Number,
        required: true,
    },
    enrolledStudents: [{
        type: mongoose.Types.ObjectId,
        ref: 'Student'
    }],
})


module.exports = mongoose.model('Course', CourseScheme);