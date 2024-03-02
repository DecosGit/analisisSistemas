const express = require('express');
const router = express.Router();

const userController = require('./controller/userData')

router.post('/login', userController.findUser)
router.get('/', (req, res) => {
    res.render('login', { alertMessage: null });
})

router.get('/createUser', (req, res) => {
    res.render('createUser');
})

router.get('/recoveryPassword', (req, res) => {
    res.render('recoveryPassword');
})


router.get('/dashboard', (req, res) => {
    res.render('dashboard');
})

router.post('/createUser', userController.createUser)
router.get('/', (req, res) => {
    res.render('createUser', { alertMessage: null });
})

module.exports = router;