const express = require('express');
const router = require('express').Router();

const services = require('../services/services');

router.get('/', async(req, res) => {

    if (req) {
        res.render('addTeacher');
        return;
    }

})

router.get('/addStudent', async(req, res) => {

    if (req) {
        res.render('addStudent');
        return;
    }
})

router.get('/showList', async(req, res) => {
    let allTeachers = await services.getAllTeachers();
    let allStudents = await services.getAllStudents();
    let topTeachers = await services.getTopTeachers();
    let topCourses = await services.getTopCourses();

    res.render('showList', { teachers: allTeachers, students: allStudents, topTeachers, topCourses });
})

router.get('/addCourse', async(req, res) => {
    let all = await services.getAllTeachers();
    res.render('addCourse', { data: all });
})

router.post('/addCourse', async(req, res) => {

    services.addCourse(req.body)
        .then(createRes => {
            res.redirect('/');
        }).catch(err => {
            if (err.name === 'MongoError' && err.code === 11000) {
                res.render('create', { error: { message: `${Object.keys(err.keyPattern)} must be unique` } });
                return;
            }
            res.render('/', { error: { message: err.message } });
        })
})

router.post('/addTeacher', (req, res) => {

    services.addTeacher(req.body)
        .then(createRes => {
            res.redirect('/');
        }).catch(err => {
            if (err.name === 'MongoError' && err.code === 11000) {
                res.render('create', { error: { message: `${Object.keys(err.keyPattern)} must be unique` } });
                return;
            }
            res.render('/', { error: { message: err.message } });
        })
});

router.post('/addStudent', (req, res) => {

    services.addStudent(req.body)
        .then(createRes => {
            res.redirect('/');
        }).catch(err => {
            if (err.name === 'MongoError' && err.code === 11000) {
                res.render('create', { error: { message: `${Object.keys(err.keyPattern)} must be unique` } });
                return;
            }
            res.render('/', { error: { message: err.message } });
        })
});

router.get('/enrollStudent', async(req, res) => {

    let allStudents = await services.getAllStudents();
    let allCourses = await services.getAllCourses();
    res.render('enrollStudent', { students: allStudents, courses: allCourses });
});

router.get('/unenrollStudent', async(req, res) => {

    let allStudents = await services.getAllStudents();
    let allCourses = await services.getAllCourses();
    res.render('unenrollStudent', { students: allStudents, courses: allCourses });
});

router.post('/enrollStudent', async(req, res) => {

    services.enrollStudent(req.body)
        .then(createRes => {
            res.redirect('/');
        }).catch(err => {
            if (err.name === 'MongoError' && err.code === 11000) {
                console.log(err)
                return;
            }
            res.render('showList', { error: { message: err.message } });
        })
})

router.post('/unenrollStudent', async(req, res) => {


    services.unenrollStudent(req.body)
        .then(createRes => {
            res.redirect('/');
        }).catch(err => {
            if (err.name === 'MongoError' && err.code === 11000) {
                console.log(err)
                return;
            }
            res.render('showList', { error: { message: err.message } });
        })
})

module.exports = router;