const { Router } = require('express');

const homeController = require('./controllers/homeController');


const router = Router();

router.use('/', homeController);


router.get('*', (req, res) => {
    res.render('404');
})

module.exports = router;