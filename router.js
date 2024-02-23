const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('login');
})

router.get('/createUser', (req, res) => {
    res.render('createUser');
})

router.get('/recoveryPassword', (req, res) => {
    res.render('recoveryPassword');
})

router.post('./validateUser', (req, res) => {
    //Hacemos cualquier validacion y si es correcto devolvemos el dashboard
    console.log('logueado')
    res.send('Logueado');
})

module.exports = router;