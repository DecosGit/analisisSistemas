const express = require('express');
const router = express.Router();

const userController = require('./controller/userData')
const empleoController = require('./controller/empleoController')

router.post('/login', userController.findUser)
router.get('/', (req, res) => {
    res.render('login', { alertMessage: null });
})

router.get('/createUser', (req, res) => {
    res.render('createUser', { alertMessage: null });
})

router.get('/recoveryPassword', (req, res) => {
    res.render('recoveryPassword');
})


router.get('/dashboard', (req, res) => {
    res.render('dashboard', { alertMessage: null, username: null});
})

router.get('/crearEmpleo', (req, res) => {
    res.render('crearEmpleo');
})

router.post('/createUser', userController.createUser)

router.post('/crearEmpleo', empleoController.createJob)

router.get('/empleo', empleoController.findEmpleos)

module.exports = router;