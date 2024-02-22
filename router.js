const express = require('express');
const router = express.Router();

router.get('/newUser', (req, res) => {
    res.render('createUser');
})

router.get('/', (req, res) => {
    res.render('login');
})

router.get('/createUser', (req, res) => {
    res.render('createUser');
})

router.post('./validateUser', (req, res) => {
    //Hacemos cualquier validacion y si es correcto devolvemos el dashboard
    console.log('logueado')
    res.send('Logueado');
})

module.exports = router;