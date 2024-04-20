const express = require('express');
const router = express.Router();

const userController = require('./controller/userData')
const empleoController = require('./controller/empleoController')
const usernameGlobal = require('./controller/userGlobal')
const usernameGlobal = require('./controller/userGlobal')

router.get('/', (req, res) => {

    res.render('login', { alertMessage: null });
})

router.post('/login', userController.findUser)

router.get('/createUser', (req, res) => {
    res.render('createUser', { alertMessage: null });
})

router.post('/createUser', userController.createUser)

router.get('/recoveryPassword', (req, res) => {
    res.render('recoveryPassword');
})

router.get('/dashboard', (req, res) => {
    res.render('dashboard', { alertMessage: null, username: usernameGlobal.getUserGlobal() });
})    

router.get('/empleo', empleoController.findEmpleos)

router.get('/crearEmpleo', (req, res) => {
    res.render('crearEmpleo', { username: usernameGlobal.getUserGlobal() });
})

router.get('/editarEmpleo', (req, res) => {
    res.render('editarEmpleo', { username: usernameGlobal.getUserGlobal() });
})

router.post('/editarEmpleo', empleoController.editJob)

router.post('/opcionEliminarEmpleo', empleoController.deleteJob)

router.post('/crearEmpleo', empleoController.createJob)

router.post('/opcionEditarEmpleo', empleoController.findEditJob)

router.post('/aplicarEmpleo', empleoController.aplicarEmpleo)

router.get('/noticias', (req, res) => {
    res.render('noticias');
})

router.get('/keep_forward', (req, res) => {
    res.render('keep_forward');
})


module.exports = router;