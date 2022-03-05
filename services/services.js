const Teacher = require('../models/Teacher');
const Student = require('../models/Student');
const Course = require('../models/Course');


const getTopTeachers = async() => {
    const teacher = await getAllTeachers();

    let top = await Object.values(teacher).sort((a, b) => b.enrolledStudentsCount - a.enrolledStudentsCount).slice(0, 3);

    return await top;
}

const getTopCourses = async() => {
    const courses = await getAllCourses();

    let top = await Object.values(courses).sort((a, b) => b.enrolledStudentsCount - a.enrolledStudentsCount).slice(0, 3);

    return await top;
}


const addTeacher = async({ name, degree }) => {

    const teachertModel = await new Teacher({ name, degree, });

    return await teachertModel.save();
}



const enrollStudent = async({ studentId, courseId }) => {

    const student = await Student.findById(studentId);
    const course = await Course.findById(courseId);

    student.credits = student.credits + course.creditAward;
    course.enrolledStudents.push(studentId);
    student.courses.push(courseId);

    student.save()


    return await course.save();
}

const unenrollStudent = async({ studentId, courseId }) => {

    try {
        const student = await Student.findById(studentId).lean();
        const course = await Course.findById(courseId).lean();

        student.credits = student.credits - course.creditAward; //done

        let newCourses = await Object.values(student.courses)
            .filter(id => {
                if (id != courseId) {
                    return course;
                }
            })

        let newStudents = await Object.values(course.enrolledStudents)
            .filter(id => {
                if (id != studentId) {
                    return course;
                }
            })

        Student.findByIdAndUpdate(studentId, { courses: newCourses }, function(err, result) {

            if (err) {
                console.log(err)
            } else {
                console.log(result)
            }

        });
        Course.findByIdAndUpdate(courseId, { enrolledStudents: newStudents }, function(err, result) {

            if (err) {
                console.log(err)
            } else {
                console.log(result)
            }

        });


    } catch (error) {
        console.log(error);
    }



    return await course.save();
}

const addStudent = async({ name }) => {

    const studentModel = await new Student({ name, });

    return await studentModel.save();
}
const addCourse = async({ name, courseLead, creditAward }) => {

    const courseModel = await new Course({ name, courseLead, creditAward });
    const teacher = await Teacher.findById(courseLead);

    teacher.courseLeads = courseModel._id;
    teacher.save();
    return await courseModel.save();
}

const getAllTeachers = async() => {
    let data = await Teacher.find({}).populate('courseLeads').lean();

    data.map(el => {
        if (el.courseLeads) {

            if (el.courseLeads.enrolledStudents) {

                el.enrolledStudentsCount = el.courseLeads.enrolledStudents.length
            }
        }
        return el;
    })
    return await data;
}

const getAllStudents = async() => {
    let data = await Student.find({}).populate('courses').lean();

    return await data;
}

const getAllCourses = async() => {
    let data = await Course.find({}).populate('enrolledStudents').lean();
    data.map(el => {

        if (el.enrolledStudents) {

            el.enrolledStudentsCount = el.enrolledStudents.length
        }

        return el;
    })
    return await data;
}




module.exports = {
    addStudent,
    addTeacher,
    getAllTeachers,
    addCourse,
    getAllStudents,
    enrollStudent,
    unenrollStudent,
    getTopTeachers,
    getAllCourses,
    getTopCourses
};