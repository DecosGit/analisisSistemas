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

router.get('/adminUsuarios', (req, res) => {
    res.render('adminUsuarios');
})

router.get('/createUserAdmin', (req, res) => {
    res.render('createUserAdmin');
})

router.get('/dashboard', (req, res) => {
    res.render('dashboard', { alertMessage: null, username: null});
})

router.get('/crearEmpleo', (req, res) => {
    res.render('crearEmpleo');
})

router.post('/createUser', userController.createUser)

router.post('/createUserAdmin', userController.createUserAdmin)

router.post('/crearEmpleo', empleoController.createJob)

router.get('/empleo', empleoController.findEmpleos)

router.get('/noticias', (req, res) => {
    res.render('noticias');
})

router.get('/keep_forward', (req, res) => {
    res.render('keep_forward');
})

module.exports = router;